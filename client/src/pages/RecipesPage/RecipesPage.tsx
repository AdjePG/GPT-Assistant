import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TextBox from "../../components/TextBox/TextBox"
import { TextBoxType, ToastClass } from "../../constants"
import { useRecipe } from "../../hooks/useRecipe"
import { useToast } from "../../hooks/useToast"
import "./RecipesPage.css"
import { faImage } from "@fortawesome/free-regular-svg-icons"
import { recipes } from "../../service/recipes"
import { useEffect } from "react"

export default function RecipesPage() {
  const {
    fromText,
    recipe,
    image,
    loading,
    setFromText,
    setLoading,
    setRecipe
  } = useRecipe()
  const { openToast } = useToast()

  useEffect(() => {
    if (loading) {
      generateRecipe()
    }
  }, [loading])

  const generateRecipe = () => {
    if (fromText === '') {
      openToast("To generate a recipe, you have to add something in the textbox", ToastClass.Warning)
      setLoading(false)
      return
    }

    recipes({ text: fromText })
      .then(result => {
        if (result.errorMessage !== undefined && result.recipe === undefined) {
          openToast(result.errorMessage, ToastClass.Error)
          setLoading(false)
        } else {
          if (result.errorMessage !== undefined) {
            openToast(result.errorMessage, ToastClass.Warning)
          }

          setRecipe(JSON.stringify({
            recipe: result.recipe,
            image: result.image ?? ""
          }))
        }
      })
  }

  return (
    <div className='recipesPage'>
      <h2 className='title'>GPT-Recipes</h2>
      <p>Add some ingredients or a random type of food</p>
      <main className='container'>
        <TextBox
          type={TextBoxType.Write}
          value={fromText}
          placeholder="Write some text or drop a txt file..."
          setText={setFromText}
        />
        <button className="generate" onClick={() => setLoading(true)}>Generate recipe!</button>
        {
          image
            ? <img className="recipeImage" src={image} alt={`Photo of the '${image}' recipe`} />
            : <div className="recipeImage none">
              <FontAwesomeIcon icon={faImage} />
            </div>
        }
        <TextBox
          type={TextBoxType.Read}
          value={recipe}
          placeholder={loading ? "Loading..." : "Generating recipe here"}
          language="en"
        />
      </main>
    </div>
  )
}