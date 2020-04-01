import React from 'react';
import {StatusBar} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import HomeNavigator from './screens/HomeScreen/HomeNavigator';
import CurrentWorkoutNavigator from './screens/CurrentWorkoutScreen/CurrentWorkoutNavigator';
import PastWorkoutsNavigator from './screens/PastWorkoutsScreen/PastWorkoutsNavigator';
import SettingsNavigator from './screens/SettingsScreen/SettingsNavigator';
import GQLProvider from './graphql/GQLProvider';

export type RootTabParamList = {
  HomeNavigator: undefined;
  CurrentWorkoutNavigator: undefined;
  PastWorkoutsNavigator: undefined;
  SettingsNavigator: undefined;
};

export type RootNavigationProps = {
  navigation: BottomTabNavigationProp<RootTabParamList>;
};

const App = () => {
  const RootTabs = createBottomTabNavigator<RootTabParamList>();

  return (
    <GQLProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <RootTabs.Navigator
          initialRouteName="HomeNavigator"
          screenOptions={({route}) => ({
            tabBarIcon: ({color}) => {
              let iconName = '';
              switch (route.name) {
                case 'HomeNavigator':
                  iconName = 'home';
                  break;
                case 'CurrentWorkoutNavigator':
                  iconName = 'fitness-center';
                  break;
                case 'PastWorkoutsNavigator':
                  iconName = 'list';
                  break;
                case 'SettingsNavigator':
                  iconName = 'settings';
                  break;
                default:
                  break;
              }
              return <Icon name={iconName} type="material" color={color} />;
            },
          })}>
          <RootTabs.Screen
            name="HomeNavigator"
            component={HomeNavigator}
            options={{title: 'Home'}}
          />
          <RootTabs.Screen
            name="CurrentWorkoutNavigator"
            component={CurrentWorkoutNavigator}
            options={{title: 'Current'}}
          />
          <RootTabs.Screen
            name="PastWorkoutsNavigator"
            component={PastWorkoutsNavigator}
            options={{title: 'Past'}}
          />
          <RootTabs.Screen
            name="SettingsNavigator"
            component={SettingsNavigator}
            options={{title: 'Categories'}}
          />
        </RootTabs.Navigator>
      </NavigationContainer>
    </GQLProvider>
  );
};

export default App;
