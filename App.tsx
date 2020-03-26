import React from 'react';
import {StatusBar} from 'react-native';
import Home from './screens/HomeScreen';
import CurrentWorkout from './screens/CurrentWorkout';
import PastWorkouts from './screens/PastWorkouts';
import Settings from './screens/SettingsScreen/SettingsScreen';
import ThemeContext, {theme} from './contexts/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryScreen from './screens/SettingsScreen/Category/CategoryScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import EditExercise from './screens/SettingsScreen/Exercise/EditExerciseScreen';
import GQLProvider from './graphql/GQLProvider';

export type RootStackParamList = {
  Home: undefined;
  Current: undefined;
  Past: undefined;
  Settings: undefined;
  Category: {id: number; name: string};
  EditExercise: {id: number; name: string};
};

export type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const App = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <GQLProvider>
      <ThemeContext.Provider value={theme}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="Home">
            <RootStack.Screen name="Home" component={Home} />
            <RootStack.Screen name="Current" component={CurrentWorkout} />
            <RootStack.Screen name="Past" component={PastWorkouts} />
            <RootStack.Screen
              name="Settings"
              component={Settings}
              options={{title: 'Categories'}}
            />
            <RootStack.Screen
              name="Category"
              component={CategoryScreen}
              options={({route}) => ({title: route.params.name})}
            />
            <RootStack.Screen
              name="EditExercise"
              component={EditExercise}
              options={({route}) => ({title: route.params.name})}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </GQLProvider>
  );
};

export default App;
