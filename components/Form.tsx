import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Input, Button, Text} from 'react-native-elements'

import StyledDivider from './StyledDivider'

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
}

const Form = ({inputs, title, handleChange, handleSubmit}: FormProps) => {
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
      <Text style={styles.title}>{title}</Text>
      {inputs.map((input, index) => (
        <View style={styles.inputContainer} key={index}>
          <Text style={styles.label}>{input.label}</Text>
          <Input
            placeholder={input.placeholder}
            value={input.value}
            onChangeText={(text) => handleChange(input.key, text)}
          />
          <StyledDivider />
        </View>
      ))}
      <Button title='Submit' type='clear' onPress={handleSubmit} />
    </>
  )
}

export default Form
