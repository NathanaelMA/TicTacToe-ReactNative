import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './component/Login';
import TicTacToe from './component/TicTacToe';
import Signup from './component/Signup';
import Leaderboard from './component/Leaderboard';
import {AppProvider} from './Context/AppContext';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="TicTacToe" component={TicTacToe} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Leaderboard" component={Leaderboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
