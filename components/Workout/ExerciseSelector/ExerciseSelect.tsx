import React from 'react'

import StyledPicker from '../../StyledPicker'
import {Exercise} from '../../../graphql/ExerciseGQL'

type Props = {
  setSelectedExercise: React.Dispatch<React.SetStateAction<Exercise | undefined>>
  selectedExercise: Exercise | undefined
  exercises: Exercise[] | undefined
}

const ExerciseSelect = ({selectedExercise, setSelectedExercise, exercises}: Props) => {
  const handleValueChange = (value: any) => {
    setSelectedExercise(value)
  }

  const items =
    exercises?.map((exercise) => ({
      label: exercise.name,
      value: exercise
    })) || []

  return (
    <StyledPicker
      items={items}
      title='Exercise'
      value={selectedExercise}
      handleValueChange={handleValueChange}
      placeholder={{label: 'Select an exercise', value: null}}
    />
  )
}

export default ExerciseSelect
