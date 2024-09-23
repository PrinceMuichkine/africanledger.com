import React from 'react';
import Head from 'next/head';
import Header from '../../components/landing/Header';
import { Footer } from '../../components/landing/Footer';
import styles from '../../lib/styles/policy.module.css';

const PrivacyPolicy: React.FC = () => {
    return (
        <>
            <Head>
                <title>Privacy Policy</title>
                <meta name="description" content="Privacy Policy for The African Ledger" />
            </Head>
            <Header />
            <div className={`${styles.policyContainer} container mx-auto`}>
                <h1 className={styles.policyTitle}>Privacy Policy</h1>
                <div className={styles.policyContent}>
                    <p>Last updated: [Insert Date]</p>

                    <h2>1. Introduction</h2>
                    <p>Welcome to The African Ledger&apos;s Privacy Policy. This policy describes how we collect, use, and protect your personal information.</p>

                    <h2>2. Information We Collect</h2>
                    <p>[Describe the types of information you collect]</p>

                    <h2>3. How We Use Your Information</h2>
                    <p>[Explain how you use the collected information]</p>

                    <h2>4. Data Protection</h2>
                    <p>[Describe your data protection measures]</p>

                    <h2>5. Your Rights</h2>
                    <p>[Explain user rights regarding their data]</p>

                    <h2>6. Changes to This Policy</h2>
                    <p>[Explain how you&apos;ll notify users of policy changes]</p>

                    <h2>7. Contact Us</h2>
                    <p>[Provide contact information for privacy-related inquiries]</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;