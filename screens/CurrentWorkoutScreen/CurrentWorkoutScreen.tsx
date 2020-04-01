import React, {useState, useEffect} from 'react';
import {Text, Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import RNPickerSelect from 'react-native-picker-select';

import {
  ALL_CATEGORIES_WITH_EXERCISES,
  CategoryWithExercises,
  CategoriesWithExercisesData,
} from '../../graphql/CategoryGQL';

const CurrentWorkoutScreen = () => {
  const {data} = useQuery<CategoriesWithExercisesData>(
    ALL_CATEGORIES_WITH_EXERCISES,
  );
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  // const [startTime] = useState<number>(new Date().getTime());
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryWithExercises
  >();
  const [selectedExercise, setSelectedExercise] = useState('');

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

  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
    },
    timer: {
      textAlign: 'center',
      fontSize: 20,
    },
  });

  return (
    <>
      <Text style={styles.header} h4>
        Current Workout
      </Text>
      <Text style={styles.timer}>
        {isTimerStarted && getTimerForattedString(seconds)}
      </Text>
      {isTimerStarted ? (
        <Button
          title="Stop"
          type="clear"
          onPress={() => setIsTimerStarted(false)}
        />
      ) : (
        <Button
          title="Start"
          type="clear"
          onPress={() => setIsTimerStarted(true)}
        />
      )}
      <Text>Category</Text>
      <RNPickerSelect
        onValueChange={value => {
          setSelectedCategory(value);
          setSelectedExercise('');
        }}
        items={
          data?.categories.map(category => ({
            label: category.name,
            value: category,
          })) || []
        }
        placeholder={{label: 'Select a category', value: null}}
      />
      <Text>Exercise</Text>
      <RNPickerSelect
        value={selectedExercise}
        onValueChange={value => setSelectedExercise(value)}
        items={
          selectedCategory?.exercises.map(exercise => ({
            label: exercise.name,
            value: exercise.id,
          })) || []
        }
        style={{textAlign: 'center'}}
        placeholder={{label: 'Select an exercise', value: null}}
      />
    </>
  );
};

export default CurrentWorkoutScreen;
