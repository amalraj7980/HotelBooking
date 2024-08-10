import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Button, ActivityIndicator } from 'react-native';
import HomeScreen from './src/screens/DashboardScreens/HomeScreen';
import LoginScreen from './src/screens/AuthScreens/LoginScreen';
import RegisterScreen from './src/screens/AuthScreens/RegisterScreen';
import { getUserInformation } from './src/utils/LocalStorage';
import LogoutButton from './src/components/LogoutButton';

const SettingsScreen = () => (
  <View>
    <Text>Settings Screen</Text>
  </View>
);
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen  options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <AuthStack.Screen  options={{ headerShown: false }} name="Register" component={RegisterScreen} />
      <AuthStack.Screen  options={{ headerShown: false }} name="HomeTabs" component={HomeTabs} />

    </AuthStack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
       options={{
        headerRight: () => <LogoutButton />,
        headerTitle: 'Home', // Set your header title if needed
      }}
         name="Home" component={HomeScreen} />
      <Tab.Screen options={{ headerShown: false }}  name="Settings" component={SettingsScreen} />

    </Tab.Navigator>
  );
}

function AppStackScreen() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen 
        name="HomeTabs" 
        component={HomeTabs} 
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getUserInformation('access_token');
        setIsAuthenticated(!!token); // Set true if token exists, otherwise false
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false after check
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}