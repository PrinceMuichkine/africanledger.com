import React from 'react'
import Image from 'next/image'

interface SourceProps {
    name: string
    url: string
}

export const SourceBox: React.FC<SourceProps> = ({ name, url }) => {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${url}&sz=32`

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="source-box">
            <Image src={faviconUrl} alt={`${name} favicon`} width={16} height={16} />
            <span>{name}</span>
        </a>
    )
}