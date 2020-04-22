import React from 'react'
import {StyleSheet} from 'react-native'
import {Icon, Text} from 'react-native-elements'
import RNPickerSelect, {Item} from 'react-native-picker-select'

type Props = {
  title: string
  placeholder?: {} | Item | undefined
  value?: any
  handleValueChange: (value: any) => void
  items: Item[]
}

const StyledPicker = ({title, placeholder, value, handleValueChange, items}: Props) => {
  const icon = () => <Icon type='material' name='expand-more' size={40} />
  return (
    <>
      <Text style={styles.label}>{title}</Text>
      <RNPickerSelect
        value={value}
        onValueChange={handleValueChange}
        items={items}
        style={pickerStyles}
        placeholder={placeholder}
        Icon={icon}
      />
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16
  }
})

const basePickerStyles = StyleSheet.create({
  styles: {
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingRight: 30 // to ensure the text is never behind the icon
  }
})

const pickerStyles = StyleSheet.create({
  inputIOS: {
    ...basePickerStyles.styles,
    paddingVertical: 10,
    borderWidth: 1
  },
  inputAndroid: {
    ...basePickerStyles.styles,
    paddingVertical: 8,
    borderWidth: 0.5
  }
})

export default StyledPicker
