import { connect } from 'react-redux'
import Screen from './home.screen'
import { getArticle } from '../../actions/article.action'

const mapStateToProps = (state) => ({
    articles: state.articleReducer.data,
    articleLoading: state.articleReducer.isLoading,
    darkTheme: state.themeReducer.dark,
    isConnected: state.netInfoReducer.isConnect
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setTheme: (value) => dispatch({ type: 'SET_DARK', payload: value }),
    getArticle: () => dispatch(getArticle())
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen)