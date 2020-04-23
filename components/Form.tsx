import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import ThemeContext from '../contexts/ThemeContext'
import {Input, Button, Text, Divider} from 'react-native-elements'

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
  const theme = useContext(ThemeContext)

  const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 20,
      paddingVertical: 10
    },
    divider: {
      padding: 10,
      backgroundColor: theme.white
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
          <Divider style={styles.divider} />
        </View>
      ))}
      <Button title='Submit' type='clear' onPress={handleSubmit} />
    </>
  )
}

export default Form
