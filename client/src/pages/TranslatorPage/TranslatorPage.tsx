import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './TranslatorPage.css'
import { useTranlator as useTranslator } from '../../hooks/useTranslator'
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons'
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector'
import TextBox from '../../components/TextBox/TextBox'
import { translate } from '../../service/translate'
import { useEffect } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { LanguageSide, TextBoxType, ToastClass } from '../../constants'
import { useToast } from '../../hooks/useToast'

export default function TranslatorPage() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    toText,
    loading,
    reverseLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setToText
  } = useTranslator()
  const { openToast } = useToast()

  const debouncedText = useDebounce(fromText, 400)

  useEffect(() => {
    if (debouncedText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedText })
      .then(result => {
        if (result.errorMessage !== undefined) {
          openToast(result.errorMessage, ToastClass.Error)
        } else {
          setToText(result.translatedText)
        }
      })
  }, [debouncedText, fromLanguage, toLanguage])

  return (
    <div className='translatorPage'>
      <h2 className='title'>GPT-Translator</h2>
      <main className='container'>
        <LanguageSelector
          side={LanguageSide.From}
          value={fromLanguage}
          setLanguage={setFromLanguage}
        />
        <button className='reverse' onClick={reverseLanguages}>
          <FontAwesomeIcon icon={faArrowsLeftRight} />
        </button>
        <LanguageSelector
          side={LanguageSide.To}
          value={toLanguage}
          setLanguage={setToLanguage}
        />

        <TextBox
          type={TextBoxType.Write}
          value={fromText}
          placeholder="Write some text or drop a txt file..."
          setText={setFromText}
        />
        <TextBox
          type={TextBoxType.Read}
          value={toText}
          placeholder={loading ? "Loading..." : "Translation here"}
          language={toLanguage}
        />
      </main>
    </div>
  )
}
