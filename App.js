import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import TapNavigator from './src/components/TapNavigator';
import {CoffeeProvider} from './src/store/CoffeeContext';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <CoffeeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={TapNavigator}
            name="tapNavigator"
            options={{headerShown: false}}
          />
          <Stack.Screen component={DetailsScreen} name="details" />
          <Stack.Screen component={PaymentScreen} name="payment" />
        </Stack.Navigator>
      </NavigationContainer>
    </CoffeeProvider>
  );
}

export default App;