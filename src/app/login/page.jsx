"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from 'react-icons/fa'; // Import the icons

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/")
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn("google")}>
        <FaGoogle className={styles.icon} /> Sign in with Google
        </div>
        <div className={styles.socialButton} onClick={() => signIn("github")}>
        <FaGithub className={styles.icon} /> Sign in with Github
          </div>
      </div>
    </div>
  );
};

export default LoginPage;
