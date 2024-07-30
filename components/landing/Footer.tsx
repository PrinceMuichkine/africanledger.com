"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-section logo-section">
          <Link href="/" className="logo-container">
            <Image src="/icon.png" alt="African Ledger Logo" width={150} height={150} />
          </Link>
        </div>

        {/* Company Section */}
        <div className="footer-section">
          <h4 className="footer-title">Company</h4>
          <ul className="footer-links">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>

        {/* Community Section */}
        <div className="footer-section">
          <h4 className="footer-title">Community</h4>
          <ul className="footer-links">
            <li>
              <a href="https://github.com/lomiafrica">
                <FontAwesomeIcon icon={faGithub} /> Github
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/lomiafri/">
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://wa.me/31687533993">
                <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
              </a>
            </li>
            <li>
              <a href="https://x.com/intent/follow?screen_name=lomiafrica">
                <FontAwesomeIcon icon={faTwitter} /> X | Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 The African Ledger. All rights reserved.</p>
      </div>
    </footer>
  );
};