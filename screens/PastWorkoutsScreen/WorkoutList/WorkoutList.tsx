import React from 'react'

import WorkoutListItem from './WorkoutListItem'
import {Workout, REMOVE_WORKOUT, AllWorkoutsData} from '../../../graphql/WorkoutGQL'
import {useMutation} from '@apollo/react-hooks'
import {ApolloQueryResult} from 'apollo-boost'

type Props = {
  workouts?: Workout[]
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<AllWorkoutsData>>
  openEditWorkout: (id: string) => void
}

const WorkoutList = ({workouts, refetch, openEditWorkout}: Props) => {
  const [removeWorkout] = useMutation<{removedWorkout: Workout}, {id: string}>(REMOVE_WORKOUT)

  const onWorkoutRemove = (id: string) => {
    removeWorkout({variables: {id}})
      .then(() => refetch())
      .catch((err) => console.log(err))
  }

  return (
    <>
      {workouts?.map((workout, index) => (
        <WorkoutListItem
          workout={workout}
          topDivider={index === 0}
          openEditWorkout={openEditWorkout}
          onWorkoutRemove={onWorkoutRemove}
          key={index}
        />
      ))}
    </>
  )
}

export default WorkoutList
