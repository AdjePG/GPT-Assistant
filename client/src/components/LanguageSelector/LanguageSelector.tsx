import { AUTOLANGUAGE, LANGUAGES, LanguageSide } from "../../constants"
import { type FromLanguage, type Language } from "../../types"
import "./LanguageSelector.css"

type Props =
  | { side: LanguageSide.From, value: FromLanguage, setLanguage: (language: FromLanguage) => void }
  | { side: LanguageSide.To, value: Language, setLanguage: (language: Language) => void }

export default function LanguageSelector({ side, value, setLanguage }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language)
  }

  return (
    <select className={`langBox ${side}`} value={value} onChange={handleChange}>
      {side === LanguageSide.From && <option value={AUTOLANGUAGE}>Detect Language</option>}

      {Object.entries(LANGUAGES).map(([code, language]) => (
        <option key={code} value={code}>
          {language}
        </option>
      ))}
    </select>
  )
}