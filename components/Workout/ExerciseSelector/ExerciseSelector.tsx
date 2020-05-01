import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {Button, Text} from 'react-native-elements'
import {useQuery, useMutation} from '@apollo/react-hooks'

import FullScreenModal from '../../FullScreenModal'
import StyledDivider from '../../StyledDivider'
import CategorySelect from './CategorySelect'
import ExerciseSelect from './ExerciseSelect'
import {
  CategoriesWithExercisesData,
  ALL_CATEGORIES_WITH_EXERCISES,
  CategoryWithExercises
} from '../../../graphql/CategoryGQL'
import {Exercise} from 'graphql/ExerciseGQL'
import {ADD_WORKOUT_EXERCISE, CreateWorkoutExerciseInput, WorkoutExercise} from '../../../graphql/WorkoutExerciseGQL'

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
      addWorkoutExercise({
        variables: {newWorkoutExercise: {exerciseId: selectedExercise.id, workoutId}}
      })
        .then((res) => {
          handleClose()
          if (res.data?.addWorkoutExercise.id) refreshWorkout()
        })
        .catch((err) => console.log(err))
    }
  }

  const [isVisible, setIsVisible] = useState(false)
  const handleToggle = () => setIsVisible(!isVisible)
  const handleClose = () => setIsVisible(false)

  const WhiteDivider = <StyledDivider color='white' />

  return (
    <>
      <Button title='Add Exercise' type='clear' onPress={handleToggle} />
      <FullScreenModal handleClose={handleClose} isVisible={isVisible}>
        <Text style={styles.title}>Add Exercise</Text>
        <CategorySelect
          categories={data?.categories || []}
          setSelectedCategory={setSelectedCategory}
          setSelectedExercise={setSelectedExercise}
        />
        {WhiteDivider}
        {/* TODO: Fix select not clearing on category change */}
        <ExerciseSelect
          exercises={selectedCategory?.exercises}
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
        />
        {WhiteDivider}
        <Button title='Add' type='clear' onPress={onWorkoutExerciseSubmit} />
      </FullScreenModal>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 10
  }
})

export default ExerciseSelector
