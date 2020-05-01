import React, {useState} from 'react'
import {Alert} from 'react-native'
import {Input, Text} from 'react-native-elements'

import {WorkoutExercise, UpdateWorkoutExerciseInput} from '../../../graphql/WorkoutExerciseGQL'
import EditableListItem from '../../EditableListItem'

type Props = {
  workoutExercise: WorkoutExercise
  index: number
  handleExercisePress: ({id, exercise}: WorkoutExercise) => void
  onExerciseUpdate: (updatedExercise: UpdateWorkoutExerciseInput) => void
  onExerciseRemove: (id: string) => void
}

const WorkoutExerciseListItem = ({
  workoutExercise,
  index,
  handleExercisePress,
  onExerciseUpdate,
  onExerciseRemove
}: Props) => {
  // const [editableExercise, setEditableExercise] = useState({
  //   name: workoutExercise.name || '',
  //   desc: workoutExercise.desc || ''
  // })
  const [isEditing, setIsEditing] = useState(false)

  // const handleChange = (key: string, value: string) => setEditableExercise({...editableExercise, [key]: value})

  const createDeleteAlert = () => {
    Alert.alert(
      'Delete Exercise?',
      `Are you sure you want to delete ${workoutExercise.exercise.name}?`,
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => onExerciseRemove(workoutExercise.id), style: 'destructive'}
      ],
      {cancelable: false}
    )
  }

  const handleUpdate = () => {
    // onExerciseUpdate({id: exercise.id, ...editableExercise})
    setIsEditing(false)
  }
  const handlePress = () => handleExercisePress(workoutExercise)

  // TODO: re-add WorkoutExercise updating
  return (
    <EditableListItem
      title={workoutExercise.exercise.name}
      titleEditMode={
        <Text>{workoutExercise.exercise.name}</Text>
        // <Input
        //   label='Name'
        //   placeholder='Name'
        //   value={editableExercise.name}
        //   onChangeText={(text) => handleChange('name', text)}
        // />
      }
      subtitle={workoutExercise.exercise.desc}
      subtitleEditMode={
        <Text>{workoutExercise.exercise.desc}</Text>
        // <Input
        //   label='Descripton'
        //   placeholder='Description'
        //   value={editableExercise.desc}
        //   onChangeText={(text) => handleChange('desc', text)}
        // />
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
