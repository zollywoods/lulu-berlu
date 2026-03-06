"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/app/main.module.css";

const MOBILE_BREAKPOINT = 768;

export default function InfoPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showHappy = isMobile ? isClicked : isHovered;

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <Link href="/" className={styles.logoLink}>
          <img
            src={showHappy ? "/lulu-happy.svg" : "/lulu-sad.svg"}
            className={styles.logo}
            alt="Lulu Berlu"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => isMobile && setIsClicked((prev) => !prev)}
          />
        </Link>
        <nav className={styles.mobileNavUnderLogo}>
          <Link href="/" className={styles.topRightMenuItem}>home</Link>
        </nav>
      </div>
      <main className={styles.rightColumn}>
        <nav className={styles.topRightMenu}>
          <Link href="/" className={styles.topRightMenuItem}>
            home
          </Link>
        </nav>
        <div className={styles.infoContent}>
          {/* <u>Information</u> */}
          {/* <br/>
          <br/> */}
          <p>Lulu Berlu is a curatorial project by Maya Blumenberg-Taylor and Alyssa Mattocks, located across two spaces in Ridgewood, NY. 
            <br/> <br/> Please contact the gallery to schedule an appointment: 
            <Link href="mailto:info@luluberluprojects.com" className={styles.infoLink}> info@luluberluprojects.com </Link> | <Link href="https://www.instagram.com/lulu._berlu/" target="_blank" className={styles.infoLink}> @lulu._berlu </Link></p>
        </div>
        <div className={styles.infoBlock}>

        </div>
      </main>
    </div>
  );
}
