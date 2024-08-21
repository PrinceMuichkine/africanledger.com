import Link from 'next/link';
import Image from 'next/image';
import styles from '../../lib/styles/header-connect.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                {/* Desktop header link (entire header clickable) */}
                <Link href="/" className={styles.desktopHeaderLink} />

                {/* Logo container (always visible, clickable on mobile/tablet) */}
                <Link href="/" className={styles.logoContainer}>
                    <Image src="/icon.png" alt="The African Ledger Logo" width={50} height={50} />
                </Link>
            </div>
        </header>
    );
}