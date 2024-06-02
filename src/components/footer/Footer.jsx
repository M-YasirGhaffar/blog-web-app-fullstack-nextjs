import React from "react";
import styles from "./footer.module.css";
import { FaGithub } from 'react-icons/fa'; // Import the FaGithub icon

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>

          <p className={styles.desc}>
            © {new Date().getFullYear()} All rights reserved.
            <a
              href="https://github.com/M-YasirGhaffar"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}GitHub <FaGithub /> 
            </a>
          </p>
      </div>
    </div>
  );
};

export default Footer;
