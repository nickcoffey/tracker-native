import React, {useState} from 'react'
import {Alert} from 'react-native'
import {Input} from 'react-native-elements'

import {Category, CategoryUpdateInput} from '../../../../graphql/CategoryGQL'
import EditableListItem from '../../../../components/EditableListItem'

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
        {text: 'Yes', onPress: () => onCategoryRemove(category.id), style: 'destructive'}
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
        <Input
          label='Name'
          placeholder='Name'
          value={editableCategory.name}
          onChangeText={(text) => handleChange('name', text)}
        />
      }
      subtitle={category.desc}
      subtitleEditMode={
        <Input
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
    />
  )
}

export default CategoryListItem
