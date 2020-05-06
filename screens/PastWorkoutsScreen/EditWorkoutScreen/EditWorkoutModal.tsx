import React, {useState} from 'react'
import {ApolloQueryResult} from 'apollo-boost'
import {useMutation} from '@apollo/react-hooks'

import FullScreenModal from '../../../components/FullScreenModal'
import Form from '../../../components/Form'
import {Workout, UPDATE_WORKOUT, WorkoutUpdateInput, WorkoutDataWithExercises} from '../../../graphql/WorkoutGQL'
import EditWorkout from './EditWorkout'

type Props = {
  workout: Workout
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<WorkoutDataWithExercises>>
}

const EditWorkoutModal = ({workout, isVisible, setIsVisible, refetch}: Props) => {
  const [editableWorkout, setEditableWorkout] = useState<Workout>(() => {
    const {id, startTime, endTime} = workout
    return {id, startTime, endTime}
  })

  const [updateWorkout] = useMutation<{returnedWorkout: Workout}, {updatedWorkout: WorkoutUpdateInput}>(
    UPDATE_WORKOUT,
    {
      variables: {
        updatedWorkout: editableWorkout
      }
    }
  )

  const handleClose = () => setIsVisible(false)
  const handleSubmit = () => {
    updateWorkout()
      .then(() => refetch())
      .catch((err) => console.log(err))
    setIsVisible(false)
  }

  return (
    <FullScreenModal isVisible={isVisible} handleClose={handleClose}>
      <Form title='Update Workout' handleChange={() => {}} inputs={[]} handleSubmit={handleSubmit}>
        <EditWorkout editableWorkout={editableWorkout} setEditableWorkout={setEditableWorkout} />
      </Form>
    </FullScreenModal>
  )
}

export default EditWorkoutModal
