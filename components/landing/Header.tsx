"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import styles from '../../utils/styles/header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoContainer}>
          <Image src="/icon.png" alt="African Ledger Logo" width={41} height={41} />
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <button className={styles.stylishButton}>
              <span>
                <div className={styles.container}>
                  <div className={styles.primary}></div>
                  <div className={styles.complimentary}></div>
                </div>
              </span>
              <span>Subscribe</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className={styles.popoverContent}>
            <h4 className={styles.popoverTitle}>Subscribe to the feed</h4>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <Input
                  type="email"
                  placeholder="Email address**"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.inputField}
                />
                <Button type="submit" className={styles.subscribeButton}>
                  Go !
                </Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}