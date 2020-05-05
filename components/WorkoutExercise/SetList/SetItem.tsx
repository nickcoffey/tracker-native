import React, {useState} from 'react'
import {Alert} from 'react-native'
import {Text, Input} from 'react-native-elements'

import {WorkoutSet, WorkoutSetUpdateInput} from '../../../graphql/WorkoutSetGQL'
import EditableListItem from '../../EditableListItem'

type Props = {
  set: WorkoutSet
  index: number
  onSetUpdate: (updatedWorkoutSet: WorkoutSetUpdateInput) => void
  onSetRemove: (id: string) => void
}

const SetItem = ({set, index, onSetUpdate, onSetRemove}: Props) => {
  const [editableWorkoutSet, setEditableWorkoutSet] = useState({
    weight: set.weight || 0,
    repetitions: set.repetitions || 0
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = () => {
    onSetUpdate({id: set.id, ...editableWorkoutSet})
    setIsEditing(false)
  }

  const handleChange = (key: string, value: string) =>
    setEditableWorkoutSet({...editableWorkoutSet, [key]: Number(value)})

  const handleSetPress = () => setIsEditing(true)

  const createDeleteAlert = () => {
    Alert.alert(
      'Delete Set?',
      'Are you sure you want to delete this set?',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            onSetRemove(set.id)
            setIsEditing(false)
          },
          style: 'destructive'
        }
      ],
      {cancelable: false}
    )
  }

  return (
    <EditableListItem
      title={
        <>
          <Text>{`Weight: ${set.weight ? set.weight : 0}`}</Text>
          <Text>{`Repetitions: ${set.repetitions ? set.repetitions : 0}`}</Text>
        </>
      }
      titleEditMode={
        <Input
          label='Weight'
          placeholder='Weight'
          keyboardType='decimal-pad'
          value={editableWorkoutSet.weight.toString()}
          onChangeText={(text) => handleChange('weight', text)}
        />
      }
      subtitleEditMode={
        <Input
          label='Repetitions'
          placeholder='Repetitions'
          keyboardType='number-pad'
          value={editableWorkoutSet.repetitions.toString()}
          onChangeText={(text) => handleChange('repetitions', text)}
        />
      }
      topDivider={index === 0}
      createDeleteAlert={createDeleteAlert}
      handlePress={handleSetPress}
      handleUpdate={handleUpdate}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
    />
  )
}

export default SetItem
