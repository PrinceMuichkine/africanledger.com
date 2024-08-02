"use client"

import React, { useEffect, useRef, useState } from 'react';
import styles from '../../utils/styles/ImageScroller.module.css';

interface Image {
    id: string;
    src: string;
    alt: string;
}

interface ImageScrollerProps {
    images: Image[];
}

const ImageScroller: React.FC<ImageScrollerProps> = ({ images }) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const fixedImages = [...images, ...Array(Math.max(0, 100 - images.length))].slice(0, 100).map((img, index) => ({
        id: img?.id || `${index + 1}`,
        src: img?.src || `https://picsum.photos/600/600?random=${index + 1}`,
        alt: img?.alt || `Image ${index + 1}`
    }));

    useEffect(() => {
        const handleScroll = () => {
            if (scrollerRef.current) {
                const scrollPosition = scrollerRef.current.scrollTop;
                const itemHeight = scrollerRef.current.scrollHeight / fixedImages.length;
                const index = Math.min(Math.floor(scrollPosition / itemHeight), fixedImages.length - 1);
                setActiveImageIndex(index);
            }
        };

        scrollerRef.current?.addEventListener('scroll', handleScroll);

        return () => {
            scrollerRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, [fixedImages.length]);

    const handleImageClick = (index: number) => {
        setActiveImageIndex(index);
        if (scrollerRef.current) {
            const itemHeight = scrollerRef.current.scrollHeight / fixedImages.length;
            scrollerRef.current.scrollTo({
                top: index * itemHeight,
                behavior: 'smooth'
            });
        }
    };

    const safeActiveIndex = Math.max(0, Math.min(activeImageIndex, fixedImages.length - 1));

    return (
        <div className={styles.imageScrollerContainer}>
            <div className={styles.imageBox}>
                <main className={styles.main}>
                    <img
                        src={fixedImages[safeActiveIndex].src}
                        alt={fixedImages[safeActiveIndex].alt}
                        className={styles.mainImg}
                    />
                </main>
                <div ref={scrollerRef} className={styles.imageScroller}>
                    <aside className={styles.aside}>
                        <nav>
                            <ul className={styles.asideUl}>
                                {fixedImages.map((image, index) => (
                                    <li key={image.id} className={`${styles.li} ${index === safeActiveIndex ? styles.active : ''}`}>
                                        <button onClick={() => handleImageClick(index)} className={styles.liButton}>
                                            <img src={image.src} alt={image.alt} className={styles.liImg} />
                                            <span className={styles.asideSpan}>See image {image.id}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ImageScroller;