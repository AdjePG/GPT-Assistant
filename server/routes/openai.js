import { Router } from 'express'
import { TranslateController } from '../controllers/translate.js'
import { RecipeController } from '../controllers/recipe.js'

export const operationsRouter = Router()

operationsRouter.post('/translate', TranslateController.translate)
operationsRouter.post('/recipe', RecipeController.generateRecipe)
