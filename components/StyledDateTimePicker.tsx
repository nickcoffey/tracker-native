import React from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import {Appearance} from 'react-native-appearance'

type Props = {
  isVisible: boolean
  date?: Date
  mode?: 'date' | 'time' | 'datetime'
  onConfirm: (date: Date) => void
  onCancel: (date: Date) => void
}

const StyledDateTimePicker = ({isVisible, date, mode, onConfirm, onCancel}: Props) => (
  <DateTimePickerModal
    isVisible={isVisible}
    date={date}
    mode={mode || 'datetime'}
    onConfirm={onConfirm}
    onCancel={onCancel}
    isDarkModeEnabled={Appearance.getColorScheme() === 'dark'}
  />
)

export default StyledDateTimePicker
