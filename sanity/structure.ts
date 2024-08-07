import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('article').title('Articles'),
      S.documentTypeListItem('tag').title('Tags'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('newsletter').title('Newsletters'),
      S.documentTypeListItem('media').title('Media'),
      S.documentTypeListItem('section').title('Sections'),
    ])