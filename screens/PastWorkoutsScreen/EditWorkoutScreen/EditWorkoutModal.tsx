import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Text} from 'react-native-elements'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {ApolloQueryResult} from 'apollo-boost'
import {useMutation} from '@apollo/react-hooks'

import FullScreenModal from '../../../components/FullScreenModal'
import Form from '../../../components/Form'
import {getFormattedDateTime} from '../../../utils/DateUtils'
import {Workout, UPDATE_WORKOUT, WorkoutUpdateInput, WorkoutDataWithExercises} from '../../../graphql/WorkoutGQL'

type Props = {
  workout: Workout
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<WorkoutDataWithExercises>>
}

const EditWorkoutModal = ({workout, isVisible, setIsVisible, refetch}: Props) => {
  const [editableWorkout, setEditableWorkout] = useState<Workout>(() => {
    const {id, startTime, endTime} = workout
    return {id, startTime, endTime}
  })

  const [updateWorkout] = useMutation<{returnedWorkout: Workout}, {updatedWorkout: WorkoutUpdateInput}>(
    UPDATE_WORKOUT,
    {
      variables: {
        updatedWorkout: editableWorkout
      }
    }
  )

  const handleClose = () => setIsVisible(false)
  const handleSubmit = () => {
    updateWorkout()
      .then(() => refetch())
      .catch((err) => console.log(err))
    setIsVisible(false)
  }

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

  return (
    <FullScreenModal isVisible={isVisible} handleClose={handleClose}>
      <Form title='Update Workout' handleChange={() => {}} inputs={[]} handleSubmit={handleSubmit}>
        <View style={styles.container}>
          <Text style={{...styles.boldText, ...styles.text}}>Started:</Text>
          <TouchableOpacity onPress={showStartTimePicker}>
            <Text style={styles.text}>
              {editableWorkout.startTime ? getFormattedDateTime(editableWorkout.startTime) : 'Start Time'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={{...styles.boldText, ...styles.text}}>Ended:</Text>
          <TouchableOpacity onPress={showEndTimePicker}>
            <Text style={styles.text}>
              {editableWorkout.endTime ? getFormattedDateTime(editableWorkout.endTime) : 'In Progress'}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          date={editableWorkout.startTime ? new Date(Number(editableWorkout.startTime)) : new Date()}
          mode='datetime'
          onConfirm={handleStartTimeConfirm}
          onCancel={hideStartTimePicker}
        />
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          date={editableWorkout.endTime ? new Date(Number(editableWorkout.endTime)) : new Date()}
          mode='datetime'
          onConfirm={handleEndTimeConfirm}
          onCancel={hideEndTimePicker}
        />
      </Form>
    </FullScreenModal>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text: {
    fontSize: 18
  },
  boldText: {
    fontWeight: 'bold'
  }
})

export default EditWorkoutModal
