import React from 'react'
import {Text} from 'react-native-elements'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'

import {PastWorkoutsStackParamList} from '../PastWorkoutsNavigator'

type EditWorkoutScreenRouteProp = RouteProp<PastWorkoutsStackParamList, 'EditWorkout'>

type Props = {
  navigation: StackNavigationProp<PastWorkoutsStackParamList>
  route: EditWorkoutScreenRouteProp
}

const EditWorkoutScreen = ({route}: Props) => {
  return <Text h4>{route.params.id}</Text>
}

export default EditWorkoutScreen
