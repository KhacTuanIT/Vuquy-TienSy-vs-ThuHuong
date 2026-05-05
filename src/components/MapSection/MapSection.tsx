"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./MapSection.module.css";

export default function MapSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={styles.section} id="map" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
      >
        <p className="section-subheading">Địa Điểm Tổ Chức</p>
        <h2 className="section-heading">Bản Đồ</h2>
        <div className="gold-divider" />
      </motion.div>

      <motion.div
        className={styles.mapWrapper}
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE_CINEMATIC }}
      >
        <div className={`${styles.mapContainer} glass-card`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d232.20307357384084!2d105.4274679!3d21.3800912!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134eded02252e87%3A0x84fa0d29c526c0fe!2zTmFpbCBIxrDGoW5nIE5ndXnhu4Vu!5e0!3m2!1svi!2s!4v1777986500477!5m2!1svi!2s"
            className={styles.map}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Địa điểm tổ chức lễ cưới"
          ></iframe>
        </div>

        <div className={styles.venueInfo}>
          <h3 className={styles.venueName}>Tư Gia Nhà Gái</h3>
          <p className={styles.venueAddress}>
            Nail Hương Nguyễn 9CHH+X2P, ĐT306, Sông Lô, Phú Thọ, Việt Nam
          </p>
          <a
            href="https://maps.app.goo.gl/WBbx5HyQpw1e2Mw36"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directionsLink}
          >
            Xem Chỉ Đường
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={styles.arrowIcon}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
