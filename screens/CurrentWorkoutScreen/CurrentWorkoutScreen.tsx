import React from 'react';
import {Text, Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {useMutation} from '@apollo/react-hooks';

import CurrentWorkoutTimer from './CurrentWorkoutTimer';
import CurrentWorkoutSelectExercise from './CurrentWorkoutSelectExercise';
import {CurrentWorkoutNavigationProps} from './CurrentWorkoutNavigator';
import {
  ADD_WORKOUT,
  WorkoutCreateInput,
  Workout,
} from '../../graphql/WorkoutGQL';

const CurrentWorkoutScreen = ({navigation}: CurrentWorkoutNavigationProps) => {
  const [addWorkout] = useMutation<
    {returnedWorkout: Workout},
    {newWorkout: WorkoutCreateInput}
  >(ADD_WORKOUT);

  navigation.setOptions({
    headerRight: () => (
      <Button
        title="New"
        type="clear"
        onPress={() =>
          addWorkout({
            variables: {
              newWorkout: {...blankWorkout, startTime: getCurrentTimeString()},
            },
          })
        }
      />
    ),
  });

  const getCurrentTimeString = (): string => new Date().getTime().toString();

  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
    },
  });

  return (
    <>
      <Text style={styles.header} h4>
        Current Workout
      </Text>
      <CurrentWorkoutTimer />
      <CurrentWorkoutSelectExercise />
    </>
  );
};

const blankWorkout: WorkoutCreateInput = {
  startTime: '',
  endTime: '',
};

export default CurrentWorkoutScreen;
