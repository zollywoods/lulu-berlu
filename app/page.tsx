"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/app/main.module.css";

const MOBILE_BREAKPOINT = 768;

export default function Home() {
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
      {/* <span className={styles.branding}>Lulu Berlu</span> */}
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
          <a href="/info" className={styles.topRightMenuItem}>info</a>
        </nav>
      </div>
      <main className={styles.rightColumn}>
        <nav className={styles.topRightMenu}>
          <a href="/info" className={styles.topRightMenuItem}>info</a>
        </nav>
        <div className={styles.upcomingShow}>
          <u>Current</u>
          <br />
          <br />
          <div className={styles.upcomingShowContent}>
          <a href="/shows/camille" className={styles.upcomingShowLink}>
            <div className={styles.upcomingShowHeading}>
              <h2 className={styles.upcomingShowTitle}>Camille Klein</h2>
              <i className={styles.upcomingShowTitle}> Works on paper </i>
            </div>
            <p className={styles.upcomingShowDate}> March 14 - May 10 2026 </p>
            <img src="/camille.jpeg" alt="Camille Klein" className={styles.camilleImage} />
          </a>
          </div>
        </div>

      </main>
    </div>
  );
}
