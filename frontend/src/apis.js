const BASE_URL = 'http://localhost:8000'

export async function getServerProducts () {
  const response = await fetch(`${BASE_URL}/products`)
  const products = await response.json()
  return products
}

export async function placeOrder (token, order) {
  const orderID = order.orderID
  const response = await fetch(`${BASE_URL}/orders/${orderID}/placement`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(order)
  })
  console.log(response)
}

export async function createOrder (token, productsIdArray) {
  const reqBody = {
    productsIdArray
  }
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  })
  const orderID = await response.json()
  return orderID
}

export async function cancelOrder (token, orderID) {
  const response = await fetch(`${BASE_URL}/orders/${orderID}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    }
  })
  console.log(response)
}

export const getServerCart = async (token) => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  })
  const initialCart = await response.json()

  return JSON.stringify(initialCart)
}

export const updateServerCart = async (payload, token) => {
  await fetch(`${BASE_URL}/cart`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

export async function handlePagination (page, category, limit) {
  const response = await fetch(`${BASE_URL}/products/page/?page=${page}&limit=${limit}&category=${category}&sortby=price&order=ASC`)
  const products = await response.json()
  return products
}

export async function getProductsCount (category) {
  const response = await fetch(`${BASE_URL}/products/pages/${category}`)
  const count = await response.json()
  const pageCount = Math.ceil(count / 10)
  return pageCount
}

export async function getProductsOfCategory (category) {
  const response = await fetch(`${BASE_URL}/products/page/?page=1&category=${category}&sortby=price&order=ASC`)
  const products = await response.json()
  return products
}

export async function getMatchingProducts (keyword) {
  const response = await fetch(`${BASE_URL}/products/matchingProducts/${keyword}`)
  const matchingProducts = await response.json()
  return matchingProducts
}
