import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import CurrentWorkoutScreen from './CurrentWorkoutScreen';

export type CurrentWorkoutStackParamList = {
  CurrentWorkout: undefined;
};

export type CurrentWorkoutNavigationProps = {
  navigation: StackNavigationProp<CurrentWorkoutStackParamList>;
};

const CurrentWorkoutNavigator = () => {
  const CurrentWorkoutStack = createStackNavigator<
    CurrentWorkoutStackParamList
  >();
  return (
    <CurrentWorkoutStack.Navigator>
      <CurrentWorkoutStack.Screen
        name="CurrentWorkout"
        component={CurrentWorkoutScreen}
        options={{title: 'Current'}}
      />
    </CurrentWorkoutStack.Navigator>
  );
};

export default CurrentWorkoutNavigator;
