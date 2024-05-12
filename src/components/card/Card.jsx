import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {
  return (
    <div className={styles.container} key={key}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
          </span>
        </div>
        <Link href={`/posts/${item.slug}`}>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{
            __html:
              item?.desc.length > 250
                ? item?.desc.substring(0, 250) + "..."
                : item?.desc,
          }}
        ></div>

        </Link>
        <span className={`${styles.category} ${styles[item.catSlug]}`}>{item.catSlug}</span>
      </div>
      
    </div>
  );
};

export default Card;
