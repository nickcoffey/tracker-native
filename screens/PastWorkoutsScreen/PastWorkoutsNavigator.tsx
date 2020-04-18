import React from 'react'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import PastWorkoutsScreen from './PastWorkoutsScreen'

export type PastWorkoutsStackParamList = {
  PastWorkouts: undefined
}

export type PastWorkoutsNavigationProps = {
  navigation: StackNavigationProp<PastWorkoutsStackParamList>
}

const PastWorkoutsNavigator = () => {
  const PastWorkoutsStack = createStackNavigator<PastWorkoutsStackParamList>()
  return (
    <PastWorkoutsStack.Navigator>
      <PastWorkoutsStack.Screen name='PastWorkouts' component={PastWorkoutsScreen} options={{title: 'Past'}} />
    </PastWorkoutsStack.Navigator>
  )
}

export default PastWorkoutsNavigator
