import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {Text} from 'react-native-elements'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useQuery} from '@apollo/react-hooks'

import PageLayout from '../../../layouts/PageLayout'
import StyledDivider from '../../../components/StyledDivider'
import StyledButton from '../../../components/StyledButton'
import EditExercise from './EditExercise'
import {SettingsStackParamList} from '../SettingsNavigator'
import {EXERCISE, ExerciseData} from '../../../graphql/ExerciseGQL'

type ExerciseScreenRouteProp = RouteProp<SettingsStackParamList, 'Exercise'>

type ExerciseProps = {
  navigation: StackNavigationProp<SettingsStackParamList>
  route: ExerciseScreenRouteProp
}

const ExerciseScreen = ({navigation, route}: ExerciseProps) => {
  const exerciseId = route.params.id
  const {data, loading, refetch} = useQuery<ExerciseData>(EXERCISE, {
    variables: {id: exerciseId}
  })

  const [isFormVisible, setIsFormVisible] = useState(false)

  const handleEditPress = () => setIsFormVisible(true)
  navigation.setOptions({
    headerRight: () => (data?.exercise ? <StyledButton title='Edit' onPress={handleEditPress} /> : <></>),
    title: data?.exercise.name || ''
  })

  const styles = StyleSheet.create({
    header: {
      textAlign: 'center'
    }
  })

  return (
    <PageLayout loading={loading} refetch={refetch}>
      <>
        {data?.exercise && (
          <>
            <Text h4 h4Style={styles.header}>
              {data?.exercise.name}
            </Text>
            <Text style={styles.header}>{data?.exercise.desc}</Text>
          </>
        )}
      </>
      <StyledDivider />
      {data?.exercise ? (
        <EditExercise
          exercise={data.exercise}
          isFormVisible={isFormVisible}
          setIsFormVisible={setIsFormVisible}
          refetch={refetch}
        />
      ) : (
        <></>
      )}
    </PageLayout>
  )
}

export default ExerciseScreen
