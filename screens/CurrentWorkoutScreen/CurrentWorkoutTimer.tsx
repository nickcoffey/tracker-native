import React, {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'

import {getTimerFormattedString} from '../../utils/DateUtils'
import StyledText from '../../components/StyledText'

type CurrentWorkoutTimerProps = {
  isTimerStarted: boolean
  startTime: number
}

const CurrentWorkoutTimer = ({isTimerStarted, startTime}: CurrentWorkoutTimerProps) => {
  const [seconds, setSeconds] = useState(0)

  let interval: NodeJS.Timeout
  useEffect(() => {
    if (isTimerStarted) {
      interval = setInterval(() => {
        setSeconds(Math.floor((Date.now() - startTime) / 1000))
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
      <StyledText style={styles.timer}>
        {(seconds !== 0 || isTimerStarted) && getTimerFormattedString(seconds)}
      </StyledText>
    </>
  )
}

export default CurrentWorkoutTimer
