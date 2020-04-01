import React, {useState} from 'react';
import {Text} from 'react-native-elements';
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
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryWithExercises
  >();
  const [selectedExercise, setSelectedExercise] = useState('');

  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
    },
  });

  return (
    <>
      <Text style={styles.header} h4>
        Current Workout
      </Text>
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
        placeholder={{label: 'Select an exercise', value: null}}
      />
    </>
  );
};

export default CurrentWorkoutScreen;
