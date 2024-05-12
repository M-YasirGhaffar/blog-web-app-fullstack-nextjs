import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { SiNextdotjs } from "react-icons/si";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        {" "}
        <Link href="/" className={styles.link}>
        <SiNextdotjs /> Blog

        </Link>
      </div>
      <div className={styles.links}>
        <ThemeToggle />
        {/* <Link href="/" className={styles.link}>
          Home
        </Link> */}
      <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
