import React from 'react'
import styles from '@/lib/styles/article.module.css'
import { useRouter } from 'next/navigation'

interface LanguageSwitcherProps {
    onLanguageChange: (selectedLanguage: string) => void
    currentLanguage: string
    article: any
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange, currentLanguage, article }) => {
    const router = useRouter()
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'zu', name: 'isiZulu' },
        { code: 'yo', name: 'Yoruba' },
        { code: 'sw', name: 'Swahili' },
        { code: 'ha', name: 'Hausa' },
    ]

    const handleLanguageChange = (selectedLanguage: string) => {
        onLanguageChange(selectedLanguage)
        if (selectedLanguage !== currentLanguage) {
            router.push(`/translated/${selectedLanguage}/${article.slug.current}`)
        }
    }

    return (
        <select
            onChange={(e) => handleLanguageChange(e.target.value)}
            value={currentLanguage}
            className={styles.languageSwitcher}
        >
            {languages.map((language) => (
                <option key={language.code} value={language.code}>
                    {language.name}
                </option>
            ))}
        </select>
    )
}

export default LanguageSwitcher