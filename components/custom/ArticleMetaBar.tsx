"use client"

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from '../../utils/styles/articleMetaBar.module.css';
import { toast } from 'sonner';

interface ArticleMetaBarProps {
    publishDate: string;
}

type SharePlatform = 'copyLink' | 'linkedin' | 'twitter' | 'whatsapp' | 'facebook';

const ArticleMetaBar: React.FC<ArticleMetaBarProps> = ({ publishDate }) => {
    const pathname = usePathname();
    const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;
    const toastRef = useRef<string | number | null>(null);

    const shareLinks: Record<SharePlatform, string> = {
        copyLink: fullUrl,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent('Check out this article!')}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`Check out this article: ${fullUrl}`)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    };

    const handleShare = (platform: SharePlatform) => {
        if (platform === 'copyLink') {
            navigator.clipboard.writeText(fullUrl);
            toast.success('Copied!', {
                style: {
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    fontWeight: 'bold',
                    width: '60%',
                    borderRadius: '0px',
                    padding: '12px',
                    marginBottom: '20%',
                },
                duration: 1500,
            });
        } else {
            window.open(shareLinks[platform], '_blank');
        }
        if (toastRef.current) {
            toast.dismiss(toastRef.current);
        }
    };

    const showShareToast = () => {
        if (toastRef.current) {
            toast.dismiss(toastRef.current);
        }
        toastRef.current = toast(
            <div className={styles.shareToast} onClick={(e) => e.stopPropagation()}>
                <button onClick={() => handleShare('copyLink')}>Copy link</button>
                <button onClick={() => handleShare('linkedin')}>LinkedIn</button>
                <button onClick={() => handleShare('twitter')}>X | Twitter</button>
                <button onClick={() => handleShare('whatsapp')}>WhatsApp</button>
                <button onClick={() => handleShare('facebook')}>Facebook</button>
            </div>,
            {
                duration: 2000,
                onDismiss: () => {
                    toastRef.current = null;
                },
                position: 'bottom-right',
            }
        );
    };

    return (
        <div className={styles.metaBar}>
            <span className={styles.publishDate}>{publishDate}</span>
            <button className={styles.shareButton} onClick={showShareToast}>
                Share
            </button>
        </div>
    );
};

export default ArticleMetaBar;