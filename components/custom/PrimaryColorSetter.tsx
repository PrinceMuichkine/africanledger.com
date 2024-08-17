'use client'

import { useEffect, useCallback, useMemo } from 'react'

// Predefined set of colors
const colors = [
    '#00FF52', // Active
    '#08CFCE', // Cyber
    '#FEB60A', // Gold
    '#E00A16', // Red
    '#007BFF', // Blue
    '#98D8C8', // Mint
];

const getDailyColorIndex = (): number => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return dayOfYear % colors.length;
}

export function PrimaryColorSetter() {
    const memoizedGetDailyColorIndex = useMemo(() => getDailyColorIndex, []);

    const setDailyColor = useCallback(() => {
        const colorIndex = memoizedGetDailyColorIndex();
        document.documentElement.style.setProperty('--primary-color', colors[colorIndex]);
    }, [memoizedGetDailyColorIndex]);

    useEffect(() => {
        setDailyColor();

        // Check for day change every hour
        const intervalId = setInterval(() => {
            const newColorIndex = memoizedGetDailyColorIndex();
            if (newColorIndex !== memoizedGetDailyColorIndex()) {
                setDailyColor();
            }
        }, 3600000); // 1 hour in milliseconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [setDailyColor, memoizedGetDailyColorIndex]);

    return null;
}