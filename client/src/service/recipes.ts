export async function recipes({
  text
}: {
  text: string
}) {
  return await fetch('http://localhost:1234/openai/recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text
    })
  })
    .then(res => res.json())
    .then(data => {
      return {
        recipe: data.recipe,
        image: data.image,
        errorMessage: data.errorMessage
      }
    })
    .catch(() => {
      return {
        recipe: undefined,
        image: undefined,
        errorMessage: "The generation of a recipe failed because of the connection to the server. Please, refresh or try it later."
      }
    })
}