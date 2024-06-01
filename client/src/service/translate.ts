import { FromLanguage, Language, TranslateResType } from '../types'

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage,
  toLanguage: Language,
  text: string
}) {
  let translateResult: TranslateResType

  if (fromLanguage === toLanguage) {
    translateResult = {
      translatedText: text,
      errorMessage: undefined
    }

    return translateResult
  } else {
    translateResult = await fetch('http://localhost:1234/openai/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fromLanguage,
        toLanguage,
        text
      })
    })
      .then(res => res.json())
      .then(data => {
        return {
          translatedText: data.translation,
          errorMessage: data.errorMessage
        }
      })
      .catch(() => {
        return {
          translatedText: undefined,
          errorMessage: "The translation failed because of the connection to the server. Please, refresh or try it later."
        }
      })
  }

  return translateResult;
}