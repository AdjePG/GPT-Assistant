import z from 'zod'

const translateSchema = z.object({
  fromLanguage: z.enum(['auto', 'en', 'es', 'ca', 'fr', 'de']),
  toLanguage: z.enum(['en', 'es', 'ca', 'fr', 'de']),
  text: z.string()
})

export const validateTranslateSchema = (requestBody) => {
  return translateSchema.safeParse(requestBody)
}

const recipeSchema = z.object({
  text: z.string()
})

export const validateRecipeSchema = (requestBody) => {
  return recipeSchema.safeParse(requestBody)
}
