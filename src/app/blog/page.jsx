import Head from 'next/head';
import CardList from "@/components/cardList/CardList";
import styles from "./blogPage.module.css";
import Menu from "@/components/Menu/Menu";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <>
      <Head>
        <title>{cat} Blog - My Next Blog</title>
        <meta name="description" content={`Read the latest ${cat} blogs on our website.`} />
        <meta property="og:title" content={`${cat} Blog - My Next Blog`} />
        <meta property="og:description" content={`Read the latest ${cat} blogs on our website.`} />
        <meta property="og:url" content={`https://yourwebsite.com/blog/${cat}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://yourwebsite.com/blog/${cat}`} />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>{cat} Blog</h1>
        <div className={styles.content}>
          <CardList page={page} cat={cat}/>
          <Menu />
        </div>
      </div>
    </>
  );
};

export default BlogPage;