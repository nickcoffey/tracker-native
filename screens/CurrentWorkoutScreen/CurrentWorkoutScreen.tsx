import React, {useState} from 'react'
import {Button} from 'react-native-elements'
import {useMutation, useQuery} from '@apollo/react-hooks'

import PageLayout from '../../layouts/PageLayout'
import CurrentWorkoutTimer from './CurrentWorkoutTimer'
import ExerciseSelector from './ExerciseSelector/ExerciseSelector'
import {CurrentWorkoutNavigationProps} from './CurrentWorkoutNavigator'
import {
  ADD_WORKOUT,
  WorkoutCreateInput,
  WorkoutWithExercises,
  WorkoutDataWithExercises,
  WorkoutUpdateInput,
  UPDATE_WORKOUT,
  WORKOUT_WITH_EXERCISES
} from '../../graphql/WorkoutGQL'
import {WorkoutExercise} from 'graphql/WorkoutExerciseGQL'
import WorkoutExerciseList from './WorkoutExerciseList/WorkoutExerciseList'

const CurrentWorkoutScreen = ({navigation}: CurrentWorkoutNavigationProps) => {
  const [addWorkout] = useMutation<{addWorkout: WorkoutWithExercises}, {newWorkout: WorkoutCreateInput}>(ADD_WORKOUT)

  const [updateWorkout] = useMutation<{updateWorkout: WorkoutWithExercises}, {updatedWorkout: WorkoutUpdateInput}>(
    UPDATE_WORKOUT
  )

  const [workout, setWorkout] = useState<WorkoutWithExercises | undefined>()
  const {refetch, loading} = useQuery<WorkoutDataWithExercises>(WORKOUT_WITH_EXERCISES, {
    //variables: {id: workout?.id}, // TODO: left for opening screen from past workouts
    skip: true
  })

  const refreshWorkout = () => {
    if (workout?.id) {
      refetch({id: workout.id})
        .then((res) => {
          if (res.data.workout.id) {
            setWorkout(res.data.workout)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  const [seconds, setSeconds] = useState(0)
  const [isTimerStarted, setIsTimerStarted] = useState(false)

  const handleNewPress = () => {
    addWorkout({
      variables: {
        newWorkout: {
          ...blankWorkout,
          startTime: getCurrentTimeString()
        }
      }
    })
      .then((res) => {
        setWorkout(res.data?.addWorkout)
        setIsTimerStarted(true)
      })
      .catch((err) => console.log(err))
  }

  const handleStopPress = () => {
    if (workout) {
      const {id} = workout
      updateWorkout({
        variables: {
          updatedWorkout: {id, endTime: getCurrentTimeString()}
        }
      })
        .then(() => {
          setIsTimerStarted(false)
          setSeconds(0)
          setWorkout(undefined)
        })
        .catch((err) => console.log(err))
    }
  }

  navigation.setOptions({
    headerRight: () =>
      workout === undefined ? (
        <Button title='New' type='clear' onPress={handleNewPress} />
      ) : (
        <Button title='Stop' type='clear' onPress={handleStopPress} />
      )
  })

  const getCurrentTimeString = (): string => new Date().getTime().toString()

  const handleExercisePress = ({id, name}: WorkoutExercise) => {
    navigation.navigate('CurrentExercise', {
      id,
      name
    })
  }

  return (
    <PageLayout loading={loading} refetch={workout?.id ? refetch : undefined}>
      <CurrentWorkoutTimer seconds={seconds} setSeconds={setSeconds} isTimerStarted={isTimerStarted} />
      <>{workout && workout.id && <ExerciseSelector workoutId={workout.id} refreshWorkout={refreshWorkout} />}</>
      <WorkoutExerciseList
        exercises={workout?.workoutExercises}
        handleExercisePress={handleExercisePress}
        refreshWorkout={refreshWorkout}
      />
    </PageLayout>
  )
}

const blankWorkout: WorkoutCreateInput = {
  startTime: '',
  endTime: ''
}

export default CurrentWorkoutScreen
