"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from "@/components/ui/sonner";
import styles from '../../utils/styles/header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form submitted with email:', email); // Debug log

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Call the API route to handle subscription
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // Send email to the API
    });

    console.log('Response status:', response.status); // Debug log for response status

    // Check if response is OK
    if (!response.ok) {
      const errorText = await response.text(); // Get the response text
      console.error('Error response:', errorText); // Log the error response
      toast.error("Submission failed."); // Show error message
      return; // Exit the function
    }

    // Parse the JSON response
    const result = await response.json();
    console.log('API response:', result); // Debug log

    toast.success(result.message); // Show success message
    setEmail(''); // Clear the email input
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoContainer}>
          <Image src="/icon.png" alt="The African Ledger Logo" width={55} height={55} />
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