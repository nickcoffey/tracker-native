import React from 'react'
import {Text, ListItem} from 'react-native-elements'
import {StyleSheet} from 'react-native'
import {useQuery} from '@apollo/react-hooks'

import PageLayout from '../../layouts/PageLayout'
import {getFormattedDate, getDuration} from '../../utils/DateUtils'
import StyledDivider from '../../components/StyledDivider'
import {ALL_WORKOUTS, AllWorkoutsData} from '../../graphql/WorkoutGQL'

const PastWorkoutsScreen = () => {
  const {data, loading, refetch} = useQuery<AllWorkoutsData>(ALL_WORKOUTS)

  return (
    <PageLayout loading={loading} refetch={refetch}>
      <StyledDivider />
      <>
        {data?.workouts.map((workout, index) => (
          <ListItem
            leftElement={
              <Text>
                <Text style={styles.itemHeader}>Date:</Text> {getFormattedDate(workout.startTime)}
              </Text>
            }
            rightElement={<Text>{getDuration(workout.endTime, workout.startTime)}</Text>}
            topDivider={index === 0}
            bottomDivider
            key={index}
          />
        ))}
      </>
    </PageLayout>
  )
}

const styles = StyleSheet.create({
  itemHeader: {
    fontWeight: 'bold'
  }
})

export default PastWorkoutsScreen
