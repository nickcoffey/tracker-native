import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {ApolloQueryResult} from 'apollo-boost'

import Form, {InputType} from '../../../components/Form'
import FullScreenModal from '../../../components/FullScreenModal'
import {Category, CategoryCreateInput, ADD_CATEGORY, AllCategoriesData} from '../../../graphql/CategoryGQL'

type NewCategoryProps = {
  isFormVisible: boolean
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<AllCategoriesData>>
}

const NewCategory = ({isFormVisible, setIsFormVisible, refetch}: NewCategoryProps) => {
  const initialNewCategory = {
    name: '',
    desc: ''
  }
  const [newCategory, setNewCategory] = useState(initialNewCategory)

  const [addCategory] = useMutation<{returnedCategory: Category}, {newCategory: CategoryCreateInput}>(ADD_CATEGORY, {
    variables: {newCategory}
  })

  const handleCategoryChange = (key: string, value: string) => {
    setNewCategory({...newCategory, [key]: value})
  }

  const handleSubmit = () => {
    addCategory()
      .then(() => refetch())
      .catch((err) => console.log(err))
    setNewCategory(initialNewCategory)
    setIsFormVisible(false)
  }

  const inputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: newCategory.name
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: newCategory.desc
    }
  ]

  const handleClose = () => setIsFormVisible(false)

  return (
    <FullScreenModal handleClose={handleClose} isVisible={isFormVisible}>
      <Form inputs={inputs} title='New Category' handleChange={handleCategoryChange} handleSubmit={handleSubmit} />
    </FullScreenModal>
  )
}

export default NewCategory
