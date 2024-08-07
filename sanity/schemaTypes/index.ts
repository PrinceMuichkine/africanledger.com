import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {articleType} from './articleType'
import {authorType} from './authorType'
import {categoryType} from './categoryType'
import {tagType} from './tagType'
import {newsletterType} from './newsletterType'
import {mediaType} from './mediaType'
import {sectionType} from './sectionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    articleType,
    authorType,
    categoryType,
    tagType,
    newsletterType,
    mediaType,
    sectionType,
  ],
}