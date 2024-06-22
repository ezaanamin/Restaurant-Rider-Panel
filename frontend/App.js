import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { styles } from './styles/styles';
import Login from './screens/Login';
import Home from './screens/Home';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContextProvider } from './contextState/contextState';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Review from './screens/Reviews';
import Profile from './screens/Profile';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator   barStyle={{ backgroundColor: '#c1dcb6' }}>
   <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarLabel: 'My Orders',
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" color={color} size={26} />
          ),
        }}
      />
         <Tab.Screen 
        name="Review " 
        component={Review} 
        options={{
          tabBarLabel: 'Customer Feedback',
          tabBarIcon: ({ color }) => (
            <Icon name="star-outline" color={color} size={26} /> 
          ),
        }}
      />

<Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" color={color} size={26} /> // Using user-circle icon from FontAwesome for profile
          ),
        }}
      />

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserContextProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="MainTabs" 
              component={MainTabs} 
              options={{ headerShown: false }} 
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </Provider>
    </UserContextProvider>
  );
}
