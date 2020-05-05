import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Icon} from 'react-native-elements'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useQuery} from '@apollo/react-hooks'

import {PastWorkoutsStackParamList} from '../PastWorkoutsNavigator'
import WorkoutPage from '../../../components/Workout/WorkoutPage'
import StyledDivider from '../../../components/StyledDivider'
import {getFormattedTime, getFormattedDate} from '../../../utils/DateUtils'
import {WorkoutDataWithExercises, WORKOUT_WITH_EXERCISES} from '../../../graphql/WorkoutGQL'
import {WorkoutExercise} from '../../../graphql/WorkoutExerciseGQL'

type EditWorkoutScreenRouteProp = RouteProp<PastWorkoutsStackParamList, 'EditWorkout'>

type Props = {
  navigation: StackNavigationProp<PastWorkoutsStackParamList>
  route: EditWorkoutScreenRouteProp
}

const EditWorkoutScreen = ({navigation, route}: Props) => {
  const {data, refetch, loading} = useQuery<WorkoutDataWithExercises>(WORKOUT_WITH_EXERCISES, {
    variables: {id: route.params.id}
  })

  const refreshWorkout = () => {
    refetch().catch((err) => console.log(err))
  }

  const handleExercisePress = ({id, exercise}: WorkoutExercise) => {
    navigation.navigate('PastExercise', {
      id,
      name: exercise.name
    })
  }

  let formattedStartDate: string | undefined,
    formattedStartTime: string | undefined,
    formattedEndDate: string | undefined,
    formattedEndTime: string | undefined

  if (data?.workout.startTime) {
    const startTime = data.workout.startTime
    formattedStartDate = getFormattedDate(startTime)
    formattedStartTime = getFormattedTime(startTime)
  }
  if (data?.workout.endTime) {
    const endTime = data.workout.endTime
    formattedEndDate = getFormattedDate(endTime)
    formattedEndTime = getFormattedTime(endTime)
  }
  const doDisplayEndDate =
    Boolean(formattedStartDate) && Boolean(formattedEndDate) && formattedStartDate !== formattedEndDate
  console.log(doDisplayEndDate)

  const Arrow = <Icon type='material' name='trending-flat' />

  return (
    <WorkoutPage
      loading={loading}
      refetch={refetch}
      refreshWorkout={refreshWorkout}
      handleExercisePress={handleExercisePress}
      workout={data?.workout}>
      <StyledDivider />
      <View style={styles.header}>
        <Text style={{...styles.headerText, ...styles.dateHeader}}>{formattedStartDate}</Text>
        {doDisplayEndDate && <Text style={{...styles.headerText, ...styles.dateHeader}}>{formattedEndDate}</Text>}
      </View>
      {doDisplayEndDate ? Arrow : <StyledDivider size={5} />}
      <View style={styles.header}>
        <Text style={styles.headerText}>{formattedStartTime}</Text>
        {!doDisplayEndDate && Arrow}
        <Text style={styles.headerText}>{formattedEndTime || 'Not finished'}</Text>
      </View>
    </WorkoutPage>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-around'
  },
  headerText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18
  },
  dateHeader: {
    textDecorationLine: 'underline'
  }
})

export default EditWorkoutScreen
