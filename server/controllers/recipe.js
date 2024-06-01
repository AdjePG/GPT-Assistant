import OpenAI from 'openai'
import { rolesOpenAI } from '../constants.js'
import { validateRecipeSchema } from '../schemas/openai.js'

export class RecipeController {
  static async generateRecipe(req, res) {
    const result = validateRecipeSchema({
      ...req.body
    })

    if (result.error) return res.status(400).json({ errorMessage: result.error.message })

    const data = result.data
    const messages = [
      {
        role: rolesOpenAI.System,
        content: "You are an AI that generates a cooking recipe with the ingredients and instructions. You receive a text from the user. This text contains ingredients, a type of dish or a specific dish. DON'T answer anything, just generate a recipe. The structure of the message must be a JSON with these properties: 'title', which is title of recipe; 'ingredients', which is the list of ingredients; and 'steps' which are the steps. ANY other type of answer that you cannot add in this JSON, you MUST ALWAYS answer with this JSON only `{errorMessage: The server couldn't generate the recipe. Rewrite the prompt or try it later}`. Don't add possible comments."
      }, {
        role: rolesOpenAI.User,
        content: 'A vegan dish'
      }, {
        role: rolesOpenAI.Assistant,
        content: '{"title":"Salad with lettuce and tomatoes", "ingredients":["2 lettuce leaves", "1u tomato", "1u onion", "olives", "oil"], "steps":["Wash all the ingredients", "Cut all the ingredients", "Put and mix the ingredients in a bowl", "Add olives or any other ingredients", "Pour some oil"]}'
      }, {
        role: rolesOpenAI.User,
        content: 'Hello. I would like to know the awarded actors in the lastest Oscars show'
      }, {
        role: rolesOpenAI.Assistant,
        content: "{\"errorMessage\": \"The server couldn't generate the recipe. Rewrite the prompt or try it later\"}"
      }, {
        role: rolesOpenAI.User,
        content: 'Eggs, onion, potatoes'
      }, {
        role: rolesOpenAI.Assistant,
        content: '{"title":"Spanish omelette", "ingredients":["4 eggs", "1 onion", "5 potatoes"], "steps":["Peal and cut in slices the onions and the potatoes", "Add them in a pan to fry", "Mix the eggs in a bowl", "Once it is mixed, pour the onions and potatos in the bowl", "Mix them", "Pour all the bowl in the pan and wait until the omelette is done"]}'
      }, {
        role: rolesOpenAI.User,
        content: data.text
      }
    ]

    try {
      const openai = new OpenAI({ apiKey: process.env.API_KEY })
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages
      })

      const response = completion.choices[0]?.message?.content
      console.log(response)
      const { title, ingredients, steps, errorMessage } = await JSON.parse(response)
      if (errorMessage !== undefined) {
        return res.status(400).json({
          errorMessage: "The server couldn't generate the recipe. Rewrite the prompt or try it later"
        })
      } else {
        const { image, errorMessage } = await RecipeController.generateRecipeImage(title)
        let recipe
        console.log(image)

        recipe = title
        recipe += `\n\n${ingredients.join('\n')}`
        recipe += `\n\n${steps.join('\n')}`

        return res.json({
          recipe,
          image,
          errorMessage
        })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        errorMessage: "The server couldn't generate the recipe. Rewrite the prompt or try it later"
      })
    }
  }

  static async generateRecipeImage(title) {
    try {
      const openai = new OpenAI({ apiKey: process.env.API_KEY })
      const image = await openai.images.generate({
        model: 'dall-e-2',
        prompt: title,
        n: 1,
        size: '512x512'
      })

      return {
        image: image.data[0]?.url
      }
    } catch (error) {
      return {
        errorMessage: "The server couldn't generate the image"
      }
    }
  }
}
