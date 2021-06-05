import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dogs from '../Dogs';

const Tab = createBottomTabNavigator();

function Errors() {
  return <Text>Errors</Text>;
}

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Queries" component={Dogs} />
        <Tab.Screen name="Errors" component={Errors} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
