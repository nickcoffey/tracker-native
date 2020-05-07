import React, {useState} from 'react'
import {StyleSheet, Alert, View} from 'react-native'

import {getFormattedDate, getDuration} from '../../../utils/DateUtils'
import EditableListItem from '../../../components/EditableListItem'
import StyledText from '../../../components/StyledText'
import {Workout, WorkoutUpdateInput} from '../../../graphql/WorkoutGQL'
import EditWorkout from '../EditWorkoutScreen/EditWorkout'

type Props = {
  workout: Workout
  topDivider: boolean
  openEditWorkout: (id: string) => void
  onWorkoutRemove: (id: string) => void
  onWorkoutUpdate: (updatedWorkout: WorkoutUpdateInput) => void
}

const WorkoutListItem = ({workout, openEditWorkout, onWorkoutRemove, onWorkoutUpdate, topDivider}: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editableWorkout, setEditableWorkout] = useState<Workout>(() => {
    const {id, startTime, endTime} = workout
    return {id, startTime, endTime}
  })

  const duration = workout.endTime ? getDuration(workout.endTime, workout.startTime) : 'In Progress'

  const createDeleteAlert = () => {
    Alert.alert(
      'Delete Workout?',
      `Are you sure you want to delete this workout?`,
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            onWorkoutRemove(workout.id)
            setIsEditing(false)
          },
          style: 'destructive'
        }
      ],
      {cancelable: false}
    )
  }

  const handleUpdate = () => {
    onWorkoutUpdate(editableWorkout)
    setIsEditing(false)
  }
  const handlePress = () => openEditWorkout(workout.id)

  return (
    <EditableListItem
      title={
        <View style={styles.title}>
          <StyledText style={styles.subtitle} h5>
            <StyledText style={styles.itemHeader} h5>Date: </StyledText>
            {getFormattedDate(workout.startTime)}
          </StyledText>
          <StyledText style={styles.subtitle} h5>
            <StyledText style={styles.itemHeader} h5>Duration: </StyledText>
            {duration}
          </StyledText>
        </View>
      }
      titleEditMode={<EditWorkout editableWorkout={editableWorkout} setEditableWorkout={setEditableWorkout} />}
      subtitleEditMode={<></>}
      topDivider={topDivider}
      handlePress={handlePress}
      handleUpdate={handleUpdate}
      createDeleteAlert={createDeleteAlert}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      chevron
    />
  )
}

const styles = StyleSheet.create({
  itemHeader: {
    fontWeight: 'bold'
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle: {
    flex: 1
  }
})

export default WorkoutListItem
