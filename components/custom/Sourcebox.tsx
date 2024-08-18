import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../utils/styles/sourcebox.module.css'

interface SourceProps {
    name: string
    url: string
    order: number
}

export const SourceBox: React.FC<SourceProps> = ({ name, url, order }) => {
    const domain = new URL(url).hostname.replace('www.', '')
    const faviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.sourceBox}>
            <div className={styles.sourceName} title={name}>{name}</div>
            <div className={styles.faviconWrapper}>
                <Image src={faviconUrl} alt={`${name} favicon`} width={16} height={16} className={styles.favicon} />
                <span className={styles.sourceUrl}>{domain} · {order}</span>
            </div>
        </a>
    )
}

interface SourcePanelProps {
    isOpen: boolean;
    onClose: () => void;
    sources: { name: string; url: string }[] | undefined;
}

export const SourcePanel: React.FC<SourcePanelProps> = ({ isOpen, onClose, sources }) => {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`${styles.sourcePanel} ${isOpen ? styles.open : ''}`}>
            <div ref={panelRef} className={styles.sourcePanelContent}>
                <div className={styles.sourcePanelList}>
                    {sources && sources.map((source, index) => (
                        <SourceBox key={index} name={source.name} url={source.url} order={index + 1} />
                    ))}
                </div>
            </div>
        </div>
    )
}

interface ViewMoreProps {
    count: number
    onClick: () => void
    remainingSources: { name: string; url: string }[]
}

export const ViewMoreBox: React.FC<ViewMoreProps> = ({ count, onClick, remainingSources }) => {
    return (
        <div className={`${styles.sourceBox} ${styles.viewMoreBox}`} onClick={onClick}>
            <div className={styles.viewMoreIcons}>
                {remainingSources.slice(0, 4).map((source, index) => (
                    <Image
                        key={index}
                        src={`https://icons.duckduckgo.com/ip3/${new URL(source.url).hostname.replace('www.', '')}.ico`}
                        alt={`${source.name} favicon`}
                        width={20}
                        height={20}
                        className={styles.viewMoreIcon}
                    />
                ))}
            </div>
            <span className={styles.viewMoreText}>View {count} more</span>
        </div>
    )
}