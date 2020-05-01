import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-elements'

import {RootNavigationProps} from '../../App'
import StyledButton from '../../components/StyledButton'

const HomeScreen = ({navigation}: RootNavigationProps) => {
  const handlePress = () => navigation.navigate('CurrentWorkoutNavigator')

  return (
    <View style={styles.container}>
      <Text h4>Welcome to Tracker</Text>
      <StyledButton title='Start A New Workout' onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreen
