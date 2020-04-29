import React from 'react'
import {useQuery} from '@apollo/react-hooks'

import PageLayout from '../../layouts/PageLayout'
import {PastWorkoutsNavigationProps} from './PastWorkoutsNavigator'
import WorkoutList from './WorkoutList/WorkoutList'
import StyledDivider from '../../components/StyledDivider'
import {ALL_WORKOUTS, AllWorkoutsData} from '../../graphql/WorkoutGQL'

const PastWorkoutsScreen = ({navigation}: PastWorkoutsNavigationProps) => {
  const {data, loading, refetch} = useQuery<AllWorkoutsData>(ALL_WORKOUTS)

  const openEditWorkout = (id: string) => {
    navigation.navigate('EditWorkout', {id})
  }

  return (
    <PageLayout loading={loading} refetch={refetch}>
      <StyledDivider />
      <WorkoutList workouts={data?.workouts} refetch={refetch} openEditWorkout={openEditWorkout} />
    </PageLayout>
  )
}

export default PastWorkoutsScreen
