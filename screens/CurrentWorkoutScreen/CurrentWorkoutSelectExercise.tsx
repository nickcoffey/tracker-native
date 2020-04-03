import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {Text} from 'react-native-elements';

import {
  CategoriesWithExercisesData,
  ALL_CATEGORIES_WITH_EXERCISES,
  CategoryWithExercises,
} from '../../graphql/CategoryGQL';

const CurrentWorkoutSelectExercise = () => {
  const {data} = useQuery<CategoriesWithExercisesData>(
    ALL_CATEGORIES_WITH_EXERCISES,
  );
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryWithExercises
  >();
  const [selectedExercise, setSelectedExercise] = useState('');

  const styles = StyleSheet.create({
    picker: {
      borderColor: 'black',
      borderWidth: 1,
    },
  });

  return (
    <>
      {/* <Text>Category</Text>
      <RNPickerSelect
        style={styles.picker}
        onValueChange={(value) => {
          setSelectedCategory(value);
          setSelectedExercise('');
        }}
        items={
          data?.categories.map((category) => ({
            label: category.name,
            value: category,
          })) || []
        }
        placeholder={{label: 'Select a category', value: null}}
      />
      <Text>Exercise</Text>
      <RNPickerSelect
        value={selectedExercise}
        onValueChange={(value) => setSelectedExercise(value)}
        items={
          selectedCategory?.exercises.map((exercise) => ({
            label: exercise.name,
            value: exercise.id,
          })) || []
        }
        style={{textAlign: 'center'}}
        placeholder={{label: 'Select an exercise', value: null}}
      /> */}
    </>
  );
};

export default CurrentWorkoutSelectExercise;
