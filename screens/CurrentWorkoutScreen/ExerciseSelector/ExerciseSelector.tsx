import React, {useState} from 'react'
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
        setSelectedCategory={setSelectedCategory}
        setSelectedExercise={setSelectedExercise}
      />
      <ExerciseSelect
        exercises={selectedCategory?.exercises}
        selectedExercise={selectedExercise}
        setSelectedExercise={setSelectedExercise}
      />
      <Button title='Add Exercise' type='clear' onPress={onWorkoutExerciseSubmit} />
    </>
  )
}

export default ExerciseSelector
