"use client"

import Link from 'next/link';
import Image from 'next/image';
import AuthButton from './AuthButton';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="header-content">
        <Link href="/" className="logo-container">
          <Image src="/icon.png" alt="African Ledger Logo" width={42} height={42} />
        </Link>
        <nav>
          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <AuthButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}