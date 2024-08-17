import Link from 'next/link';
import Image from 'next/image';
import styles from '../../utils/styles/header-connect.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Link href="/" className={styles.logoContainer}>
                    {/* Reduced the image size */}
                    <Image src="/icon.png" alt="The African Ledger Logo" width={50} height={50} />
                </Link>
            </div>
        </header>
    );
}