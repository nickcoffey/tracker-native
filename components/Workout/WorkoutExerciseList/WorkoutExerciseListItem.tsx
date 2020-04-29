import React, {useState} from 'react'
import {Alert} from 'react-native'
import {Input} from 'react-native-elements'

import {WorkoutExercise, UpdateWorkoutExerciseInput} from '../../../graphql/WorkoutExerciseGQL'
import EditableListItem from '../../EditableListItem'

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
      `Are you sure you want to delete ${exercise.name}?`,
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
  const handlePress = () => handleExercisePress(exercise)

  return (
    <EditableListItem
      title={exercise.name}
      titleEditMode={
        <Input
          label='Name'
          placeholder='Name'
          value={editableExercise.name}
          onChangeText={(text) => handleChange('name', text)}
        />
      }
      subtitle={exercise.desc}
      subtitleEditMode={
        <Input
          label='Descripton'
          placeholder='Description'
          value={editableExercise.desc}
          onChangeText={(text) => handleChange('desc', text)}
        />
      }
      topDivider={index === 0}
      createDeleteAlert={createDeleteAlert}
      handlePress={handlePress}
      handleUpdate={handleUpdate}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
    />
  )
}

export default WorkoutExerciseListItem
