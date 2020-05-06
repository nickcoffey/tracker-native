import React, {useState} from 'react'
import {StyleSheet, Alert, View} from 'react-native'
import {Text} from 'react-native-elements'

import {getFormattedDate, getDuration} from '../../../utils/DateUtils'
import EditableListItem from '../../../components/EditableListItem'
import {Workout} from '../../../graphql/WorkoutGQL'

type Props = {
  workout: Workout
  topDivider: boolean
  openEditWorkout: (id: string) => void
  onWorkoutRemove: (id: string) => void
  //   onWorkoutUpdate: (updatedWorkout: WorkoutUpdateInput) => void
}

const WorkoutListItem = ({workout, openEditWorkout, onWorkoutRemove, topDivider}: Props) => {
  const [isEditing, setIsEditing] = useState(false)

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
    // onWorkoutUpdate({id: category.id, ...editableCategory})
    setIsEditing(false)
  }
  const handlePress = () => openEditWorkout(workout.id)
  //   const handleChange = (key: string, value: string) => setEditableWorkout({...editableWorkout, [key]: value})
  const title = (
    <View style={styles.title}>
      <Text style={styles.subtitle}>
        <Text style={styles.itemHeader}>Date: </Text>
        {getFormattedDate(workout.startTime)}
      </Text>
      <Text style={styles.subtitle}>
        <Text style={styles.itemHeader}>Duration: </Text>
        {duration}
      </Text>
    </View>
  )

  return (
    <EditableListItem
      title={title}
      titleEditMode={title}
      subtitleEditMode={<></>}
      topDivider={topDivider}
      handlePress={handlePress}
      handleUpdate={handleUpdate}
      createDeleteAlert={createDeleteAlert}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
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
