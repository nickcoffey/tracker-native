import React from 'react'
import {Text, Icon} from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import {Exercise} from '../../../graphql/ExerciseGQL'
import {SelectorStyles, PickerStyles} from './ExerciseSelector'

type Props = {
  setSelectedExercise: React.Dispatch<React.SetStateAction<Exercise | undefined>>
  selectedExercise: Exercise | undefined
  styles: SelectorStyles
  pickerStyles: PickerStyles
  exercises: Exercise[] | undefined
}

const ExerciseSelect = ({selectedExercise, setSelectedExercise, styles, pickerStyles, exercises}: Props) => {
  const handleValueChange = (value: any) => {
    setSelectedExercise(value)
  }

  const icon = () => <Icon type='material' name='expand-more' size={40} />

  const items =
    exercises?.map((exercise) => ({
      label: exercise.name,
      value: exercise
    })) || []

  return (
    <>
      <Text style={styles.label}>Exercise</Text>
      <RNPickerSelect
        value={selectedExercise}
        onValueChange={handleValueChange}
        items={items}
        style={pickerStyles}
        placeholder={{label: 'Select an exercise', value: null}}
        Icon={icon}
      />
    </>
  )
}

export default ExerciseSelect
