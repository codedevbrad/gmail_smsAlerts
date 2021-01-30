
import React from 'react';
import { NavigationContainer , CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// navigation
const Stack = createStackNavigator();

// no auth
import HomeScreen  from './screens/authlogin/login__home';
import LoginSteps from './screens/authlogin/login__steps';
import LoginScreen from './screens/authlogin/login__firstSteps';
// has auth
import DashboardScreen from './screens/authstate/dashboard';

function AppNavigator() {
    return (
      <NavigationContainer>
              <Stack.Navigator screenOptions={ { headerShown: false } }>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Login" component={ LoginScreen } />
                  <Stack.Screen name="LoginDetails" component={ LoginSteps } />
                  <Stack.Screen name="Dashboard" component={ DashboardScreen } />
              </Stack.Navigator>
      </NavigationContainer>
    );
}

export default AppNavigator;
