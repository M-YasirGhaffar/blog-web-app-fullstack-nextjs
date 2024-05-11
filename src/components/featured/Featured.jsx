"use client";

import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Featured = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Hey, <b> {loading ? "Guest" : session?.user?.name || "Guest"}!</b>{" "}
        {session ? 'Create, discover and share stories and ideas.' : 'Discover our stories and creative ideas.'}
      </h1>
      {/* <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Lorem ipsum dolor sit amet alim consectetur adipisicing elit.
          </h1>
          <p className={styles.postDesc}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis.
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div> */}
    </div>
  );
};

export default Featured;
