import React from 'react'
import {StyleSheet, View} from 'react-native'
import RNPickerSelect, {Item} from 'react-native-picker-select'
import {useTheme} from '@react-navigation/native'

import StyledText from './StyledText'

type Props = {
  title: string
  placeholder?: {} | Item | undefined
  value?: any
  handleValueChange: (value: any) => void
  items: Item[]
}

const StyledPicker = ({title, placeholder, value, handleValueChange, items}: Props) => {
  const {colors} = useTheme()

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
      borderColor: colors.background,
      borderRadius: 4,
      backgroundColor: colors.border
    }
  })

  const pickerStyles = StyleSheet.create({
    inputIOS: {
      ...basePickerStyles.styles
    },
    modalViewMiddle: {
      backgroundColor: colors.border
    },
    modalViewBottom: {
      backgroundColor: colors.background
    },
    inputAndroid: {
      ...basePickerStyles.styles
    }
  })

  return (
    <View style={styles.container}>
      <StyledText style={styles.label}>{title}</StyledText>
      <RNPickerSelect
        value={value}
        onValueChange={handleValueChange}
        items={items.map((item) => ({...item, color: colors.text}))}
        style={pickerStyles}
        placeholder={{...placeholder, color: colors.text}}
      />
    </View>
  )
}

export default StyledPicker
