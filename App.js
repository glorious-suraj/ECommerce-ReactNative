import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import RootNavigation from './src/navigation/RootNavigation';
import {persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store)

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <RootNavigation />
      </PersistGate>
    </Provider>
  )
}