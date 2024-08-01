"use client"

import React, { useEffect, useRef } from 'react';
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
    const asideRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const links = asideRef.current?.querySelectorAll('a');
        links?.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                link.parentElement?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        });
    }, []);

    return (
        <div className={styles.imageScroller}>
            <aside ref={asideRef} className={styles.aside}>
                <nav>
                    <ul className={styles.asideUl}>
                        {images.map((image) => (
                            <li key={image.id} id={`img-${image.id}`} className={styles.li}>
                                <a href={`#img-${image.id}`} className={styles.liA}>
                                    <img src={image.src} alt={image.alt} className={styles.liImg} />
                                    <span className={styles.asideSpan}>See image {image.id}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className={styles.main}>
                {images.map((image) => (
                    <img key={image.id} src={image.src} alt={image.alt} className={styles.mainImg} />
                ))}
            </main>
        </div>
    );
};

export default ImageScroller;