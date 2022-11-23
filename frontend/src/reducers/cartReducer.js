function cartReducer (state={cartItems: []}, action) {
    switch (action.type) {
        case AddItemToCart:
            return {
                ...state,
                cartItems: [...cartItems, action.payload]
            }
    }
}

export default cartReducer