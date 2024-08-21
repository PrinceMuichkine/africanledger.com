'use client';
import Link from 'next/link'
import styles from '../lib/styles/404.module.css'

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.gridBackground}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Oops! Page Not Found!</h2>
                <p className={styles.message}>
                    It seems like the page you're looking for<br />
                    does not exist or might have been removed.
                </p>
                <div className={styles.buttonContainer}>
                    <button
                        className={`${styles.button} ${styles.buttonOutline}`}
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </button>
                    <Link href="/" passHref>
                        <button className={`${styles.button} ${styles.buttonPrimary}`}>
                            Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}