import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {Text, Icon} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

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

  const baseStyles = StyleSheet.create({
    styles: {
      textAlign: 'center',
      paddingHorizontal: 10,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

  const pickerStyles = StyleSheet.create({
    inputIOS: {
      ...baseStyles.styles,
      paddingVertical: 10,
      borderWidth: 1,
    },
    inputAndroid: {
      ...baseStyles.styles,
      paddingVertical: 8,
      borderWidth: 0.5,
    },
  });

  const styles = StyleSheet.create({
    label: {
      fontSize: 16,
    },
  });

  return (
    <>
      <Text style={styles.label}>Category</Text>
      <RNPickerSelect
        style={pickerStyles}
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
        Icon={() => <Icon type="material" name="expand-more" size={40} />}
      />
      <Text style={styles.label}>Exercise</Text>
      <RNPickerSelect
        value={selectedExercise}
        onValueChange={value => setSelectedExercise(value)}
        items={
          selectedCategory?.exercises.map(exercise => ({
            label: exercise.name,
            value: exercise.id,
          })) || []
        }
        style={pickerStyles}
        placeholder={{label: 'Select an exercise', value: null}}
        Icon={() => <Icon type="material" name="expand-more" size={40} />}
      />
    </>
  );
};

export default CurrentWorkoutSelectExercise;
