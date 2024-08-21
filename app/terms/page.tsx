import React from 'react';
import Head from 'next/head';
import Header from '../../components/landing/Header';
import { Footer } from '../../components/landing/Footer';
import styles from '../../lib/styles/policy.module.css';

const TermsOfService: React.FC = () => {
    return (
        <>
            <Head>
                <title>Terms of Service</title>
                <meta name="description" content="Terms of Service for The African Ledger" />
            </Head>
            <Header />
            <div className={`${styles.policyContainer} container mx-auto`}>
                <h1 className={styles.policyTitle}>Terms of Service</h1>
                <div className={styles.policyContent}>
                    <p>Last updated: [Insert Date]</p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using The African Ledger, you agree to be bound by these Terms of Service.</p>

                    <h2>2. Use of Service</h2>
                    <p>[Describe how users are expected to use your service]</p>

                    <h2>3. User Accounts</h2>
                    <p>[If applicable, explain account creation and responsibilities]</p>

                    <h2>4. Intellectual Property</h2>
                    <p>[Describe your intellectual property rights and user limitations]</p>

                    <h2>5. Limitation of Liability</h2>
                    <p>[Explain your liability limitations]</p>

                    <h2>6. Governing Law</h2>
                    <p>[Specify which laws govern these terms]</p>

                    <h2>7. Changes to Terms</h2>
                    <p>[Explain how you'll notify users of changes to these terms]</p>

                    <h2>8. Contact Information</h2>
                    <p>[Provide contact information for terms-related inquiries]</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsOfService;