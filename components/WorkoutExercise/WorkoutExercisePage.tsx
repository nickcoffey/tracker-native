import React from 'react'
import {Button} from 'react-native-elements'
import {ApolloQueryResult} from 'apollo-boost'

import PageLayout from '../../layouts/PageLayout'
import SetList from '../../components/WorkoutExercise/SetList/SetList'
import {WorkoutExerciseWithSets} from '../../graphql/WorkoutExerciseGQL'

type Props = {
  loading: boolean
  workoutExercise?: WorkoutExerciseWithSets
  refetch?: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<any>>
  handleWorkoutSetCreate: () => void
  refreshWorkoutExercise: () => void
}

const WorkoutExercisePage = ({
  loading,
  workoutExercise,
  refetch,
  handleWorkoutSetCreate,
  refreshWorkoutExercise
}: Props) => {
  return (
    <PageLayout loading={loading} refetch={workoutExercise?.id ? refetch : undefined}>
      <>
        {workoutExercise?.workoutSets && (
          <>
            <Button title='Add Set' type='clear' onPress={handleWorkoutSetCreate} />
            <SetList sets={workoutExercise.workoutSets} refreshWorkoutExercise={refreshWorkoutExercise} />
          </>
        )}
      </>
    </PageLayout>
  )
}

export default WorkoutExercisePage
