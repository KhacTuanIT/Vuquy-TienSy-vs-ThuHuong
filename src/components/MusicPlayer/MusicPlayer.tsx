"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./MusicPlayer.module.css";
import { useMusicContext } from "@/contexts/useMusicContext";

export default function MusicPlayer() {
  const { isPlaying, togglePlay } = useMusicContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={styles.musicButton}
          onClick={togglePlay}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
          title={isPlaying ? "Tạm dừng nhạc nền" : "Phát nhạc nền"}
        >
          <div
            className={`${styles.iconWrapper} ${isPlaying ? styles.playing : ""}`}
          >
            <div className={styles.bars}>
              <span className={`${styles.bar} ${styles.bar1}`} />
              <span className={`${styles.bar} ${styles.bar2}`} />
              <span className={`${styles.bar} ${styles.bar3}`} />
              <span className={`${styles.bar} ${styles.bar4}`} />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
