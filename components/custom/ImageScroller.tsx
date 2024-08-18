"use client"

import React, { useEffect, useRef, useState, WheelEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../utils/styles/ImageScroller.module.css';
import { initImageScroller } from '../../utils/actions/ImageScroller';

interface Image {
    _id: string;
    title: string;
    slug: string;
    featuredImage: string;
    excerpt?: string;
}

interface ImageScrollerProps {
    images: Image[];
}

const ImageScroller: React.FC<ImageScrollerProps> = ({ images }) => {
    const router = useRouter();
    const scrollerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [imageStyle, setImageStyle] = useState({});
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth <= 1024;
            setIsMobile(isMobileView);
            setImageStyle(isMobileView ? {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
            } : {});
            // Ensure activeImageIndex is valid after resize
            setActiveImageIndex(prevIndex => Math.min(prevIndex, images.length - 1));
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [images.length]);

    const handleScroll = () => {
        if (scrollerRef.current && images.length > 0) {
            const scroller = scrollerRef.current;
            const scrollPosition = isMobile ? scroller.scrollLeft : scroller.scrollTop;
            const scrollSize = isMobile ? scroller.scrollWidth : scroller.scrollHeight;
            const clientSize = isMobile ? scroller.clientWidth : scroller.clientHeight;
            const maxScroll = scrollSize - clientSize;
            const scrollPercentage = scrollPosition / maxScroll;

            let index = Math.round(scrollPercentage * (images.length - 1));
            index = Math.min(Math.max(index, 0), images.length - 1);

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
    }, [images.length, isMobile]);

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
        setIsFlipped(false);
    };

    const handleMainImageClick = () => {
        const activeImage = getActiveImage();
        router.push(`/article/${activeImage.slug}`);
    };

    const handleFlipClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFlipped(prev => !prev);
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

    // Helper function to safely get the active image
    const getActiveImage = () => {
        return images[activeImageIndex] || images[0] || { featuredImage: '', title: '', slug: '' };
    };

    if (images.length === 0) {
        return <div>No images available</div>;
    }

    return (
        <div className={styles.imageScrollerContainer} ref={containerRef}>
            <div className={styles.imageBox}>
                <main className={styles.main} onWheel={handleWheel}>
                    <div className={styles.mainImageContainer}>
                        <div className={`${styles.flipper} ${isFlipped ? styles.flipped : ''}`}>
                            <div className={styles.front}>
                                <img
                                    src={getActiveImage().featuredImage}
                                    alt={getActiveImage().title}
                                    className={styles.mainImg}
                                    onClick={handleMainImageClick}
                                    style={{
                                        cursor: 'pointer',
                                        ...imageStyle
                                    }}
                                    loading="lazy"
                                />
                            </div>
                            <div className={styles.back}>
                                <h2>{getActiveImage().title}</h2>
                                <p>{getActiveImage().excerpt}</p>
                                <button onClick={() => router.push(`/article/${getActiveImage().slug}`)}>
                                    Read More
                                </button>
                            </div>
                        </div>
                        <button
                            className={styles.flipButton}
                            onClick={handleFlipClick}
                        >
                            <img src="/flip.png" alt="Flip" className={styles.flipIcon} />
                        </button>
                    </div>
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
                                {images.map((image, index) => (
                                    <li key={image._id} className={`${styles.li} ${index === activeImageIndex ? styles.active : ''}`}>
                                        <button onClick={() => handleImageClick(index)} className={styles.liButton}>
                                            <img
                                                src={image.featuredImage}
                                                alt={image.title}
                                                className={styles.liImg}
                                                loading="lazy"
                                            />
                                            <span className={styles.asideSpan}>{image.title}</span>
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