import { useReducer } from 'react'
import { RecipeState, RecipeAction } from '../types'
import { RecipeActionType } from '../constants'

const initialState: RecipeState = {
  fromText: '',
  recipe: '',
  title: '',
  image: '',
  loading: false
}

const reducer = (state: RecipeState, action: RecipeAction) => {
  if (action.type === RecipeActionType.SetFromText) {
    return {
      ...state,
      fromText: action.payload,
    }
  } else if (action.type === RecipeActionType.SetLoading) {
    return {
      ...state,
      loading: action.payload
    }
  } else if (action.type === RecipeActionType.SetToTextAndImage) {
    const { recipe, image } = JSON.parse(action.payload)

    return {
      ...state,
      loading: false,
      recipe: recipe,
      image: image
    }
  }

  return state
}

export function useRecipe() {
  const [{ fromText, recipe, image, loading }, dispatch] = useReducer(reducer, initialState)

  const setFromText = (payload: string) => {
    dispatch({ type: RecipeActionType.SetFromText, payload })
  }

  const setLoading = (payload: boolean) => {
    dispatch({ type: RecipeActionType.SetLoading, payload })
  }

  const setRecipe = (payload: string) => {
    dispatch({ type: RecipeActionType.SetToTextAndImage, payload })
  }

  return {
    fromText,
    recipe,
    image,
    loading,
    setFromText,
    setLoading,
    setRecipe
  }
}