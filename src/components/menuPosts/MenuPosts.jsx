import Image from "next/image";
import Link from "next/link";
import styles from "./menuPosts.module.css"

const fetchPosts = async () => {
  const res = await fetch('${NEXTAUTH_URL}/api/popular');
  const data = await res.json();
  return data.posts;
};

const MenuPosts = async ({ withImage }) => {

  const posts = await fetchPosts();

  return (
    <div className={styles.items}>
      {posts.map((post) => (
        <Link href={`/posts/${post.slug}`} key={post._id} className={styles.item}>
          {withImage && post.img && (
            <div className={styles.imageContainer}>
              <Image src={post.img} alt="" fill className={styles.image} />
            </div>
          )}
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles[post.catSlug]}`}>{post.catSlug}</span>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <div className={styles.detail}>
              <span className={styles.username}>{post.user.name}</span>
              <span className={styles.date}> - {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;