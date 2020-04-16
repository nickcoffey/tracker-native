import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import SettingsScreen from './SettingsScreen';
import CategoryScreen from './Category/CategoryScreen';
import ExerciseScreen from './Exercise/ExerciseScreen';

export type SettingsStackParamList = {
  Settings: undefined;
  Category: {id: string; name: string};
  Exercise: {id: string; name: string};
};

export type SettingsNavigationProps = {
  navigation: StackNavigationProp<SettingsStackParamList>;
};

const SettingsNavigator = () => {
  const SettingsStack = createStackNavigator<SettingsStackParamList>();

  const options = ({
    route,
  }: {
    route:
      | RouteProp<SettingsStackParamList, 'Category'>
      | RouteProp<SettingsStackParamList, 'Exercise'>;
    navigation: any;
  }): {
    title: any;
  } => {
    return {title: route.params.name};
  };

  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Categories'}}
      />
      <SettingsStack.Screen
        name="Category"
        component={CategoryScreen}
        options={options}
      />
      <SettingsStack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={options}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
