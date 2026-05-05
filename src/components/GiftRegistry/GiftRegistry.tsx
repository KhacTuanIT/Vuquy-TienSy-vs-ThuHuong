"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./GiftRegistry.module.css";
import { Heart, QrCode, Download } from "lucide-react";
import Image from "next/image";
import { Modal } from "../Modal/Modal";

interface BankDetails {
  bank: string;
  accountName: string;
  accountNumber: string;
  branch: string;
}

interface MobilePaymentDetails {
  phoneNumber: string;
  name: string;
}

interface QRCodeDetails {
  image: string;
}

interface BankPaymentMethod {
  id: "bank";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: BankDetails;
}

interface MobilePaymentMethod {
  id: "momo" | "zalopay";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: MobilePaymentDetails;
}

interface QRCodePaymentMethod {
  id: "qrcode";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: QRCodeDetails;
}

type PaymentMethod =
  | BankPaymentMethod
  | MobilePaymentMethod
  | QRCodePaymentMethod;

const paymentMethods: PaymentMethod[] = [
  {
    id: "qrcode",
    icon: QrCode,
    title: "Quét QR Code",
    description: "Quét mã QR để chuyển tiền nhanh chóng",
    details: {
      image: "/images/QR-nha-gai.png",
    },
  },
];

function PaymentCard({
  method,
  isVisible,
  index,
}: {
  method: PaymentMethod;
  isVisible: boolean;
  index: number;
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const IconComponent = method.icon;

  return (
    <motion.div
      className={`${styles.paymentCard} glass-card-strong`}
      initial={{ opacity: 0, y: 0, filter: "blur(6px)" }}
      animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 1.2,
        delay: 0.2 + index * 0.15,
        ease: EASE_CINEMATIC,
      }}
    >
      <div className={styles.iconWrapper}>
        <IconComponent />
      </div>
      <h3 className={styles.methodTitle}>{method.title}</h3>
      <p className={styles.methodDescription}>{method.description}</p>

      <div className={styles.details}>
        {method.id === "qrcode" && (
          <div className={styles.qrCodePlaceholder}>
            <Image
              width={400}
              height={400}
              src={method.details.image}
              alt="QR Code"
              className={styles.qrCodeImage}
              onClick={() => setIsFullScreen(true)}
              style={{ cursor: "pointer" }}
            />
            <button
              className={styles.downloadButton}
              onClick={() =>
                handleDownload(method.details.image, "qr-code.png")
              }
            >
              <Download size={16} /> Tải xuống
            </button>

            {isFullScreen && (
              <div
                className={styles.fullScreenOverlay}
                onClick={() => setIsFullScreen(false)}
              >
                <Image
                  width={800}
                  height={800}
                  src={method.details.image}
                  alt="QR Code Fullscreen"
                  className={styles.fullScreenImage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function GiftRegistry() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={styles.section} id="gift" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
      >
        <div className={styles.heartIcon}>
          <Heart size={32} />
        </div>
        <p className="section-subheading">Gửi Tiền Mừng</p>
        <h2 className="section-heading">Lời Chúc Yêu Thương</h2>
        <div className="gold-divider" />
        <p className={styles.headerDescription}>
          Nếu bạn không thể tham dự buổi lễ, chúng tôi vẫn luôn trân trọng sự
          quan tâm và lời chúc của bạn. Trong trường hợp bạn muốn gửi tặng một
          món quà nhỏ, bạn có thể tham khảo hình thức bên dưới. Dù bằng cách
          nào, tình cảm của bạn cũng là điều ý nghĩa nhất đối với chúng tôi.
        </p>
      </motion.div>

      {/* Nút mở modal */}
      <div className={styles.buttonWrapper}>
        <button className={styles.openModalButton} onClick={openModal}>
          Gửi tiền mừng cưới
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className={styles.paymentsGrid}>
            {paymentMethods.map((method, i) => (
              <PaymentCard
                key={method.id}
                method={method}
                isVisible={isVisible}
                index={i}
              />
            ))}
          </div>

          <motion.div
            className={styles.footer}
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE_CINEMATIC }}
          >
            <p className={styles.thankYou}>
              Xin cảm ơn tình cảm và sự ủng hộ của bạn. <br />
              Những lời chúc của bạn sẽ mãi nằm trong tim chúng tôi.
            </p>
          </motion.div>
        </Modal>
      )}
    </section>
  );
}
