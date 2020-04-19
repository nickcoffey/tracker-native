import React from 'react'
import {useMutation} from '@apollo/react-hooks'

import {WorkoutSet, WorkoutSetData, UPDATE_WORKOUT_SET, WorkoutSetUpdateInput} from '../../../../graphql/WorkoutSetGQL'
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

  const onSetUpdate = (updatedWorkoutSet: WorkoutSetUpdateInput): boolean => {
    let success = false
    updateWorkoutSet({
      variables: {
        updatedWorkoutSet
      }
    })
      .then(() => {
        success = true
        refreshWorkoutExercise()
      })
      .catch((err) => console.log(err))
    return success
  }

  return (
    <>
      {sets.map((set, index) => (
        <SetItem set={set} index={index} onSetUpdate={onSetUpdate} key={index} />
      ))}
    </>
  )
}

export default CurrentExerciseSetList
