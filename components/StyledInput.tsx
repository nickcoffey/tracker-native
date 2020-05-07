import React from 'react'
import {StyleSheet} from 'react-native'
import {Input, InputProps} from 'react-native-elements'
import {useTheme} from '@react-navigation/native'

type Props = Pick<InputProps, 'label' | 'placeholder' | 'value' | 'onChangeText' | 'keyboardType'>

const StyledInput = ({label, placeholder, value, onChangeText, keyboardType}: Props) => {
  const {colors} = useTheme()

  const styles = StyleSheet.create({
    input: {
      color: colors.text
    }
  })

  return (
    <Input
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      inputStyle={styles.input}
    />
  )
}

export default StyledInput
