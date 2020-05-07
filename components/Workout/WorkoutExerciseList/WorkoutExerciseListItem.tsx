import React, {useState} from 'react'
import {Alert} from 'react-native'

import EditableListItem from '../../EditableListItem'
import StyledText from '../../../components/StyledText'
import {WorkoutExercise, UpdateWorkoutExerciseInput} from '../../../graphql/WorkoutExerciseGQL'

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
        {
          text: 'Yes',
          onPress: () => {
            onExerciseRemove(workoutExercise.id)
            setIsEditing(false)
          },
          style: 'destructive'
        }
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
        <StyledText>{workoutExercise.exercise.name}</StyledText>
        // <StyledInput
        //   label='Name'
        //   placeholder='Name'
        //   value={editableExercise.name}
        //   onChangeText={(text) => handleChange('name', text)}
        // />
      }
      subtitle={workoutExercise.exercise.desc}
      subtitleEditMode={
        <StyledText>{workoutExercise.exercise.desc}</StyledText>
        // <StyledInput
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
