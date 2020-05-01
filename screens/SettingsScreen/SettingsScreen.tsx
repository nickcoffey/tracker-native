import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks'

import PageLayout from '../../layouts/PageLayout'
import StyledButton from '../../components/StyledButton'
import StyledDivider from '../../components/StyledDivider'
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
    headerRight: () => <StyledButton title='Create' onPress={handleCreatePress} />
  })

  const openEditCategory = (id: string, name: string) => {
    navigation.navigate('Category', {
      id,
      name
    })
  }

  return (
    <PageLayout loading={loading} refetch={refetch}>
      <StyledDivider />
      <CategoryList categories={data?.categories || []} openEditCategory={openEditCategory} refetch={refetch} />
      <NewCategory isFormVisible={isNewFormVisible} setIsFormVisible={setIsNewFormVisible} refetch={refetch} />
    </PageLayout>
  )
}

export default SettingsScreen
