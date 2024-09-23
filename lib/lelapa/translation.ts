import axios from 'axios'

export async function translateContent(content: string | object | string[], targetLanguage: string): Promise<string | object | string[]> {
  if (typeof content === 'string') {
    const response = await axios.post('/api/translate', { text: content, targetLanguage })
    return response.data.translatedText
  } else if (Array.isArray(content)) {
    return await Promise.all(content.map(item => translateContent(item, targetLanguage)))
  } else if (typeof content === 'object' && content !== null) {
    const translatedObj: Record<string, string | object | string[]> = {}
    for (const [key, value] of Object.entries(content)) {
      translatedObj[key] = await translateContent(value, targetLanguage)
    }
    return translatedObj
  }
  return content
}