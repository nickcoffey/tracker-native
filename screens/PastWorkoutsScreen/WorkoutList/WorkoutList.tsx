import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {ApolloQueryResult} from 'apollo-boost'

import WorkoutListItem from './WorkoutListItem'
import {Workout, REMOVE_WORKOUT, AllWorkoutsData, WorkoutUpdateInput, UPDATE_WORKOUT} from '../../../graphql/WorkoutGQL'

type Props = {
  workouts?: Workout[]
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<AllWorkoutsData>>
  openEditWorkout: (id: string) => void
}

const WorkoutList = ({workouts, refetch, openEditWorkout}: Props) => {
  const [removeWorkout] = useMutation<{removedWorkout: Workout}, {id: string}>(REMOVE_WORKOUT)
  const [updateWorkout] = useMutation<{returnedWorkout: Workout}, {updatedWorkout: WorkoutUpdateInput}>(UPDATE_WORKOUT)

  const onWorkoutRemove = (id: string) => {
    removeWorkout({variables: {id}})
      .then(() => refetch())
      .catch((err) => console.log(err))
  }

  const onWorkoutUpdate = (workout: WorkoutUpdateInput) => {
    updateWorkout({variables: {updatedWorkout: workout}})
  }

  return (
    <>
      {workouts?.map((workout, index) => (
        <WorkoutListItem
          workout={workout}
          topDivider={index === 0}
          openEditWorkout={openEditWorkout}
          onWorkoutRemove={onWorkoutRemove}
          onWorkoutUpdate={onWorkoutUpdate}
          key={index}
        />
      ))}
    </>
  )
}

export default WorkoutList
