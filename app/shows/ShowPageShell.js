"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/app/main.module.css";

const MOBILE_BREAKPOINT = 768;

export default function ShowPageShell({
  title,
  pressReleaseUrl,
  date,
  imageUrls = [],
  imageAlts = [],
}) {
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
          <Link href="/" className={styles.topRightMenuItem}>
            home
          </Link>
        </nav>
      </div>

      <main className={`${styles.rightColumn} ${styles.showRightColumn}`}>
        <nav className={styles.topRightMenu}>
          <Link href="/" className={styles.topRightMenuItem}>
            home
          </Link>
        </nav>

        <div className={styles.showHeader}>
          <div className={styles.showTitle}>{title}</div>
          <div className={styles.showMeta}>
            {pressReleaseUrl ? (
              <a
                href={pressReleaseUrl}
                className={styles.showPressReleaseLink}
                target="_blank"
                rel="noreferrer"
              >
                press release
              </a>
            ) : null}
            {date ? <div className={styles.showDate}>{date}</div> : null}
          </div>
        </div>

        <div className={styles.showGallery}>
          {imageUrls.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={imageAlts[i] || ""}
              className={styles.showImage}
              loading="lazy"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
