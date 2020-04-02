import React, {useState} from 'react';
import {Button} from 'react-native-elements';
import {useMutation} from '@apollo/react-hooks';

import CurrentWorkoutTimer from './CurrentWorkoutTimer';
import CurrentWorkoutSelectExercise from './CurrentWorkoutSelectExercise';
import {CurrentWorkoutNavigationProps} from './CurrentWorkoutNavigator';
import {
  ADD_WORKOUT,
  WorkoutCreateInput,
  Workout,
  WorkoutUpdateInput,
  UPDATE_WORKOUT,
} from '../../graphql/WorkoutGQL';

const CurrentWorkoutScreen = ({navigation}: CurrentWorkoutNavigationProps) => {
  const [addWorkout] = useMutation<
    {addWorkout: Workout},
    {newWorkout: WorkoutCreateInput}
  >(ADD_WORKOUT);

  const [updateWorkout] = useMutation<
    {updateWorkout: Workout},
    {updatedWorkout: WorkoutUpdateInput}
  >(UPDATE_WORKOUT);

  const [workout, setWorkout] = useState<Workout | undefined>();

  const [seconds, setSeconds] = useState(0);
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  navigation.setOptions({
    headerRight: () =>
      workout === undefined ? (
        <Button
          title="New"
          type="clear"
          onPress={() =>
            addWorkout({
              variables: {
                newWorkout: {
                  ...blankWorkout,
                  startTime: getCurrentTimeString(),
                },
              },
            }).then(res => {
              setWorkout(res.data?.addWorkout);
              setIsTimerStarted(true);
            })
          }
        />
      ) : (
        <Button
          title="Stop"
          type="clear"
          onPress={() => {
            const {id} = workout;
            updateWorkout({
              variables: {
                updatedWorkout: {id, endTime: getCurrentTimeString()},
              },
            }).then(() => {
              setIsTimerStarted(false);
              setSeconds(0);
              setWorkout(undefined);
            });
          }}
        />
      ),
  });

  const getCurrentTimeString = (): string => new Date().getTime().toString();

  return (
    <>
      <CurrentWorkoutTimer
        seconds={seconds}
        setSeconds={setSeconds}
        isTimerStarted={isTimerStarted}
      />
      {workout !== undefined && <CurrentWorkoutSelectExercise />}
    </>
  );
};

const blankWorkout: WorkoutCreateInput = {
  startTime: '',
  endTime: '',
};

export default CurrentWorkoutScreen;
