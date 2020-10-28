/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import EventList from './Components/EventList';
import EventForm from './Components/EventForm';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={EventList} />
        <Stack.Screen name="Form" component={EventForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
