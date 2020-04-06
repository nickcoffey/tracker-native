import React, {useState} from 'react';
import {Button, ListItem} from 'react-native-elements';
import {useMutation, useQuery} from '@apollo/react-hooks';

import CurrentWorkoutTimer from './CurrentWorkoutTimer';
import CurrentWorkoutSelectExercise from './CurrentWorkoutSelectExercise';
import {CurrentWorkoutNavigationProps} from './CurrentWorkoutNavigator';
import {
  ADD_WORKOUT,
  WorkoutCreateInput,
  WorkoutWithExercises,
  WorkoutDataWithExercises,
  WorkoutUpdateInput,
  UPDATE_WORKOUT,
  WORKOUT_WITH_EXERCISES,
} from '../../graphql/WorkoutGQL';

const CurrentWorkoutScreen = ({navigation}: CurrentWorkoutNavigationProps) => {
  const [addWorkout] = useMutation<
    {addWorkout: WorkoutWithExercises},
    {newWorkout: WorkoutCreateInput}
  >(ADD_WORKOUT);

  const [updateWorkout] = useMutation<
    {updateWorkout: WorkoutWithExercises},
    {updatedWorkout: WorkoutUpdateInput}
  >(UPDATE_WORKOUT);

  const [workout, setWorkout] = useState<WorkoutWithExercises | undefined>();
  const {refetch} = useQuery<WorkoutDataWithExercises>(WORKOUT_WITH_EXERCISES, {
    variables: {id: workout?.id},
    skip: true,
  });

  const refreshWorkout = () => {
    if (workout?.id) {
      refetch().then((res) => {
        if (res.data.workout.id) {
          setWorkout(res.data.workout);
        }
      });
    }
  };

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
            }).then((res) => {
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
      {workout && workout.id && (
        <CurrentWorkoutSelectExercise
          workoutId={workout.id}
          refreshWorkout={refreshWorkout}
        />
      )}
      {workout?.workoutExercises?.map((exercise, index) => (
        <ListItem
          key={index}
          title={exercise.name}
          subtitle={exercise.desc}
          chevron
          topDivider={index === 0}
          bottomDivider
          // onPress={() => openEditExercise(exercise.id, exercise.name)}
          // onLongPress={() => handleDeletePress(exercise.id)}
        />
      ))}
    </>
  );
};

const blankWorkout: WorkoutCreateInput = {
  startTime: '',
  endTime: '',
};

export default CurrentWorkoutScreen;
