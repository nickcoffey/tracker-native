import React from 'react'
import {StyleSheet} from 'react-native'
import {ApolloQueryResult} from 'apollo-boost'

import PageLayout from '../../layouts/PageLayout'
import StyledButton from '../../components/StyledButton'
import StyledText from '../../components/StyledText'
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
            <StyledText h4 style={styles.header}>
              {workoutExercise.exercise.name}
            </StyledText>
            <StyledText style={styles.header}>{workoutExercise.exercise.desc}</StyledText>
            <StyledButton title='Add Set' onPress={handleWorkoutSetCreate} />
            <SetList sets={workoutExercise.workoutSets} refreshWorkoutExercise={refreshWorkoutExercise} />
          </>
        )}
      </>
    </PageLayout>
  )
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center'
  }
})

export default WorkoutExercisePage
