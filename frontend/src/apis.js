const BASE_URL = 'http://localhost:8000'

export async function getServerProducts () {
  const response = await fetch(`${BASE_URL}/products`)
  const products = await response.json()
  return products
}

export async function placeOrder (order) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify(order),
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    }
  })
  console.log(response)
  return response
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
    body: JSON.stringify(reqBody),
    credentials: 'include'
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
    },
    credentials: 'include'
  })
  console.log(response)
}

export const getServerCart = async (token) => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    credentials: 'include'
  })

  const parsedResponse = await response.json()
  const initialCart = parsedResponse.cart
  return JSON.stringify(initialCart)
}

export const updateServerCart = async (payload, token) => {
  console.log('payload in apis cart', payload)
  await fetch(`${BASE_URL}/cart`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'include'
  })
}

export async function handlePagination (page, category, limit, sortby, order) {
  const response = await fetch(`${BASE_URL}/products/?page=${page}&limit=${limit}&category=${category}&sortby=${sortby}&order=${order}`,
    {
      credentials: 'include'
    })
  const parsedProducts = await response.json()
  const products = parsedProducts.products
  return products
}

export async function getProductsCount (category) {
  const response = await fetch(`${BASE_URL}/products/${category}`, {
    credentials: 'include'
  })
  const parsedResponse = await response.json()
  const count = parsedResponse.count
  const pageCount = Math.ceil(count / 10)
  return pageCount
}

export async function getProductsOfCategory (category) {
  const response = await fetch(`${BASE_URL}/products/?page=1&category=${category}&sortby=id&order=ASC`, {
    credentials: 'include'
  })
  const parsedResponse = await response.json()
  const products = parsedResponse.products
  return products
}

export async function getMatchingProducts (keyword) {
  const response = await fetch(`${BASE_URL}/products/matchingProducts/${keyword}`, {
    credentials: 'include'
  })
  const parsedResponse = await response.json()
  const matchingProducts = parsedResponse.searchResults
  return matchingProducts
}

export async function logoutFromServer () {
  const response = await fetch(`${BASE_URL}/logout`, {
    credentials: 'include'
  })
  console.log('in logoout api', response.ok)
  return response
}

export async function getUserAddresses (order) {
  const response = await fetch(`${BASE_URL}/addresses`, {
    credentials: 'include'
  })
  const parsedResponse = await response.json()
  const addresses = parsedResponse.addresses
  return addresses
}
