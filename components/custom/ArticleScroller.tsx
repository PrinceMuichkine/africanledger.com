import React from 'react';
import styles from '../../utils/styles/article.module.css';

interface ArticleScrollerProps {
    children: React.ReactNode;
}

export default function ArticleScroller({ children }: ArticleScrollerProps) {
    return <div className={styles.articleScroller}>{children}</div>;
}