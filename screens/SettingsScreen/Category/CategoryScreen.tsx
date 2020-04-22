import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Button, Divider} from 'react-native-elements'
import {RouteProp, useTheme} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useQuery} from '@apollo/react-hooks'

import PageLayout from '../../../layouts/PageLayout'
import {SettingsStackParamList} from '../SettingsNavigator'
import {CATEGORY_WITH_EXERCISES, CategoryWithExercisesData} from '../../../graphql/CategoryGQL'
import ExerciseList from '../Exercise/ExerciseList/ExerciseList'
import EditCategory from './EditCategory'
import NewExercise from '../Exercise/NewExercise'

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
    headerRight: () => (data?.category ? <Button title='Edit' type='clear' onPress={handleEditPress} /> : <></>),
    title: data?.category.name || ''
  })

  const openEditExercise = (id: string, name: string) => {
    navigation.navigate('Exercise', {
      id,
      name
    })
  }

  const {colors} = useTheme()
  const styles = StyleSheet.create({
    desc: {
      textAlign: 'center'
    },
    exerciseHeader: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    exerciseTitle: {
      fontSize: 20
    },
    divider: {
      padding: 10,
      backgroundColor: colors.background
    }
  })

  const handleNewPress = () => setIsExerciseFormVisible(true)

  return (
    <PageLayout loading={loading} refetch={refetch}>
      <Text style={styles.desc}>{data && data?.category.desc}</Text>
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
      <Divider style={styles.divider} />
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseTitle}>Exercises</Text>
        <Button title='Create New' type='clear' onPress={handleNewPress} />
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
