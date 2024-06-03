"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import ReactQuill from "react-quill";
import { set } from "date-fns";
import Loading from "@/components/loading/Loading";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleLength, setTitleLength] = useState(0);

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true); // Disable the publish button

    try {
      if (!title || !value) {
        alert("Title and description cannot be empty");
        setIsSubmitting(false);
        return;
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc: value,
          img: media,
          slug: slugify(title),
          catSlug: catSlug || "style",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
      } else {
        // Handle different statuses appropriately
        console.error("Failed to post: ", res.status);
        throw new Error(
          `Failed to publish post, server responded with status: ${res.status}`
        );
      }
    } catch (error) {
      // Error handling, e.g., show a notification or log
      console.error("Publishing error:", error);
      alert("Error publishing post. Please try again.");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 10000);
    }
  };

  return (
    <>
      <head>
        <title>Write a new blog post - My Next Blog</title>
        <meta
          name="description"
          content="Write a new blog post on My Next Blog."
        />
        <meta
          property="og:title"
          content="Write a new blog post - My Next Blog"
        />
        <meta
          property="og:description"
          content="Write a new blog post on My Next Blog."
        />
        <meta property="og:url" content="https://yourwebsite.com/write" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourwebsite.com/write" />
      </head>
      <div className={styles.container}>
        <Loading show={isSubmitting} />
        <input
          type="text"
          placeholder="Title for your amazing post..."
          className={styles.input}
          required
          value={title}
          maxLength={70}
          onChange={(e) => {
            if (e.target.value.length <= 70) {
              setTitle(e.target.value);
              setTitleLength(e.target.value.length);
            }
          }}
        />
        <div className={styles.counter}>
          <p>{titleLength}/70</p>
        </div>
        <div className={styles.categorySelect}>
          <span>Select Category</span>
          <select
            className={styles.select}
            onChange={(e) => setCatSlug(e.target.value)}
            required
          >
            <option value="style">style</option>
            <option value="fashion">fashion</option>
            <option value="food">food</option>
            <option value="culture">culture</option>
            <option value="travel">travel</option>
            <option value="coding">coding</option>
          </select>
        </div>
        <div className={styles.editor}>
          <ReactQuill
            required
            className={styles.textArea}
            theme="bubble"
            value={value}
            onChange={setValue}
              style={{ fontWeight: 'normal' }}
            placeholder="Tell your story. Past images directly in the editor..."
          />
        </div>
        <button
          className={`${styles.publish} ${isSubmitting ? styles.disabled : ""}`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </div>
    </>
  );
};

export default WritePage;
