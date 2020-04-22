import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {Button, Divider} from 'react-native-elements'
import {useQuery} from '@apollo/react-hooks'
import {useTheme} from '@react-navigation/native'

import PageLayout from '../../layouts/PageLayout'
import {SettingsNavigationProps} from './SettingsNavigator'
import CategoryList from './Category/CategoryList/CategoryList'
import NewCategory from './Category/NewCategory'
import {ALL_CATEGORIES, AllCategoriesData} from '../../graphql/CategoryGQL'

const SettingsScreen = ({navigation}: SettingsNavigationProps) => {
  const {data, loading, refetch} = useQuery<AllCategoriesData>(ALL_CATEGORIES)

  const [isNewFormVisible, setIsNewFormVisible] = useState(false)

  const handleCreatePress = () => {
    setIsNewFormVisible(true)
  }
  navigation.setOptions({
    headerRight: () => <Button title='Create' type='clear' onPress={handleCreatePress} />
  })

  const openEditCategory = (id: string, name: string) => {
    navigation.navigate('Category', {
      id,
      name
    })
  }

  const {colors} = useTheme()
  const styles = StyleSheet.create({
    divider: {
      padding: 10,
      backgroundColor: colors.background
    }
  })

  return (
    <PageLayout loading={loading} refetch={refetch}>
      <Divider style={styles.divider} />
      <CategoryList categories={data?.categories || []} openEditCategory={openEditCategory} refetch={refetch} />
      <NewCategory isFormVisible={isNewFormVisible} setIsFormVisible={setIsNewFormVisible} refetch={refetch} />
    </PageLayout>
  )
}

export default SettingsScreen
