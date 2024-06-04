"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();

  console.log(process.env.NEXT_PUBLIC_NEXTAUTH_URL);

  const { data, mutate, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable

  const handleSubmit = async () => {
    if (!desc.trim()) {
      alert("Cannot submit an empty comment!");
      return;
    }

    if (isSubmitting) {
      alert("Submission is in progress, please wait!");
      return;
    }

    setIsSubmitting(true); // Disable the textarea and the "Send" button
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
    setDesc(""); // Clear the textarea
    setIsSubmitting(false); // Enable the textarea and the "Send" button
  };

  function timeAgo(date) {
    const now = new Date();
    const secondsAgo = Math.round((now - date) / 1000);
    const minutesAgo = Math.round(secondsAgo / 60);
    const hoursAgo = Math.round(minutesAgo / 60);
    const daysAgo = Math.round(hoursAgo / 24);
    const monthsAgo = Math.round(daysAgo / 30);
    const yearsAgo = Math.round(monthsAgo / 12);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (secondsAgo < 60) return "recently";
    if (minutesAgo < 60) return rtf.format(-minutesAgo, "minute");
    if (hoursAgo < 24) return rtf.format(-hoursAgo, "hour");
    if (daysAgo < 30) return rtf.format(-daysAgo, "day");
    if (monthsAgo < 12) return rtf.format(-monthsAgo, "month");
    return rtf.format(-yearsAgo, "year");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            required
            placeholder="Write a comment..."
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        { data?.map((item) => (
              <div className={styles.comment} key={item._id}>
                <div className={styles.user}>
                  {item?.user?.image && (
                    <Image
                      src={item.user.image}
                      alt={item.user.name}
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span>
                    <span className={styles.date}>
                      {timeAgo(new Date(item.createdAt))}
                    </span>
                  </div>
                </div>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
