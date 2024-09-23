import React from 'react'
import styles from '@/lib/styles/article.module.css'

interface LanguageSwitcherProps {
    onLanguageChange: (lang: string) => void
    currentLanguage: string
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange, currentLanguage }) => {
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'zu', name: 'isiZulu' },
        { code: 'yo', name: 'Yoruba' },
        { code: 'sw', name: 'Swahili' },
        { code: 'ha', name: 'Hausa' },
    ]

    return (
        <select
            onChange={(e) => onLanguageChange(e.target.value)}
            value={currentLanguage}
            className={styles.languageSwitcher}
        >
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.name}
                </option>
            ))}
        </select>
    )
}

export default LanguageSwitcher