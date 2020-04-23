import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {Button, Divider, Text} from 'react-native-elements'
import {useQuery, useMutation} from '@apollo/react-hooks'

import FullScreenModal from '../../../components/FullScreenModal'
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

  const [isVisible, setIsVisible] = useState(false)
  const handleToggle = () => setIsVisible(!isVisible)
  const handleClose = () => setIsVisible(false)

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
        <Divider style={styles.divider} />
        <ExerciseSelect
          exercises={selectedCategory?.exercises}
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
        />
        <Divider style={styles.divider} />
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
  },
  divider: {
    padding: 10,
    backgroundColor: 'white'
  }
})

export default ExerciseSelector
