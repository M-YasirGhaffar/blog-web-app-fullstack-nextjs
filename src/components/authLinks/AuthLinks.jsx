"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { SiNextdotjs } from "react-icons/si";
import SearchBar from "../searchBar/searchBar";
import ThemeToggle from "../themeToggle/ThemeToggle";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <ThemeToggle />

          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <SiNextdotjs /> Blog
          </Link>
          {!session ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className={styles.link2} onClick={signOut}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;