import React, {useState} from 'react'
import {Alert} from 'react-native'

import {Category, CategoryUpdateInput} from '../../../../graphql/CategoryGQL'
import EditableListItem from '../../../../components/EditableListItem'
import StyledInput from '../../../../components/StyledInput'

type Props = {
  category: Category
  index: number
  openEditCategory: (id: string, name: string) => void
  onCategoryRemove: (id: string) => void
  onCategoryUpdate: (updatedCategory: CategoryUpdateInput) => void
}

const CategoryListItem = ({category, index, openEditCategory, onCategoryRemove, onCategoryUpdate}: Props) => {
  const [editableCategory, setEditableCategory] = useState({
    name: category.name || '',
    desc: category.desc || ''
  })
  const [isEditing, setIsEditing] = useState(false)

  const createDeleteAlert = () => {
    Alert.alert(
      'Delete Category?',
      `Are you sure you want to delete ${category.name}?`,
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            onCategoryRemove(category.id)
            setIsEditing(false)
          },
          style: 'destructive'
        }
      ],
      {cancelable: false}
    )
  }

  const handleUpdate = () => {
    onCategoryUpdate({id: category.id, ...editableCategory})
    setIsEditing(false)
  }
  const handlePress = () => openEditCategory(category.id, category.name)
  const handleChange = (key: string, value: string) => setEditableCategory({...editableCategory, [key]: value})

  return (
    <EditableListItem
      title={category.name}
      titleEditMode={
        <StyledInput
          label='Name'
          placeholder='Name'
          value={editableCategory.name}
          onChangeText={(text) => handleChange('name', text)}
        />
      }
      subtitle={category.desc}
      subtitleEditMode={
        <StyledInput
          label='Descripton'
          placeholder='Description'
          value={editableCategory.desc}
          onChangeText={(text) => handleChange('desc', text)}
        />
      }
      topDivider={index === 0}
      handlePress={handlePress}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      createDeleteAlert={createDeleteAlert}
      handleUpdate={handleUpdate}
      chevron
    />
  )
}

export default CategoryListItem
