
const initialData = {
    dark: false,
}
const themeReducer = (state = initialData, action) => {
    if (action.type == 'SET_DARK')
        return {
            ...state,
            dark: action.payload
        }
    return {
        ...state
    }
}

export default themeReducer