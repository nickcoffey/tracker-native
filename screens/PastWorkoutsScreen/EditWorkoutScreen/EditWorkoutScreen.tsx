import React from 'react'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useQuery} from '@apollo/react-hooks'

import {PastWorkoutsStackParamList} from '../PastWorkoutsNavigator'
import WorkoutPage from '../../../components/Workout/WorkoutPage'
import {WorkoutDataWithExercises, WORKOUT_WITH_EXERCISES} from '../../../graphql/WorkoutGQL'
import {WorkoutExercise} from '../../../graphql/WorkoutExerciseGQL'

type EditWorkoutScreenRouteProp = RouteProp<PastWorkoutsStackParamList, 'EditWorkout'>

type Props = {
  navigation: StackNavigationProp<PastWorkoutsStackParamList>
  route: EditWorkoutScreenRouteProp
}

const EditWorkoutScreen = ({navigation, route}: Props) => {
  const {data, refetch, loading} = useQuery<WorkoutDataWithExercises>(WORKOUT_WITH_EXERCISES, {
    variables: {id: route.params.id}
  })

  const refreshWorkout = () => {
    refetch().catch((err) => console.log(err))
  }

  const handleExercisePress = ({id, name}: WorkoutExercise) => {
    navigation.navigate('PastExercise', {
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
      workout={data?.workout}
    />
  )
}

export default EditWorkoutScreen
