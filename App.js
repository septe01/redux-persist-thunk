import 'react-native-gesture-handler';
import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

// REDUX
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import getStore from './src/utils/store'
import { PersistGate } from 'redux-persist/integration/react'

// SCREENS
import HomeScreen from './src/screens/home/home.container'
import SettingScreen from './src/screens/setting/setting.container'
import NewsDetailScreen from './src/screens/news_detail/news_detail.container'

import NetworkProvider from './src/utils/network_provider';

// const Stack = createStackNavigator();
const Stack = createSharedElementStackNavigator();

const { store, persistor } = getStore()

const ThemeComponent = ({ darkTheme, setDark }) => {
  return (
    <NavigationContainer theme={darkTheme ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
          title: 'Articles',
          headerRight: () => {
            return (
              <TouchableOpacity style={{ paddingHorizontal: 10, }} onPress={() => navigation.navigate('Setting')}>
                <Icon name="cog" size={24} color={darkTheme ? "white" : "black"} />
              </TouchableOpacity>
            )
          },
        })} />
        <Stack.Screen
          name="NewsDetail"
          component={NewsDetailScreen}
          sharedElementsConfig={(route) => {
            return [`${route.params.arguments.cover}`];
          }}
          options={() => ({
            title: '',
            headerTransparent: true,
            // headerBackground: () => <View style={{ height: 100, width: 500, backgroundColor: 'black', opacity: 0.5}}></View>
          })} />
        <Stack.Screen name="Setting" component={SettingScreen} options={() => ({ title: 'Settings' })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = (state) => ({
  darkTheme: state.themeReducer.dark
})


const ReduxWrap = connect(mapStateToProps)(ThemeComponent)

export default function App() {

  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NetworkProvider>
          <ReduxWrap />
        </NetworkProvider >
      </PersistGate>
    </Provider>

  );
}