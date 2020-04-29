import React from 'react'
import {RouteProp} from '@react-navigation/native'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'

import PastWorkoutsScreen from './PastWorkoutsScreen'
import EditWorkoutScreen from './EditWorkoutScreen/EditWorkoutScreen'
import PastExerciseScreen from './PastExerciseScreen/PastExerciseScreen'

export type PastWorkoutsStackParamList = {
  PastWorkouts: undefined
  EditWorkout: {id: string}
  PastExercise: {id: string; name: string}
}

export type PastWorkoutsNavigationProps = {
  navigation: StackNavigationProp<PastWorkoutsStackParamList>
}

const PastWorkoutsNavigator = () => {
  const PastWorkoutsStack = createStackNavigator<PastWorkoutsStackParamList>()

  const options = ({
    route
  }: {
    route: RouteProp<PastWorkoutsStackParamList, 'PastExercise'>
    navigation: any
  }): {
    title: any
  } => {
    return {title: route.params.name}
  }

  return (
    <PastWorkoutsStack.Navigator>
      <PastWorkoutsStack.Screen name='PastWorkouts' component={PastWorkoutsScreen} options={{title: 'Past'}} />
      <PastWorkoutsStack.Screen name='EditWorkout' component={EditWorkoutScreen} options={{title: 'Edit'}} />
      <PastWorkoutsStack.Screen name='PastExercise' component={PastExerciseScreen} options={options} />
    </PastWorkoutsStack.Navigator>
  )
}

export default PastWorkoutsNavigator
