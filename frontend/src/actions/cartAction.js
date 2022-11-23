export const AddItemToCart =  (product, qty) =>
    (dispatch, getState) => {
        dispatch({
            type: 'AddItemToCart',
            payload: {
                ...product,
                qty
            }
        })
}