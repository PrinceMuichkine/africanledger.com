import React from 'react'
import { SourceBox } from './Sourcebox'

interface Source {
    name: string
    url: string
}

interface ArticleSourcesProps {
    sources: Source[]
}

export const ArticleSources: React.FC<ArticleSourcesProps> = ({ sources }) => {
    return (
        <div className="article-sources">
            {sources.map((source, index) => (
                <SourceBox key={index} name={source.name} url={source.url} />
            ))}
        </div>
    )
}