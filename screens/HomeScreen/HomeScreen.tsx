import React from 'react'
import PageLayout from '../../layouts/PageLayout'
import {Text} from 'react-native-elements'
import {StyleSheet} from 'react-native'

const HomeScreen = () => {
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center'
    }
  })

  return (
    <PageLayout loading={false}>
      <Text style={styles.header} h4>
        Home
      </Text>
    </PageLayout>
  )
}

export default HomeScreen
