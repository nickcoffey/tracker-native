import React from 'react'

export const theme = {
  primary: '#456990',
  secondary: '#49DCB1', // #49BEAA
  default: '#FFFFFF',
  warning: '#EEB868',
  danger: '#EF767A',
  white: '#ffffff',
  black: '#000000'
}

const ThemeContext = React.createContext(theme)

export default ThemeContext
