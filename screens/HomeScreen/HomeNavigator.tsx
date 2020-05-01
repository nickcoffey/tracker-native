import React from 'react'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'

import {useHeaderImage} from '../../components/HeaderImage'
import HomeScreen from './HomeScreen'

export type HomeStackParamList = {
  Home: undefined
}

export type HomeNavigationProps = {
  navigation: StackNavigationProp<HomeStackParamList>
}

const HomeNavigator = () => {
  const HomeStack = createStackNavigator<HomeStackParamList>()
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={HomeScreen} options={useHeaderImage()} />
    </HomeStack.Navigator>
  )
}

export default HomeNavigator
