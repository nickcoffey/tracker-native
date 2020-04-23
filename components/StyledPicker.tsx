import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-elements'
import RNPickerSelect, {Item} from 'react-native-picker-select'

type Props = {
  title: string
  placeholder?: {} | Item | undefined
  value?: any
  handleValueChange: (value: any) => void
  items: Item[]
}

const StyledPicker = ({title, placeholder, value, handleValueChange, items}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <RNPickerSelect
        value={value}
        onValueChange={handleValueChange}
        items={items}
        style={pickerStyles}
        placeholder={placeholder}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16
  },
  container: {
    paddingHorizontal: 15
  }
})

const basePickerStyles = StyleSheet.create({
  styles: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white'
  }
})

const pickerStyles = StyleSheet.create({
  inputIOS: {
    ...basePickerStyles.styles
  },
  inputAndroid: {
    ...basePickerStyles.styles
  }
})

export default StyledPicker
