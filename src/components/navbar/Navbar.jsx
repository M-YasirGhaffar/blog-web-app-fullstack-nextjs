"use client";

import React, { useState } from "react";
import styles from "./navbar.module.css";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { SiNextdotjs } from "react-icons/si";
import SearchBar from "../searchBar/searchBar";
import Transition from '../transition/Transition'; // Import the Transition component

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  console.log(pathName);
  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (pathName != '/') {
      router.push('/')
      setShow(false);
      return;
    }
    // pathName == '/'? setShow(false) : setShow(true);
    // router.push('/').then(() => setShow(false));
  };

  return (
    <nav className={styles.container}>
      <Transition show={show} /> {/* Add the Transition component */}
      <div className={styles.logo}>
        <a href="/" onClick={handleClick} className={styles.link}>
          <SiNextdotjs /> Blog
        </a>
        <SearchBar />
      </div>
      <div className={styles.links}>
        <ThemeToggle />
        <AuthLinks />
      </div>
    </nav>
  );
};

export default Navbar;