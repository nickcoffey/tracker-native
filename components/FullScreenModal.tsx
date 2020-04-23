import React, {ReactElement} from 'react'
import {Modal, SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native'

type Props = {
  isVisible: boolean
  children: ReactElement | ReactElement[]
  handleClose: () => void
}

const FullScreenModal = ({isVisible, children, handleClose}: Props) => (
  <Modal transparent={true} animationType='slide' visible={isVisible}>
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.top} onPress={handleClose}></TouchableOpacity>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  </Modal>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  top: {
    flex: 1
  },
  content: {
    backgroundColor: 'white'
  }
})

export default FullScreenModal
