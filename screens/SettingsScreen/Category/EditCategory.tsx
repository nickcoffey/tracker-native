import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {ApolloQueryResult} from 'apollo-boost'

import Form, {InputType} from '../../../components/Form'
import FullScreenModal from '../../../components/FullScreenModal'
import {
  Category,
  CategoryData,
  UPDATE_CATEGORY,
  CategoryUpdateInput,
  CategoryWithExercisesData
} from '../../../graphql/CategoryGQL'

type EditCategoryProps = {
  category: Category
  isFormVisible: boolean
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<CategoryWithExercisesData>>
}

const EditCategory = ({category, isFormVisible, setIsFormVisible, refetch}: EditCategoryProps) => {
  const [editableCategory, setEditableCategory] = useState<Category>(() => {
    const {id, name, desc} = category
    return {id, name, desc}
  })

  const [updateCategory] = useMutation<{returnedCategory: CategoryData}, {updatedCategory: CategoryUpdateInput}>(
    UPDATE_CATEGORY,
    {
      variables: {
        updatedCategory: editableCategory
      }
    }
  )

  const editInputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: editableCategory.name
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: editableCategory.desc
    }
  ]

  const handleChange = (key: string, value: string) => {
    setEditableCategory({...editableCategory, [key]: value})
  }

  const handleSubmit = () => {
    updateCategory()
      .then(() => refetch())
      .catch((err) => console.log(err))
    setIsFormVisible(false)
  }

  const handleClose = () => setIsFormVisible(false)

  return (
    <FullScreenModal handleClose={handleClose} isVisible={isFormVisible}>
      <Form
        inputs={editInputs}
        title={`Edit ${category && category.name}`}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </FullScreenModal>
  )
}

export default EditCategory
