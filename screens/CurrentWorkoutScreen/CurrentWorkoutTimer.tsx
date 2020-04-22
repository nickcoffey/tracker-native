import React, {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import {Text} from 'react-native-elements'

type CurrentWorkoutTimerProps = {
  isTimerStarted: boolean
}

const CurrentWorkoutTimer = ({isTimerStarted}: CurrentWorkoutTimerProps) => {
  const [seconds, setSeconds] = useState(0)

  const padDigits = (timeSegment: number): string => ('00' + timeSegment).slice(-2)

  const getTimerForattedString = (seconds: number): string => {
    let sec = seconds % 60
    seconds = (seconds - sec) / 60
    let mm = seconds % 60
    let hh = (seconds - mm) / 60
    return `${padDigits(hh)}:${padDigits(mm)}:${padDigits(sec)}`
  }

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
      <Text style={styles.timer}>{(seconds !== 0 || isTimerStarted) && getTimerForattedString(seconds)}</Text>
    </>
  )
}

export default CurrentWorkoutTimer
