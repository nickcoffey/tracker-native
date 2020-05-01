import React from 'react'
import {useMutation} from '@apollo/react-hooks'

import WorkoutExerciseListItem from './WorkoutExerciseListItem'
import {
  WorkoutExercise,
  UPDATE_WORKOUT_EXERCISE,
  UpdateWorkoutExerciseInput,
  REMOVE_WORKOUT_EXERCISE
} from '../../../graphql/WorkoutExerciseGQL'

type Props = {
  exercises?: WorkoutExercise[]
  handleExercisePress: ({id, exercise}: WorkoutExercise) => void
  refreshWorkout: () => void
}

const WorkoutExerciseList = ({exercises, handleExercisePress, refreshWorkout}: Props) => {
  const [updateWorkoutExercise] = useMutation<
    {returnedWorkoutExercise: WorkoutExercise},
    {updatedWorkoutExercise: UpdateWorkoutExerciseInput}
  >(UPDATE_WORKOUT_EXERCISE)

  const [removeWorkoutExercise] = useMutation<{removedExercise: WorkoutExercise}, {id: string}>(REMOVE_WORKOUT_EXERCISE)

  const onExerciseUpdate = (updatedWorkoutExercise: UpdateWorkoutExerciseInput) => {
    updateWorkoutExercise({
      variables: {
        updatedWorkoutExercise
      }
    })
      .then(() => refreshWorkout())
      .catch((err) => console.log(err))
  }

  const onExerciseRemove = (id: string) => {
    removeWorkoutExercise({variables: {id}})
      .then(() => refreshWorkout())
      .catch((err) => console.log(err))
  }

  return (
    <>
      {exercises?.map((exercise, index) => (
        <WorkoutExerciseListItem
          workoutExercise={exercise}
          handleExercisePress={handleExercisePress}
          index={index}
          onExerciseRemove={onExerciseRemove}
          onExerciseUpdate={onExerciseUpdate}
          key={index}
        />
      ))}
    </>
  )
}

export default WorkoutExerciseList
