import React from 'react'
import {StyleSheet} from 'react-native'
import {Button, ButtonProps} from 'react-native-elements'

const StyledButton = (props: ButtonProps & {isDelete?: boolean; isCancel?: boolean}) => {
  const {type, isDelete, isCancel} = props
  return (
    <Button
      type={type || 'clear'}
      titleStyle={(isDelete && styles.deleteBtn) || (isCancel && styles.cancelBtn)}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  deleteBtn: {
    color: 'red'
  },
  cancelBtn: {
    color: 'grey'
  }
})

export default StyledButton
