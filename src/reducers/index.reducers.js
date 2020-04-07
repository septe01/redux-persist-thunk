import { combineReducers } from 'redux'
import netInfoReducer from './net_info.reducer'
import themeReducer from './theme.reducer'
import articleReducer from './article.reducer'

export default combineReducers({
    themeReducer,
    articleReducer,
    netInfoReducer
})