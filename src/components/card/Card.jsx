"use client";

import Image from "next/image";
import styles from "./card.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Head from 'next/head';
import Transition from "../transition/Transition";

const Card = ({ key, item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/posts/${item.slug}`);
  };

  return (
    <>
      <Head>
        <meta name="title" content={item.title} />
        <meta name="description" content={item.desc} />
        <link rel="canonical" href={`/posts/${item.slug}`} />
      </Head>

      <div className={styles.container} key={key}>
        {/* {item.img && (
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt={item.title}
              fill
              className={styles.image}
            />
          </div>
        )} */}
        <div className={styles.textContainer}>
          <div className={styles.detail}>
            <span className={styles.user}>
              <Image src={item?.user?.image} width={32} height={32} alt={item?.user?.name}></Image>
              <p>{item?.user?.name}</p>
              <span className={styles.date}>
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
              </span>
            </span>
          </div>

          <a
            className={styles.clickable}
            href={`/posts/${item.slug}`}
            onClick={handleClick}
          >
            <h1>{item.title}</h1>
            <div
              className={styles.desc}
              dangerouslySetInnerHTML={{
                __html:
                  item?.desc.length > 250
                    ? item?.desc.substring(0, 250) + "..."
                    : item?.desc,
              }}
            ></div>
          </a>

          <div className={styles.footDiv}>
            <span className={`${styles.category} ${styles[item.catSlug]}`}>
              {item.catSlug}
            </span>
            <span className={`${styles.views} `}>{item.views} Views</span>
          </div>
        </div>
        <Transition show={isLoading} />
      </div>
    </>
  );
};

export default Card;
