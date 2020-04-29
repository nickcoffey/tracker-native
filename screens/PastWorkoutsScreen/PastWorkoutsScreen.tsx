import React from 'react'
import {useQuery} from '@apollo/react-hooks'

import PageLayout from '../../layouts/PageLayout'
import WorkoutList from './WorkoutList/WorkoutList'
import StyledDivider from '../../components/StyledDivider'
import {ALL_WORKOUTS, AllWorkoutsData} from '../../graphql/WorkoutGQL'

const PastWorkoutsScreen = () => {
  const {data, loading, refetch} = useQuery<AllWorkoutsData>(ALL_WORKOUTS)

  return (
    <PageLayout loading={loading} refetch={refetch}>
      <StyledDivider />
      <WorkoutList workouts={data?.workouts} refetch={refetch} />
    </PageLayout>
  )
}

export default PastWorkoutsScreen
