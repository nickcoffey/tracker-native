import React from 'react'
import {Image} from 'react-native-elements'
import {Appearance} from 'react-native-appearance'

const HeaderImage = () => (
  <Image
    source={
      Appearance.getColorScheme() === 'dark'
        ? require('../assets/tracker-dark-transparent.png')
        : require('../assets/tracker-transparent.png')
    }
    placeholderStyle={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
    style={{width: 150, height: 75}}
  />
)

export const useHeaderImage = () => {
  return {
    headerTitle: HeaderImage
  }
}
