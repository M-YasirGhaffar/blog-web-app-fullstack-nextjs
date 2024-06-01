"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const Pagination = ({ page, hasPrev, hasNext, total }) => {
  console.log("Pages: " , page)
  const router = useRouter();

  const current = parseInt(page) || 1;

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        <MdNavigateBefore size={32}/>
      </button>
<span className={styles.pageCounter}>{current}/{Math.ceil(total/10)}</span>      
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        <MdNavigateNext size={32}/>
      </button>
    </div>
  );
};

export default Pagination;
