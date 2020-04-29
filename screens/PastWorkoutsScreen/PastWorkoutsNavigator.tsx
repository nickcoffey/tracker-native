import React from 'react'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import PastWorkoutsScreen from './PastWorkoutsScreen'
import EditWorkoutScreen from './EditWorkoutScreen/EditWorkoutScreen'

export type PastWorkoutsStackParamList = {
  PastWorkouts: undefined
  EditWorkout: {id: string}
}

export type PastWorkoutsNavigationProps = {
  navigation: StackNavigationProp<PastWorkoutsStackParamList>
}

const PastWorkoutsNavigator = () => {
  const PastWorkoutsStack = createStackNavigator<PastWorkoutsStackParamList>()
  return (
    <PastWorkoutsStack.Navigator>
      <PastWorkoutsStack.Screen name='PastWorkouts' component={PastWorkoutsScreen} options={{title: 'Past'}} />
      <PastWorkoutsStack.Screen name='EditWorkout' component={EditWorkoutScreen} options={{title: 'Edit Workout'}} />
    </PastWorkoutsStack.Navigator>
  )
}

export default PastWorkoutsNavigator
