import React, {ReactElement} from 'react'
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'
import {useTheme} from '@react-navigation/native'

type Props = {
  isVisible: boolean
  children: ReactElement | ReactElement[]
  handleClose: () => void
}

const FullScreenModal = ({isVisible, children, handleClose}: Props) => {
  const {colors} = useTheme()
  const styles = StyleSheet.create({
    modal: {
      margin: 0
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end'
    },
    content: {
      backgroundColor: colors.border
    },
    bottom: {
      flex: 1
    }
  })

  return (
    <Modal isVisible={isVisible} animationIn='slideInDown' animationOut='slideOutUp' style={styles.modal}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>{children}</View>
        <TouchableOpacity style={styles.bottom} onPress={handleClose}></TouchableOpacity>
      </SafeAreaView>
    </Modal>
  )
}

export default FullScreenModal
