import React from 'react'
import {StyleSheet} from 'react-native'
import {Button, ButtonProps} from 'react-native-elements'
import {useTheme} from '@react-navigation/native'

const StyledButton = (props: ButtonProps & {color?: 'primary' | 'default' | 'warning' | 'danger'}) => {
  const {type, color} = props

  const {colors} = useTheme()
  const styles = StyleSheet.create({
    primary: {
      color: colors.primary
    },
    warning: {
      color: (colors as any).warning // FIXME: can't custom type useTheme
    },
    danger: {
      color: (colors as any).danger // FIXME: can't custom type useTheme
    },
    default: {
      color: (colors as any).default // FIXME: can't custom type useTheme
    }
  })

  return <Button type={type || 'clear'} titleStyle={color ? styles[color] : styles.primary} {...props} />
}

export default StyledButton
