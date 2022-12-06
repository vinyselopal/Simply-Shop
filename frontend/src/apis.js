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

export async function handlePagination (page, category, pageCount) {
  console.log('page', page, pageCount)
  const response = await fetch(`http://localhost:8000/products/page/?page=${page}&&category=${category}`)
  console.log('response', response)
  const products = await response.json()
  console.log(JSON.parse(products))
  return JSON.parse(products)
}

export async function getProductsCount (category) {
  const response = await fetch(`http://localhost:8000/products/pages/${category}`)
  const count = await response.json()
  const pageCount = Math.ceil(count / 10)
  return pageCount
}

export async function getProductsOfCategory (category) {
  const response = await fetch(`http://localhost:8000/products/page/?page=1&&category=${category}`)
  const products = await response.json()
  console.log('products', products)
  return products
}
