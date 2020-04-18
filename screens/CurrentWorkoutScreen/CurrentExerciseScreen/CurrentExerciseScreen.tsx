import React from 'react'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {Text} from 'react-native-elements'

import PageLayout from '../../../layouts/PageLayout'
import {CurrentWorkoutStackParamList} from '../CurrentWorkoutNavigator'

type CurrentExerciseRouteProp = RouteProp<CurrentWorkoutStackParamList, 'CurrentExercise'>

type CurrentExerciseProps = {
  navigation: StackNavigationProp<CurrentWorkoutStackParamList>
  route: CurrentExerciseRouteProp
}

const CurrentExerciseScreen = ({route}: CurrentExerciseProps) => {
  return <Text h4>{route.params.id}</Text>
}

export default CurrentExerciseScreen
