import Head from 'next/head';
import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <>
      <head>
        {/* rgjeoh orh wi eiy ier gi todo */}
        <title>My Next Blog</title>
        <meta name="description" content="A description of your website" />
        <meta property="og:title" content="My Next Blog" />
        <meta property="og:description" content="A description of your website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourwebsite.com" />
      </head>
      <div className={styles.container}>
        <Featured />
        <div className={styles.content}>
          <CardList page={page}/>
          <Menu />
        </div>
      </div>
    </>
  );
}