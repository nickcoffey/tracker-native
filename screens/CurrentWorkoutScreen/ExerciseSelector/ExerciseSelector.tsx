import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {useQuery, useMutation} from '@apollo/react-hooks'
import {Button} from 'react-native-elements'

import {
  CategoriesWithExercisesData,
  ALL_CATEGORIES_WITH_EXERCISES,
  CategoryWithExercises
} from '../../../graphql/CategoryGQL'
import {Exercise} from 'graphql/ExerciseGQL'
import {ADD_WORKOUT_EXERCISE, CreateWorkoutExerciseInput, WorkoutExercise} from '../../../graphql/WorkoutExerciseGQL'
import CategorySelect from './CategorySelect'
import ExerciseSelect from './ExerciseSelect'

type Props = {
  workoutId: string
  refreshWorkout: () => void
}

const ExerciseSelector = ({workoutId, refreshWorkout}: Props) => {
  const {data} = useQuery<CategoriesWithExercisesData>(ALL_CATEGORIES_WITH_EXERCISES)
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithExercises>()
  const [selectedExercise, setSelectedExercise] = useState<Exercise>()

  const [addWorkoutExercise] = useMutation<
    {addWorkoutExercise: WorkoutExercise},
    {newWorkoutExercise: CreateWorkoutExerciseInput}
  >(ADD_WORKOUT_EXERCISE)

  const onWorkoutExerciseSubmit = () => {
    if (selectedExercise) {
      const {name, desc} = selectedExercise
      addWorkoutExercise({
        variables: {newWorkoutExercise: {name, desc, workoutId}}
      })
        .then((res) => {
          if (res.data?.addWorkoutExercise.id) refreshWorkout()
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      <CategorySelect
        categories={data?.categories || []}
        pickerStyles={pickerStyles}
        styles={styles}
        setSelectedCategory={setSelectedCategory}
        setSelectedExercise={setSelectedExercise}
      />
      <ExerciseSelect
        exercises={selectedCategory?.exercises}
        pickerStyles={pickerStyles}
        styles={styles}
        selectedExercise={selectedExercise}
        setSelectedExercise={setSelectedExercise}
      />
      <Button title='Add Exercise' type='clear' onPress={onWorkoutExerciseSubmit} />
    </>
  )
}

const baseStyles = StyleSheet.create({
  styles: {
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingRight: 30 // to ensure the text is never behind the icon
  }
})

const pickerStyles = StyleSheet.create({
  inputIOS: {
    ...baseStyles.styles,
    paddingVertical: 10,
    borderWidth: 1
  },
  inputAndroid: {
    ...baseStyles.styles,
    paddingVertical: 8,
    borderWidth: 0.5
  }
})

export type PickerStyles = typeof pickerStyles

const styles = StyleSheet.create({
  label: {
    fontSize: 16
  }
})

export type SelectorStyles = typeof styles

export default ExerciseSelector
