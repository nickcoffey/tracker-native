import React from 'react'
import {RouteProp} from '@react-navigation/native'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'

import {useHeaderImage} from '../../components/HeaderImage'
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
      <PastWorkoutsStack.Screen
        name='PastWorkouts'
        component={PastWorkoutsScreen}
        options={{title: 'Past', ...useHeaderImage()}}
      />
      <PastWorkoutsStack.Screen
        name='EditWorkout'
        component={EditWorkoutScreen}
        options={{title: 'Edit', ...useHeaderImage()}}
      />
      <PastWorkoutsStack.Screen
        name='PastExercise'
        component={PastExerciseScreen}
        options={{...options, ...useHeaderImage()}}
      />
    </PastWorkoutsStack.Navigator>
  )
}

export default PastWorkoutsNavigator
