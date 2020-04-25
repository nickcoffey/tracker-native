import React from 'react'
import {StyleSheet} from 'react-native'
import {Divider} from 'react-native-elements'
import {useTheme} from '@react-navigation/native'

const StyledDivider = () => {
  const {colors} = useTheme()
  const styles = StyleSheet.create({
    divider: {
      padding: 10,
      backgroundColor: colors.background
    }
  })

  return <Divider style={styles.divider} />
}

export default StyledDivider
