"use client"

import React, { useEffect, useRef, useState, WheelEvent } from 'react';
import styles from '../../utils/styles/ImageScroller.module.css';
import { initImageScroller } from '../../utils/actions/ImageScroller';

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
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const fixedImages = [...images, ...Array(Math.max(0, 100 - images.length))].slice(0, 100).map((img, index) => ({
        id: img?.id || `${index + 1}`,
        src: img?.src || `https://picsum.photos/600/600?random=${index + 1}`,
        alt: img?.alt || `Image ${index + 1}`
    }));

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScroll = () => {
        if (scrollerRef.current) {
            const scroller = scrollerRef.current;
            const scrollPosition = isMobile ? scroller.scrollLeft : scroller.scrollTop;
            const scrollSize = isMobile ? scroller.scrollWidth : scroller.scrollHeight;
            const clientSize = isMobile ? scroller.clientWidth : scroller.clientHeight;
            const maxScroll = scrollSize - clientSize;
            const scrollPercentage = scrollPosition / maxScroll;

            let index = Math.round(scrollPercentage * (fixedImages.length - 1));
            index = Math.min(Math.max(index, 0), fixedImages.length - 1);

            setActiveImageIndex(index);
        }
    };

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (scroller) {
            scroller.addEventListener('scroll', handleScroll);
            return () => {
                scroller.removeEventListener('scroll', handleScroll);
            };
        }
    }, [fixedImages.length, isMobile]);

    useEffect(() => {
        const timer = setTimeout(() => {
            initImageScroller();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (scrollerRef.current) {
            if (isMobile) {
                scrollerRef.current.scrollLeft += e.deltaY;
            } else {
                scrollerRef.current.scrollTop += e.deltaY;
            }
        }
    };

    const handleImageClick = (index: number) => {
        setActiveImageIndex(index);
        if (scrollerRef.current) {
            const scroller = scrollerRef.current;
            const scrollSize = isMobile ? scroller.scrollWidth : scroller.scrollHeight;
            const clientSize = isMobile ? scroller.clientWidth : scroller.clientHeight;
            const maxScroll = scrollSize - clientSize;
            const scrollPosition = (index / (fixedImages.length - 1)) * maxScroll;

            scrollerRef.current.scrollTo({
                [isMobile ? 'left' : 'top']: scrollPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (scrollerRef.current) {
            scrollerRef.current.style.scrollBehavior = 'auto';
        }
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (scrollerRef.current) {
            scrollerRef.current.style.scrollBehavior = 'smooth';
        }
    };

    return (
        <div className={styles.imageScrollerContainer} ref={containerRef}>
            <div className={styles.imageBox}>
                <main className={styles.main} onWheel={handleWheel}>
                    <img
                        src={fixedImages[activeImageIndex].src}
                        alt={fixedImages[activeImageIndex].alt}
                        className={styles.mainImg}
                    />
                </main>
                <div
                    ref={scrollerRef}
                    className={styles.imageScroller}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
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