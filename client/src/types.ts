import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { AUTOLANGUAGE, LANGUAGES, RecipeActionType, ToastClass, TranslatorActionType } from "./constants"

export type Language = keyof typeof LANGUAGES
export type AutoLanguage = typeof AUTOLANGUAGE
export type FromLanguage = Language | AutoLanguage

export type TranslatorState = {
  fromLanguage: FromLanguage
  toLanguage: Language,
  fromText: string,
  toText: string,
  loading: boolean
}

export type RecipeState = {
  fromText: string,
  recipe: string,
  title: string,
  image: string,
  loading: boolean
}

export type TranslatorAction =
  | { type: TranslatorActionType.Reverse }
  | { type: TranslatorActionType.SetFromLang, payload: FromLanguage }
  | { type: TranslatorActionType.SetToLang, payload: Language }
  | { type: TranslatorActionType.SetFromText, payload: string }
  | { type: TranslatorActionType.SetToText, payload: string }

export type RecipeAction =
  | { type: RecipeActionType.SetFromText, payload: string }
  | { type: RecipeActionType.SetToTextAndImage, payload: string }
  | { type: RecipeActionType.SetLoading, payload: boolean }

export type TranslateResType =
  | { translatedText: undefined, errorMessage: string }
  | { translatedText: string, errorMessage: undefined }

export type RecipeResType =
  | { recipe: undefined, image: undefined, errorMessage: string }
  | { recipe: string, image: string, errorMessage: undefined }

export type ToastType = {
  id: number,
  text: string,
  toastClass: ToastClass,
  cancelable: boolean,
  delay: number
}

export type HeaderRouteType = {
  path: string,
  icon: IconDefinition,
  text: string
}