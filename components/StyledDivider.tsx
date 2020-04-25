import React from 'react'
import {StyleSheet} from 'react-native'
import {Divider} from 'react-native-elements'
import {useTheme} from '@react-navigation/native'

type Props = {
  color?: string
  size?: number
}

const StyledDivider = ({color, size}: Props) => {
  const {colors} = useTheme()
  const styles = StyleSheet.create({
    divider: {
      padding: size ? size : 10,
      backgroundColor: color ? color : colors.background
    }
  })

  return <Divider style={styles.divider} />
}

export default StyledDivider
