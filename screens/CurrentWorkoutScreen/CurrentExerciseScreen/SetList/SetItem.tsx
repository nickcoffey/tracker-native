import React, {useState} from 'react'
import {View} from 'react-native'
import {ListItem, Text, Input, Button} from 'react-native-elements'

import {WorkoutSet, WorkoutSetUpdateInput} from '../../../../graphql/WorkoutSetGQL'

type Props = {
  set: WorkoutSet
  index: number
  onSetUpdate: (updatedWorkoutSet: WorkoutSetUpdateInput) => boolean
}

const SetItem = ({set, index, onSetUpdate}: Props) => {
  const [editableWorkoutSet, setEditableWorkoutSet] = useState({
    weight: set.weight || 0,
    repetitions: set.repetitions || 0
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = () => {
    if (onSetUpdate({id: set.id, ...editableWorkoutSet})) setIsEditing(false)
  }

  const handleChange = (key: string, value: string) =>
    setEditableWorkoutSet({...editableWorkoutSet, [key]: Number(value)})

  const handleSetPress = () => setIsEditing(true)

  const handleCancelPress = () => setIsEditing(false)

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
              <Button title='Delete' type='clear' titleStyle={{color: 'red'}} />
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
