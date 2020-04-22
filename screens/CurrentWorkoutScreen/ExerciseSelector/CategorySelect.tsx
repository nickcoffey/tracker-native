import React from 'react'

import StyledPicker from '../../../components/StyledPicker'
import {Exercise} from '../../../graphql/ExerciseGQL'
import {CategoryWithExercises} from '../../../graphql/CategoryGQL'

type Props = {
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryWithExercises | undefined>>
  setSelectedExercise: React.Dispatch<React.SetStateAction<Exercise | undefined>>
  categories: CategoryWithExercises[]
}

const CategorySelect = ({setSelectedCategory, setSelectedExercise, categories}: Props) => {
  const handleValueChange = (value: any) => {
    setSelectedCategory(value)
    setSelectedExercise(undefined)
  }

  const items =
    categories.map((category) => ({
      label: category.name,
      value: category
    })) || []

  return (
    <StyledPicker
      title='Category'
      placeholder={{label: 'Select a category', value: null}}
      handleValueChange={handleValueChange}
      items={items}
    />
  )
}

export default CategorySelect
