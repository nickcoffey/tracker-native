import React from 'react'
import {Image} from 'react-native-elements'

const HeaderImage = () => (
  <Image
    source={require('../assets/tracker-transparent.png')}
    placeholderStyle={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
    style={{width: 150, height: 75}}
  />
)

export const useHeaderImage = () => {
  return {
    headerTitle: HeaderImage
  }
}
