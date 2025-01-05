import {configureStore} from '@reduxjs/toolkit';
import productSlice from '../slices/product';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';

let persistConfig={
    key:'root',
    storage: AsyncStorage
}
let rootReducer = combineReducers({
    product: productSlice
})

let persistedReducer = persistReducer(persistConfig ,rootReducer)

export const store = configureStore({
   reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})