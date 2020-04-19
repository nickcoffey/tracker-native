import React from 'react'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {Button} from 'react-native-elements'
import {useQuery, useMutation} from '@apollo/react-hooks'

import PageLayout from '../../../layouts/PageLayout'
import {CurrentWorkoutStackParamList} from '../CurrentWorkoutNavigator'
import {WORKOUT_EXERCISE_WITH_SETS, WorkoutExerciseWithSetsData} from '../../../graphql/WorkoutExerciseGQL'
import {WorkoutSet, WorkoutSetCreateInput, ADD_WORKOUT_SET} from '../../../graphql/WorkoutSetGQL'
import SetList from './SetList/SetList'

type CurrentExerciseRouteProp = RouteProp<CurrentWorkoutStackParamList, 'CurrentExercise'>

type CurrentExerciseProps = {
  navigation: StackNavigationProp<CurrentWorkoutStackParamList>
  route: CurrentExerciseRouteProp
}

const CurrentExerciseScreen = ({route}: CurrentExerciseProps) => {
  const {data, loading, refetch} = useQuery<WorkoutExerciseWithSetsData>(WORKOUT_EXERCISE_WITH_SETS, {
    variables: {id: route.params.id}
  })

  const refreshWorkoutExercise = () => {
    if (data?.workoutExercise?.id) refetch().catch((err) => console.log(err))
  }

  const [addWorkoutSet] = useMutation<{addWorkoutSet: WorkoutSet}, {newWorkoutSet: WorkoutSetCreateInput}>(
    ADD_WORKOUT_SET
  )

  const handleWorkoutSetCreate = () => {
    if (data?.workoutExercise.id) {
      addWorkoutSet({variables: {newWorkoutSet: {workoutExerciseId: data?.workoutExercise.id}}})
        .then((res) => {
          if (res.data?.addWorkoutSet.id) refreshWorkoutExercise()
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <PageLayout loading={loading} refetch={data?.workoutExercise.id ? refetch : undefined}>
      <>
        {data?.workoutExercise?.workoutSets && (
          <>
            <Button title='Add Set' type='clear' onPress={handleWorkoutSetCreate} />
            <SetList sets={data.workoutExercise.workoutSets} refreshWorkoutExercise={refreshWorkoutExercise} />
          </>
        )}
      </>
    </PageLayout>
  )
}

export default CurrentExerciseScreen
