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
    </div>
  );
};

export default Featured;
