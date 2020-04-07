
const initialData = {
    isConnect: false,
}
const netInfoReducer = (state = initialData, action) => {
    if (action.type == 'SET_IS_CONNECT')
        return {
            ...state,
            isConnect: action.payload
        }
    return {
        ...state
    }
}

export default netInfoReducer