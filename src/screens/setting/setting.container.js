
import { connect } from 'react-redux'
import Screen from './setting.screen'

const mapStateToProps = (state) => ({
    darkTheme: state.themeReducer.dark
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setDark: (value) => dispatch({ type: 'SET_DARK', payload: value })
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen)