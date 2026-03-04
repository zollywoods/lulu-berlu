"use client";

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
      <main className={styles.main}>
        {/* <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>Projects</a>
          <a href="#" className={styles.navLink}>Information</a>
          <a href="#" className={styles.navLink}>Press</a>
        </nav> */}

        <img
          src={showHappy ? "/lulu-happy.svg" : "/lulu-sad.svg"}
          className={styles.logo}
          alt="Lulu Berlu"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => isMobile && setIsClicked((prev) => !prev)}
        />
      </main>
    </div>
  );
}
