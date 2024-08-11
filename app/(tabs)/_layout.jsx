import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.Black,
      }}
    >
      <Tabs.Screen 
        name="home"
        options={{ 
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="favorite"
        options={{ 
          title: 'Favorite',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="inbox"
        options={{ 
          title: 'Inbox',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="inbox" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile"
        options={{ 
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
