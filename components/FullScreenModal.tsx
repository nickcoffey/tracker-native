import React, {ReactElement} from 'react'
import {Modal, SafeAreaView} from 'react-native'

type Props = {
  isVisible: boolean
  children: ReactElement | ReactElement[]
}

const FullScreenModal = ({isVisible, children}: Props) => (
  <Modal animationType='slide' visible={isVisible}>
    <SafeAreaView>{children}</SafeAreaView>
  </Modal>
)

export default FullScreenModal
