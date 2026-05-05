"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./EventSection.module.css";

const events = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Lễ Vu Quy",
    time: "4:30 PM",
    location: "Tư Gia Nhà Gái",
    address: "Sông Lô, Phú Thọ, Việt Nam",
    description:
      "Kính mời bạn cùng chứng kiến khoảnh khắc chúng tôi trao lời nguyện ước trong không gian ấm cúng bên gia đình và bạn bè thân thương.",
  },
];

export default function EventSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={styles.section} id="events" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
      >
        <p className="section-subheading">Thông Tin Lễ Cưới</p>
        <h2 className="section-heading">Ngày Chung Đôi</h2>
        <div className="gold-divider" />
      </motion.div>

      <div className={styles.eventsGrid}>
        {events.map((event, i) => (
          <motion.div
            key={event.title}
            className={`${styles.eventCard} glass-card-strong`}
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{
              duration: 1.2,
              delay: 0.2 + i * 0.2,
              ease: EASE_CINEMATIC,
            }}
          >
            <div className={styles.iconWrapper}>{event.icon}</div>
            <h3 className={styles.eventTitle}>{event.title}</h3>

            <div className={styles.eventDetail}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={styles.detailIcon}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <span>{event.time}</span>
            </div>

            <div className={styles.eventDetail}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={styles.detailIcon}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <span className={styles.locationName}>{event.location}</span>
                <span className={styles.address}>{event.address}</span>
              </div>
            </div>

            <p className={styles.eventDescription}>{event.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
