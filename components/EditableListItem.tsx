import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'
import {ListItem} from 'react-native-elements'
import {useTheme} from '@react-navigation/native'

import StyledButton from './StyledButton'
// import StyledDivider from './StyledDivider'

type Props = {
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  handlePress: () => void
  title: string | ReactElement
  titleEditMode: ReactElement
  subtitle?: string | ReactElement
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

  const {colors} = useTheme()
  const styles = StyleSheet.create({
    item: {backgroundColor: colors.border},
    itemText: {color: colors.text},
    btnGroup: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  })

  return (
    <>
      <ListItem
        title={isEditing ? titleEditMode : title}
        subtitle={
          isEditing ? (
            <>
              {subtitleEditMode}
              <View style={styles.btnGroup}>
                <StyledButton title='Delete' onPress={createDeleteAlert} isDelete />
                <StyledButton title='Update' onPress={handleUpdate} />
                <StyledButton title='Cancel' onPress={handleCancelPress} isCancel />
              </View>
            </>
          ) : (
            subtitle
          )
        }
        titleStyle={styles.itemText}
        subtitleStyle={styles.itemText}
        containerStyle={styles.item}
        topDivider={topDivider}
        onPress={handlePress}
        onLongPress={handleLongPress}
        bottomDivider
        chevron
      />
      {/* <StyledDivider color={colors.background} size={5} /> */}
    </>
  )
}

export default EditableListItem
