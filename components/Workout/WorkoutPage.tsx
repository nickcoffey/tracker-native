import React, {ReactElement} from 'react'
import {ApolloQueryResult} from 'apollo-boost'

import PageLayout from '../../layouts/PageLayout'
import ExerciseSelector from './ExerciseSelector/ExerciseSelector'
import WorkoutExerciseList from './WorkoutExerciseList/WorkoutExerciseList'
import {WorkoutWithExercises} from '../../graphql/WorkoutGQL'
import {WorkoutExercise} from '../../graphql/WorkoutExerciseGQL'

type Props = {
  loading: boolean
  workout?: WorkoutWithExercises
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<any>>
  refreshWorkout: () => void
  handleExercisePress: ({id, name}: WorkoutExercise) => void
  children?: ReactElement | ReactElement[]
}

const WorkoutPage = ({loading, workout, refetch, refreshWorkout, handleExercisePress, children}: Props) => (
  <PageLayout loading={loading} refetch={workout?.id ? refetch : undefined}>
    <>{children}</>
    <>{workout && workout.id && <ExerciseSelector workoutId={workout.id} refreshWorkout={refreshWorkout} />}</>
    <WorkoutExerciseList
      exercises={workout?.workoutExercises}
      handleExercisePress={handleExercisePress}
      refreshWorkout={refreshWorkout}
    />
  </PageLayout>
)

export default WorkoutPage
