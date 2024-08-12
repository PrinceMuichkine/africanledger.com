'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from '../../utils/styles/footer.module.css';

export const Footer: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContent} container mx-auto`}>
        {/* Logo Section */}
        <div className={`${styles.footerSection} ${styles.logoSection}`}>
          <Link href="/" className={styles.logoContainer}>
            <Image src="/icon.png" alt="The African Ledger" width={150} height={150} />
          </Link>
        </div>

        {/* Company Section */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Company</h4>
          <ul className={styles.footerLinks}>
            <li className={styles.footerLinkItem}><Link href="/about">africanledger.com</Link></li>
            <li className={styles.footerLinkItem}><Link href="/archive">archive</Link></li>
            <li className={styles.footerLinkItem}><Link href="/careers">careers</Link></li>
          </ul>
        </div>

        {/* Community Section */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Community</h4>
          <ul className={styles.footerLinks}>
            <li className={styles.footerLinkItem}>
              <a href="https://www.linkedin.com/company/africanledger/">
                <FontAwesomeIcon icon={faLinkedin} className={`${styles.icon} ${styles.faLinkedin}`} /> LinkedIn
              </a>
            </li>
            <li className={styles.footerLinkItem}>
              <a href="https://x.com/intent/follow?screen_name=africanledger">
                <FontAwesomeIcon icon={faTwitter} className={`${styles.icon} ${styles.faTwitter}`} /> X | Twitter
              </a>
            </li>
            <li className={styles.footerLinkItem}>
              <a href="/rss.xml">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`${styles.icon} ${styles.rssIcon}`}
                  width="36"
                  height="38"
                >
                  <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
                </svg>
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`${styles.footerBottomContent} container mx-auto`}>
          <p className={styles.footerText}>
            &copy; 2024 The African Ledger. All rights reserved.
          </p>
          <div className={styles.footerBottomLinks}>
            <a href="https://maps.app.goo.gl/RJoTkbkdhxsSByNt8" target="_blank" rel="noopener noreferrer">
              Nouakchott, Mauritania
            </a>
            <Link href="/contact">Support | Contact</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};