import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
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
        options={({route}) => ({title: route.params.name})}
      />
      <SettingsStack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={({route}) => ({title: route.params.name})}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
