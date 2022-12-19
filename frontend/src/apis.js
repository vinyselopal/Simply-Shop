const BASE_URL = 'http://localhost:8000'

export async function getServerProducts () {
  const response = await fetch(`${BASE_URL}/products`)
  const products = await response.json()
  return products
}

export const getServerCart = async (token) => {
  const response = await fetch(`${BASE_URL}/cart`, { method: 'GET', headers: { Authorization: `Bearer ${token}` } })
  const initialCart = await response.json()

  return JSON.stringify(initialCart)
}

export const updateServerCart = async (cartStr, userID, token) => {
  console.log('in updateServerCart', userID)
  const response = await fetch(`${BASE_URL}/cart`, {
    method: 'PUT',
    body: JSON.stringify({
      cart: cartStr,
      userID
    }),
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` }
  })
  const resp = await response.json()
  console.log('resp', resp)
}

export async function handlePagination (page, category, pageCount) {
  console.log('page', page, pageCount)
  const response = await fetch(`${BASE_URL}/products/page/?page=${page}&&category=${category}`)
  console.log('response', response)
  const products = await response.json()
  console.log(JSON.parse(products))
  return JSON.parse(products)
}

export async function getProductsCount (category) {
  const response = await fetch(`${BASE_URL}/products/pages/${category}`)
  const count = await response.json()
  const pageCount = Math.ceil(count / 10)
  return pageCount
}

export async function getProductsOfCategory (category) {
  const response = await fetch(`${BASE_URL}/products/page/?page=1&&category=${category}`)
  const products = await response.json()
  return products
}

export async function getMatchingProducts (keyword) {
  const response = await fetch(`${BASE_URL}/products/matchingProducts/${keyword}`)
  const matchingProducts = await response.json()
  return matchingProducts
}
