import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CharactersScreen from '../screens/CharactersScreen';
import EpisodesScreen from '../screens/EpisodesScreen';
import LocationsScreen from '../screens/LocationsScreen';
import { BottomTabParamList } from '../types';



const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      //initialRouteName="LandingPage"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, tabStyle: { padding: 10 }, labelStyle: { fontSize: 18 } }}>
      <BottomTab.Screen
        name="Characters"
        component={CharactersScreen}
      />
      <BottomTab.Screen
        name="Episodes"
        component={EpisodesScreen}

      />
      <BottomTab.Screen
        name="Locations"
        component={LocationsScreen}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomBtn: {
    alignItems: "center",
    display: "flex",
  }
})