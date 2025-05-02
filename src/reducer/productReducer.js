export const ProductInitialState = {
    products: [],
    isLoading: false,
    error: null,
};

export const productReducer = (currentState, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...currentState,
                isLoading: true,
                error: null
            }
        case 'FETCH_SUCCESS':
            return {
                ...currentState,
                isLoading: false,
                products: action.payload
            }
        case 'FETCH_ERROR':
            return {
                ...currentState,
                isLoading: false,
                error: action.payload
            }
        default:
            return currentState;
    }
}