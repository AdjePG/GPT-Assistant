export const LANGUAGES = {
  ar: 'Arabic',
  ca: 'Catalan',
  zh: 'Chinese',
  en: 'English',
  fr: 'French',
  de: 'German',
  ga: 'Irish',
  it: 'Italian',
  ja: 'Japonese',
  ro: 'Romanian',
  es: 'Spanish',
}

export const AUTOLANGUAGE = 'auto'

export enum TranslatorActionType {
  Reverse = "REVERSE_LANG",
  SetFromLang = "SET_FROM_LANG",
  SetToLang = "SET_TO_LANG",
  SetFromText = "SET_FROM_TEXT",
  SetToText = "SET_TO_TEXT"
}

export enum RecipeActionType {
  SetFromText = "SET_FROM_TEXT",
  SetToTextAndImage = "SET_TO_TEXT_AND_IMAGE",
  SetLoading = "SET_LOADING"
}

export enum LanguageSide {
  From = "from",
  To = "to"
}

export enum TextBoxType {
  Write = "write",
  Read = "read"
}

export enum ToastClass {
  Info = "info",
  Success = "success",
  Warning = "warning",
  Error = "error"
}