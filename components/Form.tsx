import React, {ReactElement} from 'react'
import {StyleSheet, View} from 'react-native'
import {Input} from 'react-native-elements'

import StyledDivider from './StyledDivider'
import StyledButton from './StyledButton'
import StyledText from './StyledText'

export type InputType = {
  label: string
  placeholder: string
  key: string
  value: string
}

type FormProps = {
  inputs: InputType[]
  title: string
  handleChange: (key: string, value: string) => void
  handleSubmit: () => void
  children?: ReactElement | ReactElement[]
}

const Form = ({inputs, title, handleChange, handleSubmit, children}: FormProps) => {
  const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 20,
      paddingVertical: 10
    },
    inputContainer: {
      paddingHorizontal: 10
    },
    label: {
      paddingHorizontal: 10
    }
  })

  return (
    <>
      <StyledText style={styles.title}>{title}</StyledText>
      {inputs.map((input, index) => (
        <View style={styles.inputContainer} key={index}>
          <StyledText style={styles.label}>{input.label}</StyledText>
          <Input
            placeholder={input.placeholder}
            value={input.value}
            onChangeText={(text) => handleChange(input.key, text)}
          />
          <StyledDivider color='white' />
        </View>
      ))}
      {children}
      <StyledButton title='Submit' onPress={handleSubmit} />
    </>
  )
}

export default Form
