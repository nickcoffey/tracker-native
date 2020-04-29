import React from 'react'
import {useMutation} from '@apollo/react-hooks'

import {
  WorkoutSet,
  WorkoutSetData,
  UPDATE_WORKOUT_SET,
  WorkoutSetUpdateInput,
  REMOVE_WORKOUT_SET
} from '../../../graphql/WorkoutSetGQL'
import SetItem from './SetItem'

type Props = {
  sets: WorkoutSet[]
  refreshWorkoutExercise: () => void
}

const CurrentExerciseSetList = ({sets, refreshWorkoutExercise}: Props) => {
  const [updateWorkoutSet] = useMutation<
    {returnedWorkoutSet: WorkoutSetData},
    {updatedWorkoutSet: WorkoutSetUpdateInput}
  >(UPDATE_WORKOUT_SET)

  const [removeWorkoutSet] = useMutation<{removedSet: WorkoutSetData}, {id: string}>(REMOVE_WORKOUT_SET)

  const onSetUpdate = (updatedWorkoutSet: WorkoutSetUpdateInput) => {
    updateWorkoutSet({
      variables: {
        updatedWorkoutSet
      }
    })
      .then(() => refreshWorkoutExercise())
      .catch((err) => console.log(err))
  }

  const onSetRemove = (id: string) => {
    removeWorkoutSet({variables: {id}})
      .then(() => refreshWorkoutExercise())
      .catch((err) => console.log(err))
  }

  return (
    <>
      {sets.map((set, index) => (
        <SetItem set={set} index={index} onSetUpdate={onSetUpdate} onSetRemove={onSetRemove} key={index} />
      ))}
    </>
  )
}

export default CurrentExerciseSetList
