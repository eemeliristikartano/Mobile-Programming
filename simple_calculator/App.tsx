import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculator from './components/Calculator';
import History from './components/History';
import { StackParamsList } from './types';


const Stack = createNativeStackNavigator<StackParamsList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Calculator'>
        <Stack.Screen name='Calculator' component={Calculator} />
        <Stack.Screen name='History' component={History} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}