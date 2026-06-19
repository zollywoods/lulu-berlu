"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/app/main.module.css";

const MOBILE_BREAKPOINT = 768;

export default function HomePageShell({
  artistFirstName,
  artistLastName,
  details,
  showName,
  dates,
  imageUrl,
  imageAlt,
  exhibitionLink,
  links = [],
  pastShows = [],
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

  const pastShowsContent = (sectionClassName) =>
    pastShows.length > 0 ? (
      <div className={sectionClassName}>
        <u className={styles.pastShowsLabel}>Past</u>
        {pastShows.map((show) => (
          <a
            key={`${show.title}-${show.dates}`}
            href={show.link}
            className={styles.pastShowItem}
          >
            <div className={styles.pastShowRow}>
              <span className={styles.pastShowTitle}>{show.title}</span>
              <span className={styles.pastShowDate}>{show.dates}</span>
            </div>
            {show.imageUrl ? (
              <img
                src={show.imageUrl}
                alt={show.imageAlt}
                className={styles.camilleImage}
              />
            ) : null}
          </a>
        ))}
      </div>
    ) : null;

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
      </div>
      <main className={`${styles.rightColumn} ${styles.homeRightColumn} ${styles.mobileFixedNav}`}>
        <nav className={styles.topRightMenu}>
          <a href="/info" className={styles.topRightMenuItem}>
            info
          </a>
        </nav>
        <div className={styles.homeShowLayout}>
          <div className={styles.upcomingShow}>
            <div className={styles.upcomingShowInner}>
              <br />
              <div className={styles.upcomingShowContent}>
                <a href={exhibitionLink} className={styles.upcomingShowLink}>
                  <div className={styles.upcomingShowHeading}>
                    <h2 className={styles.upcomingShowTitle}>
                      <strong>{artistFirstName}</strong>{" "}
                      <strong>{artistLastName}</strong>
                    </h2>
                    {details ? (
                      <p className={styles.upcomingShowTitle}>
                        <strong>{details}</strong>
                      </p>
                    ) : null}
                    <p className={styles.upcomingShowDate}>{dates}</p>
                  </div>
                  {showName ? (
                    <i className={styles.upcomingShowTitle}>
                      <strong>{showName}</strong>
                    </i>
                  ) : null}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={imageAlt ?? `${artistFirstName} ${artistLastName}`}
                      className={styles.camilleImage}
                    />
                  ) : null}
                </a>
                {links.length > 0 ? (
                  <div className={styles.homeLinks}>
                    {links.map((item) => (
                      <a
                        key={`${item.label}-${item.url}`}
                        href={item.url}
                        className={styles.showPressReleaseLink}
                        target={item.url.startsWith("http") ? "_blank" : undefined}
                        rel={
                          item.url.startsWith("http") ? "noreferrer" : undefined
                        }
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              {pastShowsContent(styles.pastShowsSection)}
              <div className={styles.upcomingShowSpacer} aria-hidden="true" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
