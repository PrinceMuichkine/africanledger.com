"use client"

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-section logo-section">
          <Link href="/" className="logo-container">
            <Image src="/icon.png" alt="The African Ledger" width={150} height={150} />
          </Link>
        </div>

        {/* Company Section */}
        <div className="footer-section">
          <h4 className="footer-title">The African Ledger</h4>
          <ul className="footer-links">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/product">Product</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>

        {/* Community Section */}
        <div className="footer-section">
          <h4 className="footer-title">Community</h4>
          <ul className="footer-links">
            <li>
              <a href="https://www.linkedin.com/company/lomiafri/">
                <FontAwesomeIcon icon={faLinkedin} className="icon" /> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://x.com/intent/follow?screen_name=lomiafrica">
                <FontAwesomeIcon icon={faTwitter} className="icon" /> X | Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 The African Ledger. All rights reserved.</p>
      </div>
    </footer>
  );
};