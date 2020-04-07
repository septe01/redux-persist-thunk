
const initialData = {
    data: [],
    isLoading: false,
    message: ''
}

const articleReducer = (state = initialData, action) => {
    switch (action.type) {
        case "GET_ARTICLE":
            return {
                ...state,
                isLoading: true
            }
        case "GET_ARTICLE_SUCCESS":
            return {
                ...state,
                data: action.payload.data,
                message: action.payload.message,
                isLoading: false
            }
        case "GET_ARTICLE_FAILED":
            return {
                ...state,
                message: action.payload.message,
                isLoading: false
            }
        default:
            return state
    }
}

export default articleReducer