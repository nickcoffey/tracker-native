import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {useTheme} from '@react-navigation/native'

type Props = {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  style?: object
  children: any
}

const StyledText = ({h1, h2, h3, h4, h5, style, children}: Props) => {
  const {colors} = useTheme()

  const styles = StyleSheet.create({
    text: {
      color: colors.text,
      fontSize: h1 ? 40 : h2 ? 34 : h3 ? 28 : h4 ? 22 : h5 ? 16 : 12
    }
  })

  return <Text style={{...styles.text, ...style}}>{children}</Text>
}

export default StyledText
