import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import reducers from '../reducers/index.reducers';
const middleWares = [thunk, logger];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['themeReducer'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

// const store = createStore(
//     reducers,
//     applyMiddleware(...middleWares)
// )

// export default store

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(...middleWares));
  let persistor = persistStore(store);
  return {store, persistor};
};
