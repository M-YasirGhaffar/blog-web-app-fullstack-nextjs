import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const getData = async (slug) => {
  const res = await fetch(`${NEXTAUTH_URL}/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);

  return (
    <>
      <head>
        {/* todo */}
        <title>{`${data?.title} - My Next Blog`}</title>
        <meta name="description" content={data?.desc} />
        <meta property="og:title" content={data?.title} />
        <meta property="og:description" content={data?.desc} />
        <meta property="og:url" content={`https://yourwebsite.com/${slug}`} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://yourwebsite.com/${slug}`} />
      </head>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{data?.title}</h1>
            <div className={styles.user}>
              {data?.user?.image && (
                <div className={styles.userImageContainer}>
                  <Image
                    src={data.user.image}
                    alt={data.user.name}
                    fill
                    className={styles.avatar}
                  />
                </div>
              )}
              <div className={styles.userTextContainer}>
                <span className={styles.username}>{data?.user.name}</span>
                <span className={styles.date}>
                  {new Date(data?.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  {new Date(data?.createdAt).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>{" "}
              </div>
            </div>
          </div>
          {data?.img && (
            <div className={styles.imageContainer}>
              <Image src={data.img} alt="" fill className={styles.image} />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.post}>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: data?.desc }}
            />
            <div className={styles.comment}>
              <Comments postSlug={slug} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
