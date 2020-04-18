import React from 'react'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'

import CurrentWorkoutScreen from './CurrentWorkoutScreen'
import CurrentExerciseScreen from './CurrentExerciseScreen/CurrentExerciseScreen'

export type CurrentWorkoutStackParamList = {
  CurrentWorkout: undefined
  CurrentExercise: {id: string; name: string}
}

export type CurrentWorkoutNavigationProps = {
  navigation: StackNavigationProp<CurrentWorkoutStackParamList>
}

const CurrentWorkoutNavigator = () => {
  const CurrentWorkoutStack = createStackNavigator<CurrentWorkoutStackParamList>()

  const options = ({
    route
  }: {
    route: RouteProp<CurrentWorkoutStackParamList, 'CurrentExercise'>
    navigation: any
  }): {
    title: any
  } => {
    return {title: route.params.name}
  }

  return (
    <CurrentWorkoutStack.Navigator>
      <CurrentWorkoutStack.Screen name='CurrentWorkout' component={CurrentWorkoutScreen} options={{title: 'Current'}} />
      <CurrentWorkoutStack.Screen name='CurrentExercise' component={CurrentExerciseScreen} options={options} />
    </CurrentWorkoutStack.Navigator>
  )
}

export default CurrentWorkoutNavigator
