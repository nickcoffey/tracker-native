import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {useTheme} from '@react-navigation/native'
import {useQuery, useMutation} from '@apollo/react-hooks'

import StyledButton from '../../../components/StyledButton'
import StyledText from '../../../components/StyledText'
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
          setSelectedExercise(undefined)
          if (res.data?.addWorkoutExercise.id) refreshWorkout()
        })
        .catch((err) => console.log(err))
    }
  }

  const [isVisible, setIsVisible] = useState(false)
  const handleToggle = () => setIsVisible(!isVisible)
  const handleClose = () => setIsVisible(false)

  const {colors} = useTheme()
  const Divider = <StyledDivider color={colors.border} />

  return (
    <>
      <StyledButton title='Add Exercise' onPress={handleToggle} />
      <FullScreenModal handleClose={handleClose} isVisible={isVisible}>
        <StyledText style={styles.title}>Add Exercise</StyledText>
        <CategorySelect
          categories={data?.categories || []}
          setSelectedCategory={setSelectedCategory}
          setSelectedExercise={setSelectedExercise}
        />
        {Divider}
        <ExerciseSelect
          exercises={selectedCategory?.exercises}
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
        />
        {Divider}
        <StyledButton title='Add' onPress={onWorkoutExerciseSubmit} />
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
