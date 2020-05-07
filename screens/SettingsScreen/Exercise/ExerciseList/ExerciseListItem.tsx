import React, {useState} from 'react'
import {Alert} from 'react-native'

import StyledInput from '../../../../components/StyledInput'
import EditableListItem from '../../../../components/EditableListItem'
import {Exercise, ExerciseUpdateInput} from '../../../../graphql/ExerciseGQL'

type Props = {
  exercise: Exercise
  index: number
  openEditExercise: (id: string, name: string) => void
  onExerciseRemove: (id: string) => void
  onExerciseUpdate: (updatedExercise: ExerciseUpdateInput) => void
}

const ExerciseListItem = ({exercise, index, openEditExercise, onExerciseRemove, onExerciseUpdate}: Props) => {
  const [editableExercise, setEditableExercise] = useState({
    name: exercise.name || '',
    desc: exercise.desc || ''
  })
  const [isEditing, setIsEditing] = useState(false)

  const createDeleteAlert = () => {
    Alert.alert(
      'Delete Exercise?',
      `Are you sure you want to delete ${exercise.name}?`,
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            onExerciseRemove(exercise.id)
            setIsEditing(false)
          },
          style: 'destructive'
        }
      ],
      {cancelable: false}
    )
  }

  const handleUpdate = () => {
    onExerciseUpdate({id: exercise.id, ...editableExercise})
    setIsEditing(false)
  }
  const handlePress = () => openEditExercise(exercise.id, exercise.name)
  const handleChange = (key: string, value: string) => setEditableExercise({...editableExercise, [key]: value})

  return (
    <EditableListItem
      title={exercise.name}
      titleEditMode={
        <StyledInput
          label='Name'
          placeholder='Name'
          value={editableExercise.name}
          onChangeText={(text) => handleChange('name', text)}
        />
      }
      subtitle={exercise.desc}
      subtitleEditMode={
        <StyledInput
          label='Descripton'
          placeholder='Description'
          value={editableExercise.desc}
          onChangeText={(text) => handleChange('desc', text)}
        />
      }
      topDivider={index === 0}
      handlePress={handlePress}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      createDeleteAlert={createDeleteAlert}
      handleUpdate={handleUpdate}
    />
  )
}

export default ExerciseListItem
