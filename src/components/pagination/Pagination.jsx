"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const Pagination = ({ page, hasPrev, hasNext }) => {
  console.log("Pages: " , page)
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        <MdNavigateBefore />
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default Pagination;
