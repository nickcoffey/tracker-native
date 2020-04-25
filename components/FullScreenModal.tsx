import React, {ReactElement} from 'react'
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'

type Props = {
  isVisible: boolean
  children: ReactElement | ReactElement[]
  handleClose: () => void
}

const FullScreenModal = ({isVisible, children, handleClose}: Props) => (
  <Modal isVisible={isVisible} animationIn='slideInDown' animationOut='slideOutUp' style={styles.modal}>
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{children}</View>
      <TouchableOpacity style={styles.bottom} onPress={handleClose}></TouchableOpacity>
    </SafeAreaView>
  </Modal>
)

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
    backgroundColor: 'white'
  },
  bottom: {
    flex: 1
  }
})

export default FullScreenModal
