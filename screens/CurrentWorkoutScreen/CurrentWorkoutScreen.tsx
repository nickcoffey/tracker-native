import React, {useState} from 'react'
import {Button} from 'react-native-elements'
import {useMutation, useQuery} from '@apollo/react-hooks'

import {CurrentWorkoutNavigationProps} from './CurrentWorkoutNavigator'
import {
  ADD_WORKOUT,
  WorkoutWithExercises,
  WorkoutDataWithExercises,
  WORKOUT_WITH_EXERCISES,
  STOP_WORKOUT
} from '../../graphql/WorkoutGQL'
import {WorkoutExercise} from 'graphql/WorkoutExerciseGQL'
import WorkoutPage from '../../components/Workout/WorkoutPage'

const CurrentWorkoutScreen = ({navigation}: CurrentWorkoutNavigationProps) => {
  const [addWorkout] = useMutation<{addWorkout: WorkoutWithExercises}>(ADD_WORKOUT)

  const [stopWorkout] = useMutation<{updateWorkout: WorkoutWithExercises}, {id: string}>(STOP_WORKOUT)

  const [workout, setWorkout] = useState<WorkoutWithExercises | undefined>()
  const {refetch, loading} = useQuery<WorkoutDataWithExercises>(WORKOUT_WITH_EXERCISES, {skip: true})

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

  const [isTimerStarted, setIsTimerStarted] = useState(false)

  const handleNewPress = () => {
    addWorkout()
      .then((res) => {
        setWorkout(res.data?.addWorkout)
        setIsTimerStarted(true)
      })
      .catch((err) => console.log(err))
  }

  const handleStopPress = () => {
    if (workout) {
      const {id} = workout
      stopWorkout({
        variables: {id}
      })
        .then(() => {
          setIsTimerStarted(false)
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

  const handleExercisePress = ({id, name}: WorkoutExercise) => {
    navigation.navigate('CurrentExercise', {
      id,
      name
    })
  }

  return (
    <WorkoutPage
      loading={loading}
      refetch={refetch}
      refreshWorkout={refreshWorkout}
      handleExercisePress={handleExercisePress}
      isTimerStarted={isTimerStarted}
      workout={workout}
    />
  )
}

export default CurrentWorkoutScreen
