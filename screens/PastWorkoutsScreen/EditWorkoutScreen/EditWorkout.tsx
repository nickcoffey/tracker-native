import React, {useState} from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {useTheme} from '@react-navigation/native'

import StyledText from '../../../components/StyledText'
import {getFormattedDateTime} from '../../../utils/DateUtils'
import StyledDateTimePicker from '../../../components/StyledDateTimePicker'
import {Workout} from '../../../graphql/WorkoutGQL'

type Props = {
  editableWorkout: Workout
  setEditableWorkout: React.Dispatch<React.SetStateAction<Workout>>
}

const EditWorkout = ({editableWorkout, setEditableWorkout}: Props) => {
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false)
  const showStartTimePicker = () => setStartTimePickerVisibility(true)
  const hideStartTimePicker = () => setStartTimePickerVisibility(false)
  const handleStartTimeConfirm = (startTime: Date) => {
    setEditableWorkout({...editableWorkout, startTime: startTime.getTime().toString()})
    hideStartTimePicker()
  }

  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false)
  const showEndTimePicker = () => setEndTimePickerVisibility(true)
  const hideEndTimePicker = () => setEndTimePickerVisibility(false)
  const handleEndTimeConfirm = (endTime: any) => {
    setEditableWorkout({...editableWorkout, endTime: endTime.getTime().toString()})
    hideEndTimePicker()
  }

  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    inputText: {
      fontSize: 18,
      color: theme.colors.primary
    }
  })
  return (
    <>
      <View style={styles.container}>
        <StyledText>Started:</StyledText>
        <TouchableOpacity onPress={showStartTimePicker}>
          <StyledText style={styles.inputText}>
            {editableWorkout.startTime ? getFormattedDateTime(editableWorkout.startTime) : 'Start Time'}
          </StyledText>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <StyledText>Ended:</StyledText>
        <TouchableOpacity onPress={showEndTimePicker}>
          <StyledText style={styles.inputText}>
            {editableWorkout.endTime ? getFormattedDateTime(editableWorkout.endTime) : 'In Progress'}
          </StyledText>
        </TouchableOpacity>
      </View>
      <StyledDateTimePicker
        isVisible={isStartTimePickerVisible}
        date={editableWorkout.startTime ? new Date(Number(editableWorkout.startTime)) : new Date()}
        onConfirm={handleStartTimeConfirm}
        onCancel={hideStartTimePicker}
      />
      <StyledDateTimePicker
        isVisible={isEndTimePickerVisible}
        date={editableWorkout.endTime ? new Date(Number(editableWorkout.endTime)) : new Date()}
        onConfirm={handleEndTimeConfirm}
        onCancel={hideEndTimePicker}
      />
    </>
  )
}

export default EditWorkout
