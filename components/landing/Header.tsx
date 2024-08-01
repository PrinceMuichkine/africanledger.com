"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from '../../utils/styles/header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.headerContent} container mx-auto`}>
        <Link href="/" className={styles.logoContainer}>
          <Image src="/icon.png" alt="African Ledger Logo" width={41} height={41} />
        </Link>
        <nav>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
            </li>
            <li>
              <Link href="/about" className={pathname === '/about' ? styles.active : ''}>About</Link>
            </li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
}