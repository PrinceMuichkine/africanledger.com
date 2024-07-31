'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';
import { useMediaQuery } from 'react-responsive'; // You'll need to install this package

export const Footer: React.FC = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const copyrightStyle = isDesktop
    ? { marginLeft: '32px' }
    : { textAlign: 'center' as const, marginLeft: '0' };

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
            <li><Link href="/about">About</Link></li>
            <li><Link href="/product">Product</Link></li>
          </ul>
        </div>

        {/* Community Section */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Community</h4>
          <ul className={styles.footerLinks}>
            <li>
              <a href="https://www.linkedin.com/company/africanledger/">
                <FontAwesomeIcon icon={faLinkedin} className={styles.icon} /> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://x.com/intent/follow?screen_name=africanledger">
                <FontAwesomeIcon icon={faTwitter} className={styles.icon} /> X | Twitter
              </a>
            </li>
            <li>
              <a href="/rss.xml">
                <Image src="/rss.svg" alt="RSS Feed" width={24} height={24} className={styles.icon} /> RSS Feed
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p className={styles.footerText} style={copyrightStyle}>
            &copy; 2024 The African Ledger. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <a href="https://maps.app.goo.gl/RJoTkbkdhxsSByNt8" target="_blank" rel="noopener noreferrer">
              Nouakchott, Mauritania
            </a>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};