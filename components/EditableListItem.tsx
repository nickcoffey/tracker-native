import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'
import {ListItem, Button} from 'react-native-elements'

type Props = {
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  handlePress: () => void
  title: string | ReactElement
  titleEditMode: ReactElement
  subtitle?: string
  subtitleEditMode: ReactElement
  topDivider: boolean
  createDeleteAlert: () => void
  handleUpdate: () => void
}

const EditableListItem = ({
  isEditing,
  setIsEditing,
  handlePress,
  title,
  titleEditMode,
  subtitle,
  subtitleEditMode,
  topDivider,
  createDeleteAlert,
  handleUpdate
}: Props) => {
  const handleCancelPress = () => setIsEditing(false)
  const handleLongPress = () => setIsEditing(true)

  const styles = StyleSheet.create({
    deleteBtn: {
      color: 'red'
    },
    btnGroup: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  })

  return (
    <ListItem
      title={isEditing ? titleEditMode : title}
      subtitle={
        isEditing ? (
          <>
            {subtitleEditMode}
            <View style={styles.btnGroup}>
              <Button title='Delete' type='clear' onPress={createDeleteAlert} titleStyle={styles.deleteBtn} />
              <Button title='Update' type='clear' onPress={handleUpdate} />
              <Button title='Cancel' type='clear' onPress={handleCancelPress} />
            </View>
          </>
        ) : (
          subtitle
        )
      }
      topDivider={topDivider}
      onPress={handlePress}
      onLongPress={handleLongPress}
      bottomDivider
      chevron
    />
  )
}

export default EditableListItem
