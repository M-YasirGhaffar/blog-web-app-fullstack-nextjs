"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const Pagination = ({ page, hasPrev, hasNext, total }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const current = parseInt(page) || 1;

  const handleClickNext = (e) => {
    e.preventEventDefault();
    setShow(true);
    router.push(`?page=${page + 1}`)
  }

  const handleClickPrev = (e) => {
    e.preventEventDefault();
    setShow(true);
    router.push(`?page=${page - 1}`)
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={handleClickPrev}
        name="prev"
      >
        <MdNavigateBefore size={32}/>
      </button>
<span className={styles.pageCounter}>{current}/{Math.ceil(total/10)}</span>      
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={handleClickNext}
        name="next"
      >
        <MdNavigateNext size={32}/>
      </button>
    </div>
  );
};

export default Pagination;
