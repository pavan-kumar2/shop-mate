import { ALL_CATEGORY, CATEGORY_ACTIONS } from "../constants/actionTypes";

export const categoryListInitialState = {
    categories: [],
    isLoading: false,
    error: null
}

const toTitleCase = (str) =>
    str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );


export const categoryListReducer = (currentState, action) => {

    switch (action.type) {
        case CATEGORY_ACTIONS.CATEGORY_LIST_LOADING:
            return { ...currentState, isLoading: true, error: null }

        case CATEGORY_ACTIONS.CATEGORY_LIST_SUCCESS:
            const modifiedCategories = [ALL_CATEGORY, ...action.payload]
            const updatedCategories = modifiedCategories.map(category => ({ value: category, label: toTitleCase(category) }))
            return { ...currentState, isLoading: false, categories: updatedCategories }

        case CATEGORY_ACTIONS.CATEGORY_LIST_FAILED:
            return { ...currentState, isLoading: false, error: action.payload }

        default:
            return currentState
    }

}
