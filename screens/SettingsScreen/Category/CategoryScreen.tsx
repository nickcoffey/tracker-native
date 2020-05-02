import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-elements'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useQuery} from '@apollo/react-hooks'

import PageLayout from '../../../layouts/PageLayout'
import StyledDivider from '../../../components/StyledDivider'
import StyledButton from '../../../components/StyledButton'
import {SettingsStackParamList} from '../SettingsNavigator'
import ExerciseList from '../Exercise/ExerciseList/ExerciseList'
import EditCategory from './EditCategory'
import NewExercise from '../Exercise/NewExercise'
import {CATEGORY_WITH_EXERCISES, CategoryWithExercisesData} from '../../../graphql/CategoryGQL'

type CategoryScreenRouteProp = RouteProp<SettingsStackParamList, 'Category'>

type CategoryScreenProps = {
  navigation: StackNavigationProp<SettingsStackParamList>
  route: CategoryScreenRouteProp
}

const CategoryScreen = ({navigation, route}: CategoryScreenProps) => {
  const categoryId = route.params.id
  const {data, loading, refetch} = useQuery<CategoryWithExercisesData>(CATEGORY_WITH_EXERCISES, {
    variables: {id: categoryId}
  })

  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [isExerciseFormVisible, setIsExerciseFormVisible] = useState(false)

  const handleEditPress = () => setIsEditFormVisible(true)
  navigation.setOptions({
    headerRight: () => (data?.category ? <StyledButton title='Edit' onPress={handleEditPress} /> : <></>),
    title: data?.category.name || ''
  })

  const openEditExercise = (id: string, name: string) => {
    navigation.navigate('Exercise', {
      id,
      name
    })
  }

  const styles = StyleSheet.create({
    header: {
      textAlign: 'center'
    },
    exerciseHeader: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    exerciseTitle: {
      fontSize: 20,
      paddingLeft: 5
    }
  })

  const handleNewPress = () => setIsExerciseFormVisible(true)

  return (
    <PageLayout loading={loading} refetch={refetch}>
      <>
        {data?.category && (
          <>
            <Text h4 h4Style={styles.header}>
              {data && data?.category.name}
            </Text>
            <Text style={styles.header}>{data && data?.category.desc}</Text>
          </>
        )}
      </>
      {data?.category ? (
        <EditCategory
          category={data.category}
          isFormVisible={isEditFormVisible}
          setIsFormVisible={setIsEditFormVisible}
          refetch={refetch}
        />
      ) : (
        <></>
      )}
      <StyledDivider />
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseTitle}>Exercises</Text>
        <StyledButton title='Create New' onPress={handleNewPress} />
      </View>
      <ExerciseList exercises={data?.category.exercises || []} openEditExercise={openEditExercise} refetch={refetch} />
      <NewExercise
        isFormVisible={isExerciseFormVisible}
        setIsFormVisible={setIsExerciseFormVisible}
        categoryId={categoryId}
        refetch={refetch}
      />
    </PageLayout>
  )
}

export default CategoryScreen
