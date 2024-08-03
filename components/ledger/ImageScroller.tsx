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
                const containerHeight = scrollerRef.current.clientHeight;
                const scrollHeight = scrollerRef.current.scrollHeight;
                const itemHeight = scrollHeight / fixedImages.length;

                // Calculate the index based on the scroll position
                let index = Math.floor(scrollPosition / itemHeight);

                // Adjust the index for the last few images
                if (scrollPosition + containerHeight >= scrollHeight - itemHeight) {
                    index = fixedImages.length - 1;
                }

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

    return (
        <div className={styles.imageScrollerContainer}>
            <div className={styles.imageBox}>
                <main className={styles.main}>
                    <img
                        src={fixedImages[activeImageIndex].src}
                        alt={fixedImages[activeImageIndex].alt}
                        className={styles.mainImg}
                    />
                </main>
                <div ref={scrollerRef} className={styles.imageScroller}>
                    <aside className={styles.aside}>
                        <nav>
                            <ul className={styles.asideUl}>
                                {fixedImages.map((image, index) => (
                                    <li key={image.id} className={`${styles.li} ${index === activeImageIndex ? styles.active : ''}`}>
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