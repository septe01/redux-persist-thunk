exports.dummyAction = (props) => dispatch => {
    return dispatch({
        type: 'SET_DARK',
        payload: true
    })
}

