'use client'

import { useEffect, useCallback, useMemo } from 'react'

const colors = [
    '#00FF50', // Sunday - Active
    '#00FF50', // Monday - Active
    '#08CFCE', // Tuesday - Cyber
    '#FEB60A', // Wednesday - Gold
    '#E00A16', // Thursday - Red
    '#98D8C8', // Friday - Mint
    '#98D8C8', // Saturday  - Mint
];

const getDailyColorIndex = (): number => {
    const today = new Date();
    return today.getDay(); // 0 for Sunday, 1 for Monday, etc.
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

        return () => clearInterval(intervalId);
    }, [setDailyColor, memoizedGetDailyColorIndex]);

    return null;
}