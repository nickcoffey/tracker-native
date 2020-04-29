import React from 'react'
import {ApolloQueryResult} from 'apollo-boost'

import PageLayout from '../../layouts/PageLayout'
import CurrentWorkoutTimer from '../../screens/CurrentWorkoutScreen/CurrentWorkoutTimer'
import ExerciseSelector from './ExerciseSelector/ExerciseSelector'
import WorkoutExerciseList from './WorkoutExerciseList/WorkoutExerciseList'
import {WorkoutWithExercises} from '../../graphql/WorkoutGQL'
import {WorkoutExercise} from '../../graphql/WorkoutExerciseGQL'

type Props = {
  loading: boolean
  workout?: WorkoutWithExercises
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<any>>
  refreshWorkout: () => void
  isTimerStarted: boolean
  handleExercisePress: ({id, name}: WorkoutExercise) => void
}

const WorkoutPage = ({loading, workout, refetch, refreshWorkout, isTimerStarted, handleExercisePress}: Props) => (
  <PageLayout loading={loading} refetch={workout?.id ? refetch : undefined}>
    <CurrentWorkoutTimer isTimerStarted={isTimerStarted} />
    <>{workout && workout.id && <ExerciseSelector workoutId={workout.id} refreshWorkout={refreshWorkout} />}</>
    <WorkoutExerciseList
      exercises={workout?.workoutExercises}
      handleExercisePress={handleExercisePress}
      refreshWorkout={refreshWorkout}
    />
  </PageLayout>
)

export default WorkoutPage
