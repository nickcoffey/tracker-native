import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
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
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ExerciseSelector = ({workoutId, refreshWorkout, setIsVisible}: Props) => {
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

  const handleClosePress = () => setIsVisible(false)

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
      <View style={styles.btnGroup}>
        <Button title='Add' type='clear' onPress={onWorkoutExerciseSubmit} />
        <Button title='Close' type='clear' onPress={handleClosePress} titleStyle={styles.closeBtn} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  btnGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  closeBtn: {
    color: 'gray'
  }
})

export default ExerciseSelector
