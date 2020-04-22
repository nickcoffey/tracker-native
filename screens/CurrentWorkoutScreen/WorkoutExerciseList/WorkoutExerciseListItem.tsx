import React, {useState} from 'react'
import {StyleSheet, Alert, View} from 'react-native'
import {ListItem, Input, Button} from 'react-native-elements'

import {WorkoutExercise, UpdateWorkoutExerciseInput} from 'graphql/WorkoutExerciseGQL'

type Props = {
  exercise: WorkoutExercise
  index: number
  handleExercisePress: ({id, name}: WorkoutExercise) => void
  onExerciseUpdate: (updatedExercise: UpdateWorkoutExerciseInput) => void
  onExerciseRemove: (id: string) => void
}

const WorkoutExerciseListItem = ({exercise, index, handleExercisePress, onExerciseUpdate, onExerciseRemove}: Props) => {
  const [editableExercise, setEditableExercise] = useState({
    name: exercise.name || '',
    desc: exercise.desc || ''
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (key: string, value: string) => setEditableExercise({...editableExercise, [key]: value})

  const createDeleteAlert = () => {
    Alert.alert(
      'Delete Exercise?',
      'Are you sure you want to delete this exercise?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => onExerciseRemove(exercise.id), style: 'destructive'}
      ],
      {cancelable: false}
    )
  }

  const handleUpdate = () => {
    onExerciseUpdate({id: exercise.id, ...editableExercise})
    setIsEditing(false)
  }

  const handleCancelPress = () => setIsEditing(false)
  const handlePress = () => handleExercisePress(exercise)
  const handleLongPress = () => setIsEditing(true)

  const styles = StyleSheet.create({
    deleteBtn: {
      color: 'red'
    },
    btnGroup: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  })

  return (
    <ListItem
      title={
        isEditing ? (
          <Input
            label='Name'
            placeholder='Name'
            value={editableExercise.name}
            onChangeText={(text) => handleChange('name', text)}
          />
        ) : (
          exercise.name
        )
      }
      subtitle={
        isEditing ? (
          <>
            <Input
              label='Descripton'
              placeholder='Description'
              value={editableExercise.desc}
              onChangeText={(text) => handleChange('desc', text)}
            />
            <View style={styles.btnGroup}>
              <Button title='Delete' type='clear' onPress={createDeleteAlert} titleStyle={styles.deleteBtn} />
              <Button title='Update' type='clear' onPress={handleUpdate} />
              <Button title='Cancel' type='clear' onPress={handleCancelPress} />
            </View>
          </>
        ) : (
          exercise.desc
        )
      }
      topDivider={index === 0}
      onPress={handlePress}
      onLongPress={handleLongPress}
      bottomDivider
      chevron
    />
  )
}

export default WorkoutExerciseListItem
