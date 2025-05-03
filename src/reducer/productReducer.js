import { PRODUCTS_ACTIONS } from "../constants/actionTypes";

export const ProductInitialState = {
    products: [],
    isLoading: false,
    error: null,
};

export const productReducer = (currentState, action) => {
    switch (action.type) {
        case PRODUCTS_ACTIONS.FETCH_START:
            return {
                ...currentState,
                isLoading: true,
                error: null
            }
        case PRODUCTS_ACTIONS.FETCH_SUCCESS:
            return {
                ...currentState,
                isLoading: false,
                products: action.payload
            }
        case PRODUCTS_ACTIONS.FETCH_ERROR:
            return {
                ...currentState,
                isLoading: false,
                error: action.payload
            }
        default:
            return currentState;
    }
}