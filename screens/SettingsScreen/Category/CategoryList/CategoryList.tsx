import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {ApolloQueryResult} from 'apollo-boost'

import {
  Category,
  CategoryData,
  REMOVE_CATEGORY,
  AllCategoriesData,
  UPDATE_CATEGORY,
  CategoryUpdateInput
} from '../../../../graphql/CategoryGQL'
import CategoryListItem from './CategoryListItem'

type CategoryListProps = {
  categories: Category[]
  openEditCategory: (id: string, name: string) => void
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<AllCategoriesData>>
}

const CategoryList = ({categories, openEditCategory, refetch}: CategoryListProps) => {
  const [updateCategory] = useMutation<{returnedCategory: Category}, {updatedCategory: CategoryUpdateInput}>(
    UPDATE_CATEGORY
  )

  const onCategoryUpdate = (updatedCategory: CategoryUpdateInput) => {
    updateCategory({
      variables: {
        updatedCategory
      }
    })
      .then(() => refetch())
      .catch((err) => console.log(err))
  }

  const [removeCategory] = useMutation<{removedCategory: CategoryData}, {id: string}>(REMOVE_CATEGORY)

  const onCategoryRemove = (id: string) => {
    removeCategory({variables: {id}})
      .then(() => refetch())
      .catch((err) => console.log(err))
  }

  return (
    <>
      {categories.map((category, index) => (
        <CategoryListItem
          category={category}
          index={index}
          key={index}
          onCategoryRemove={onCategoryRemove}
          onCategoryUpdate={onCategoryUpdate}
          openEditCategory={openEditCategory}
        />
      ))}
    </>
  )
}

export default CategoryList
