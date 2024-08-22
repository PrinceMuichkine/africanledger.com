"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Header from '@/components/landing/Header-connect';
import { Footer } from '@/components/landing/Footer';
import styles from '@/lib/styles/login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            if (error.message.includes('Email rate limit exceeded')) {
                setMessage('Too many attempts. Please try again later.');
            } else if (error.message.includes('User already registered')) {
                setMessage('This email is already registered. Please use the login link.');
            } else {
                setMessage(`Failed to send magic link: ${error.message}`);
            }
        } else {
            setMessage('Check your email for the login link!');
        }

        setLoading(false);
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <main className={styles.mainContent}>
                <h1 className={styles.title}>Login</h1>
                <form onSubmit={handleLogin} className={styles.form}>
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Loading...' : 'Send magic link'}
                    </button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
            </main>
            <Footer />
        </div>
    );
}