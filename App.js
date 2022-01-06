import React, {useState, useEffect, useCallback} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  RefreshControl,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SectionList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import Store from './Screens/redux/store.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BScreen from './Screens/screens/BScreen.js';
import Login from './Screens/screens/Login';
import Map from './Screens/screens/Map.js';
import TodoList from './Screens/screens/TodoList.js';
import Task from './Screens/screens/Task.js';
import AddTodo from './Screens/screens/AddTodo.js';
import HomeScreen from './Screens/screens/HomeScreen.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
function HomeStack() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'menu-fold' : 'menu-unfold';
            size = focused ? 40 : 30;
            color = focused ? 'red' : 'green';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'exclamationcircleo' : 'exclamationcircleo';
            size = focused ? 40 : 30;
            color = focused ? 'red' : 'green';
          } else if (route.name === 'Map') {
            iconName = focused ? '' : 'exclamationcircleo';
            size = focused ? 40 : 30;
            color = focused ? 'red' : 'green';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: true,
        // activeBackgroundColor: '#fff',
        // InactiveBackgroundColor: '#999',
        labelStyle: {fontSize: 15},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarBadge: 3}}
      />
      <Tab.Screen name="Profile" component={BScreen} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
}
function Todo() {
  return (
    <Stack.Navigator initialRouteNam="TodoList">
      <Stack.Screen name="TodoList" component={TodoList} />
      <Stack.Screen name="AddTodo" component={AddTodo} />
      <Stack.Screen name="Task" component={Task} />
    </Stack.Navigator>
  );
}

const App = () => (
  <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Todo">
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Todo"
          component={Todo}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default App;
