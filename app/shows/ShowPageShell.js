"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/app/main.module.css";

const MOBILE_BREAKPOINT = 768;
const SWIPE_THRESHOLD_PX = 56;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

function distance(a, b) {
  const dx = a.clientX - b.clientX;
  const dy = a.clientY - b.clientY;
  return Math.hypot(dx, dy);
}

export default function ShowPageShell({
  title,
  showTitle,
  pressReleaseUrl,
  pressLink,
  date,
  imageUrls = [],
  imageAlts = [],
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomTranslate, setZoomTranslate] = useState({ x: 0, y: 0 });

  const zoomScaleRef = useRef(1);
  const zoomTranslateRef = useRef({ x: 0, y: 0 });

  const pinchRef = useRef({
    mode: "none", // "none" | "swipe" | "pinch" | "pan"
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    startDist: 0,
    startScale: 1,
    startTranslate: { x: 0, y: 0 },
    startScaleSnapshot: 1,
    startTranslateSnapshot: { x: 0, y: 0 },
  });

  const lightboxViewportRef = useRef(null);

  useEffect(() => {
    zoomScaleRef.current = zoomScale;
  }, [zoomScale]);

  useEffect(() => {
    zoomTranslateRef.current = zoomTranslate;
  }, [zoomTranslate]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoomScale(1);
    setZoomTranslate({ x: 0, y: 0 });
    pinchRef.current = {
      mode: "none",
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      startDist: 0,
      startScale: 1,
      startTranslate: { x: 0, y: 0 },
      startScaleSnapshot: 1,
      startTranslateSnapshot: { x: 0, y: 0 },
    };
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx == null || imageUrls.length === 0) return idx;
      return (idx - 1 + imageUrls.length) % imageUrls.length;
    });
    setZoomScale(1);
    setZoomTranslate({ x: 0, y: 0 });
    pinchRef.current.mode = "none";
  }, [imageUrls.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx == null || imageUrls.length === 0) return idx;
      return (idx + 1) % imageUrls.length;
    });
    setZoomScale(1);
    setZoomTranslate({ x: 0, y: 0 });
    pinchRef.current.mode = "none";
  }, [imageUrls.length]);

  useEffect(() => {
    if (lightboxIndex == null) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  useEffect(() => {
    if (lightboxIndex == null) return;
    setZoomScale(1);
    setZoomTranslate({ x: 0, y: 0 });
    pinchRef.current.mode = "none";
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex == null) return;
    const el = lightboxViewportRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      pinchRef.current.startScaleSnapshot = zoomScaleRef.current;
      pinchRef.current.startTranslateSnapshot = zoomTranslateRef.current;

      if (e.touches.length === 2) {
        pinchRef.current.mode = "pinch";
        pinchRef.current.startDist = distance(e.touches[0], e.touches[1]);
        pinchRef.current.startScale = pinchRef.current.startScaleSnapshot;
        pinchRef.current.startTranslate = pinchRef.current.startTranslateSnapshot;
        return;
      }

      if (e.touches.length === 1) {
        const t = e.touches[0];
        const scale = pinchRef.current.startScaleSnapshot;
        pinchRef.current.mode = scale > 1.01 ? "pan" : "swipe";
        pinchRef.current.startX = t.clientX;
        pinchRef.current.startY = t.clientY;
        pinchRef.current.lastX = t.clientX;
        pinchRef.current.lastY = t.clientY;
        pinchRef.current.startTranslate = pinchRef.current.startTranslateSnapshot;
      }
    };

    const onTouchMove = (e) => {
      const scaleNow = pinchRef.current.startScaleSnapshot ?? 1;

      if (pinchRef.current.mode === "pinch" && e.touches.length === 2) {
        e.preventDefault();
        const newDist = distance(e.touches[0], e.touches[1]);
        const ratio =
          pinchRef.current.startDist > 0 ? newDist / pinchRef.current.startDist : 1;
        const next = Math.min(
          MAX_ZOOM,
          Math.max(MIN_ZOOM, pinchRef.current.startScale * ratio),
        );
        setZoomScale(next);
        return;
      }

      if (pinchRef.current.mode === "pan" && e.touches.length === 1 && scaleNow > 1.01) {
        e.preventDefault();
        const t = e.touches[0];
        const dx = t.clientX - pinchRef.current.lastX;
        const dy = t.clientY - pinchRef.current.lastY;
        pinchRef.current.lastX = t.clientX;
        pinchRef.current.lastY = t.clientY;
        setZoomTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        return;
      }

      if (pinchRef.current.mode === "swipe" && e.touches.length === 1 && scaleNow <= 1.01) {
        const t = e.touches[0];
        pinchRef.current.lastX = t.clientX;
        pinchRef.current.lastY = t.clientY;

        const dx = t.clientX - pinchRef.current.startX;
        const dy = t.clientY - pinchRef.current.startY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
          e.preventDefault();
        }
      }
    };

    const onTouchEnd = (e) => {
      const scaleNow = pinchRef.current.startScaleSnapshot ?? 1;

      if (pinchRef.current.mode === "pinch") {
        if (e.touches.length === 0) pinchRef.current.mode = "none";
        return;
      }

      if (pinchRef.current.mode === "pan") {
        if (e.touches.length === 0) pinchRef.current.mode = "none";
        return;
      }

      if (pinchRef.current.mode === "swipe" && scaleNow <= 1.01) {
        const dx = pinchRef.current.lastX - pinchRef.current.startX;
        const dy = pinchRef.current.lastY - pinchRef.current.startY;
        if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) goNext();
          else goPrev();
        }
      }

      pinchRef.current.mode = "none";
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [lightboxIndex, goNext, goPrev]);

  const showHappy = isMobile ? isClicked : isHovered;

  const shouldIgnoreLightboxDismissTarget = (target) => {
    if (!(target instanceof Element)) return true;
    if (target.closest(`.${styles.showLightboxImage}`)) return true;
    if (target.closest(`.${styles.showLightboxNav}`)) return true;
    if (target.closest(`.${styles.showLightboxClose}`)) return true;
    return false;
  };

  const onLightboxPointerDownCapture = (e) => {
    if (e.pointerType === "touch") return;
    if (shouldIgnoreLightboxDismissTarget(e.target)) return;
    closeLightbox();
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.leftColumn} ${styles.showStickyLeft}`}>
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
          {showTitle ? (
            <div className={styles.showSubtitle}>{showTitle}</div>
          ) : null}
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
            {pressLink ? (
              <a
                href={pressLink}
                className={styles.showPressReleaseLink}
                target="_blank"
                rel="noreferrer"
              >
                press
              </a>
            ) : null}
            {date ? <div className={styles.showDate}>{date}</div> : null}
          </div>
        </div>

        <div className={styles.showGallery}>
          {imageUrls.map((src, i) => (
            <button
              key={src}
              type="button"
              className={styles.showImageButton}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Open image ${i + 1} of ${imageUrls.length}`}
            >
              <img
                src={src}
                alt={imageAlts[i] || ""}
                className={styles.showImage}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </main>

      {lightboxIndex != null && imageUrls.length > 0 ? (
        <div
          className={styles.showLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onPointerDownCapture={onLightboxPointerDownCapture}
        >
          <button
            type="button"
            className={styles.showLightboxBackdrop}
            onClick={closeLightbox}
            aria-label="Close image viewer"
          />

          <div className={styles.showLightboxInner}>
            <button
              type="button"
              className={styles.showLightboxDismissLayer}
              onClick={closeLightbox}
              aria-label="Close image viewer"
            />

            <div className={styles.showLightboxTop}>
              <div className={styles.showLightboxCounter}>
                {lightboxIndex + 1} / {imageUrls.length}
              </div>
              <button
                type="button"
                className={styles.showLightboxClose}
                onClick={closeLightbox}
                aria-label="Close"
              >
                close
              </button>
            </div>

            <div className={styles.showLightboxStage}>
              <button
                type="button"
                className={styles.showLightboxNav}
                onClick={goPrev}
                aria-label="Previous image"
              >
                prev
              </button>

              <div className={styles.showLightboxViewport} ref={lightboxViewportRef}>
                <div
                  className={styles.showLightboxZoomWrap}
                  style={{
                    transform: `translate3d(${zoomTranslate.x}px, ${zoomTranslate.y}px, 0) scale(${zoomScale})`,
                  }}
                >
                  <img
                    src={imageUrls[lightboxIndex]}
                    alt={imageAlts[lightboxIndex] || ""}
                    className={styles.showLightboxImage}
                    draggable={false}
                  />
                </div>
              </div>

              <button
                type="button"
                className={styles.showLightboxNav}
                onClick={goNext}
                aria-label="Next image"
              >
                next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
