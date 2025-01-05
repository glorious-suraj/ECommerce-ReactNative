import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductList from '../screens/ProductList';
import ProductDetails from '../screens/ProductDetails';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Product' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Product' component={ProductList} />
        <Stack.Screen name='Product Details' component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}