import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {ApolloQueryResult} from 'apollo-boost'

import ExerciseListItem from './ExerciseListItem'
import {
  Exercise,
  ExerciseData,
  REMOVE_EXERCISE,
  UPDATE_EXERCISE,
  ExerciseUpdateInput
} from '../../../../graphql/ExerciseGQL'
import {CategoryWithExercisesData} from '../../../../graphql/CategoryGQL'

type ExerciseListProps = {
  exercises: Exercise[]
  openEditExercise: (id: string, name: string) => void
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<CategoryWithExercisesData>>
}

const ExerciseList = ({exercises, openEditExercise, refetch}: ExerciseListProps) => {
  const [updateExercise] = useMutation<{returnedExercise: Exercise}, {updatedExercise: ExerciseUpdateInput}>(
    UPDATE_EXERCISE
  )

  const onExerciseUpdate = (updatedExercise: ExerciseUpdateInput) => {
    updateExercise({
      variables: {
        updatedExercise
      }
    })
      .then(() => refetch())
      .catch((err) => console.log(err))
  }

  const [removeExercise] = useMutation<{removedCategory: ExerciseData}, {id: string}>(REMOVE_EXERCISE)
  const onExerciseRemove = (id: string) => {
    removeExercise({variables: {id}})
      .then(() => refetch())
      .catch((err) => console.log(err))
  }

  return (
    <>
      {exercises.map((exercise, index) => (
        <ExerciseListItem
          exercise={exercise}
          index={index}
          key={index}
          onExerciseRemove={onExerciseRemove}
          onExerciseUpdate={onExerciseUpdate}
          openEditExercise={openEditExercise}
        />
      ))}
    </>
  )
}

export default ExerciseList
