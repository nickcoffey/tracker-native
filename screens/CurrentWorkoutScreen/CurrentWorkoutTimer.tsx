import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Text /*Button, ButtonGroup, ElementObject*/,
} from 'react-native-elements';

type CurrentWorkoutTimerProps = {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  isTimerStarted: boolean;
};

const CurrentWorkoutTimer = ({
  seconds,
  setSeconds,
  isTimerStarted,
}: CurrentWorkoutTimerProps) => {
  const padDigits = (timeSegment: number): string => {
    return ('00' + timeSegment).slice(-2);
  };

  const getTimerForattedString = (seconds: number): string => {
    let sec = seconds % 60;
    seconds = (seconds - sec) / 60;
    let mm = seconds % 60;
    let hh = (seconds - mm) / 60;
    return `${padDigits(hh)}:${padDigits(mm)}:${padDigits(sec)}`;
  };

  let interval: NodeJS.Timeout;
  useEffect(() => {
    if (isTimerStarted) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isTimerStarted && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerStarted, seconds]);

  // const handleButtonPress = (index: number) => {
  //   switch (index) {
  //     case 0:
  //       setIsTimerStarted(!isTimerStarted);
  //       break;
  //     case 1:
  //       setSeconds(0);
  //       setIsTimerStarted(false);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const styles = StyleSheet.create({
    timer: {
      textAlign: 'center',
      fontSize: 20,
    },
  });

  // let buttons = [isTimerStarted ? 'Stop' : 'Start'];
  // if (seconds !== 0) {
  //   buttons.push('Reset');
  // }

  return (
    <>
      <Text style={styles.timer}>
        {(seconds !== 0 || isTimerStarted) && getTimerForattedString(seconds)}
      </Text>
      {/* <ButtonGroup
        buttons={buttons}
        onPress={index => handleButtonPress(index)}
      /> */}
    </>
  );
};

export default CurrentWorkoutTimer;