import React, {useState} from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import {ListItem, Text, Input, Button} from 'react-native-elements'

import {WorkoutSet, WorkoutSetUpdateInput} from '../../../../graphql/WorkoutSetGQL'

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

  const handleCancelPress = () => setIsEditing(false)

  const createDeleteAlert = () => {
    Alert.alert(
      'Delete Set?',
      'Are you sure you want to delete this set?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => onSetRemove(set.id), style: 'destructive'}
      ],
      {cancelable: false}
    )
  }

  const styles = StyleSheet.create({
    deleteBtn: {
      color: 'red'
    }
  })

  return (
    <ListItem
      title={
        isEditing ? (
          <Input
            label='Weight'
            placeholder='Weight'
            keyboardType='decimal-pad'
            value={editableWorkoutSet.weight.toString()}
            onChangeText={(text) => handleChange('weight', text)}
          />
        ) : (
          <>
            <Text>{`Weight: ${set.weight ? set.weight : 0}`}</Text>
            <Text>{`Repetitions: ${set.repetitions ? set.repetitions : 0}`}</Text>
          </>
        )
      }
      subtitle={
        isEditing ? (
          <>
            <Input
              label='Repetitions'
              placeholder='Repetitions'
              keyboardType='number-pad'
              value={editableWorkoutSet.repetitions.toString()}
              onChangeText={(text) => handleChange('repetitions', text)}
            />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button title='Delete' type='clear' onPress={createDeleteAlert} titleStyle={styles.deleteBtn} />
              <Button title='Update' type='clear' onPress={handleUpdate} />
              <Button title='Cancel' type='clear' onPress={handleCancelPress} />
            </View>
          </>
        ) : undefined
      }
      topDivider={index === 0}
      onLongPress={handleSetPress}
      bottomDivider
    />
  )
}

export default SetItem
