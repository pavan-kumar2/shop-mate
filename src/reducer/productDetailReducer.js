export const productDetailInitialState = {
    product: {},
    isLoading: false,
    error: null
}

export const productDetailReducer = (currentState, action) => {
    switch (action.type) {
        case 'PRODUCT_LOADING':
            return {
                ...currentState,
                isLoading: true,
                error: null
            }
        case 'PRODUCT_SUCCESS':
            return {
                ...currentState,
                isLoading: false,
                product: action.payload
            }
        case 'PRODUCT_FAILED':
            return {
                ...currentState,
                isLoading: false,
                error: action.payload
            }
        default: currentState
    }
}