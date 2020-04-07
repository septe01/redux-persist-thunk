import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import { debounce } from "lodash";
import { View } from 'react-native'
import { connect } from 'react-redux'

// export const NetworkContext = React.createContext({ isConnected: true });

let unsubscribe = null

class NetworkProvider extends React.PureComponent {
  
    componentDidMount() {
        // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
        unsubscribe = NetInfo.addEventListener(state => {
            this.showSnackBar(state.isConnected ? 'you are online' : 'you are offline')
            this.handleConnectivityChange(state.isConnected)
        });
    }

    showSnackBar = debounce((text) => {
        console.log(text)
        Snackbar.show({
            text: text,
            duration: Snackbar.LENGTH_SHORT,
        });
    }, 2000)

    componentWillUnmount() {
        unsubscribe()
    }

    handleConnectivityChange = isConnected => this.props.setConnectionStatus(isConnected);

    render() {
        return (
                this.props.children
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setConnectionStatus: (value) => dispatch({ type: 'SET_IS_CONNECT', payload: value})
})

export default connect(null, mapDispatchToProps)(NetworkProvider)