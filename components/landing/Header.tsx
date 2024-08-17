"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from "@/components/ui/sonner";
import styles from '../../utils/styles/header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsButtonActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with email:', email);

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      toast.error("Submission failed.");
      return;
    }

    const result = await response.json();
    console.log('API response:', result);

    toast.success(result.message);
    setEmail('');
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsButtonActive(!isButtonActive);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoContainer}>
          <Image src="/icon.png" alt="The African Ledger Logo" width={55} height={55} />
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <button
              ref={buttonRef}
              className={`${styles.stylishButton} ${isButtonActive ? styles.active : ''}`}
              onClick={handleButtonClick}
            >
              <span>
                <div className={styles.container}>
                  <div className={styles.primary}></div>
                  <div className={styles.complimentary}></div>
                </div>
              </span>
              <span className={styles.buttonText}>Subscribe</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className={styles.popoverContent} ref={popoverRef}>
            <h4 className={styles.popoverTitle}>Subscribe to the feed</h4>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <Input
                  type="email"
                  name="email"
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
      <Toaster />
    </header>
  );
}