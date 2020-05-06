import React from 'react'
import {StyleSheet, View} from 'react-native'

import {RootNavigationProps} from '../../App'
import StyledButton from '../../components/StyledButton'
import StyledText from '../../components/StyledText'

const HomeScreen = ({navigation}: RootNavigationProps) => {
  const handlePress = () => navigation.navigate('CurrentWorkoutNavigator')

  return (
    <View style={styles.container}>
      <StyledText h4>Welcome to Tracker</StyledText>
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
