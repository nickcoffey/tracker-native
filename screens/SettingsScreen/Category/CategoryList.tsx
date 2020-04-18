import React from 'react'
import {ListItem} from 'react-native-elements'

import {Category} from '../../../graphql/CategoryGQL'

type CategoryListProps = {
  categories: Category[]
  openEditCategory: (id: string, name: string) => void
  setIsDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteCategoryId: React.Dispatch<React.SetStateAction<string>>
}

const CategoryList = ({
  categories,
  openEditCategory,
  setIsDeleteModalVisible,
  setDeleteCategoryId
}: CategoryListProps) => {
  const handleDeletePress = (id: string) => {
    setDeleteCategoryId(id)
    setIsDeleteModalVisible(true)
  }

  return (
    <>
      {categories.map((category, index) => (
        <ListItem
          key={index}
          title={category.name}
          subtitle={category.desc}
          chevron
          topDivider={index === 0}
          bottomDivider
          onPress={() => openEditCategory(category.id, category.name)} // TODO find way to extract from render
          onLongPress={() => handleDeletePress(category.id)} // TODO find way to extract from render
        />
      ))}
    </>
  )
}

export default CategoryList
