import React, {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import {Text} from 'react-native-elements'

import {getTimerFormattedString} from '../../utils/DateUtils'

type CurrentWorkoutTimerProps = {
  isTimerStarted: boolean
}

const CurrentWorkoutTimer = ({isTimerStarted}: CurrentWorkoutTimerProps) => {
  const [seconds, setSeconds] = useState(0)

  let interval: NodeJS.Timeout
  useEffect(() => {
    if (isTimerStarted) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)
    } else if (!isTimerStarted && seconds !== 0) {
      clearInterval(interval)
      setSeconds(0)
    }
    return () => clearInterval(interval)
  }, [isTimerStarted, seconds])

  const styles = StyleSheet.create({
    timer: {
      textAlign: 'center',
      fontSize: 20
    }
  })

  return (
    <>
      <Text style={styles.timer}>{(seconds !== 0 || isTimerStarted) && getTimerFormattedString(seconds)}</Text>
    </>
  )
}

export default CurrentWorkoutTimer
