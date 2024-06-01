import { useReducer } from 'react'
import { TranslatorAction, TranslatorState, FromLanguage, Language } from '../types'
import { AUTOLANGUAGE, TranslatorActionType } from '../constants'

const initialState: TranslatorState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  toText: '',
  loading: false
}

const reducer = (state: TranslatorState, action: TranslatorAction) => {
  if (action.type === TranslatorActionType.Reverse) {
    if (state.fromLanguage === AUTOLANGUAGE) return state

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  } else if (action.type === TranslatorActionType.SetFromLang) {
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      toText: '',
      loading
    }
  } else if (action.type === TranslatorActionType.SetToLang) {
    if (state.toLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      toLanguage: action.payload,
      toText: '',
      loading
    }
  } else if (action.type === TranslatorActionType.SetFromText) {
    const loading = action.payload !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      toText: ''
    }
  } else if (action.type === TranslatorActionType.SetToText) {
    return {
      ...state,
      loading: false,
      toText: action.payload
    }
  }

  return state
}

export function useTranlator() {
  const [{ fromLanguage, toLanguage, fromText, toText, loading }, dispatch] = useReducer(reducer, initialState)

  const reverseLanguages = () => {
    dispatch({ type: TranslatorActionType.Reverse })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: TranslatorActionType.SetFromLang, payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: TranslatorActionType.SetToLang, payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: TranslatorActionType.SetFromText, payload })
  }

  const setToText = (payload: string) => {
    dispatch({ type: TranslatorActionType.SetToText, payload })
  }

  return {
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
  }
}