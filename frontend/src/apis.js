const BASE_URL = 'http://localhost:8000'

export async function getServerProducts () {
  const response = await fetch(`${BASE_URL}/products`)
  const products = await response.json()
  return products
}

export const getServerCart = async () => {
  const response = await fetch(`${BASE_URL}/cart`, { method: 'GET' })
  const initialCart = await response.json()
  return JSON.stringify(initialCart)
}

export const updateServerCart = async (cartStr) => {
  return await fetch(`${BASE_URL}/cart`, {
    method: 'PUT',
    body: JSON.stringify({
      cart: cartStr,
      userID: 1
    }),
    headers: { 'content-type': 'application/json' }
  })
}
