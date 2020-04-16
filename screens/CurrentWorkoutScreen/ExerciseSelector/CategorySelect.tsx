import React from 'react';
import {Text, Icon} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {Exercise} from '../../../graphql/ExerciseGQL';
import {CategoryWithExercises} from '../../../graphql/CategoryGQL';
import {SelectorStyles, PickerStyles} from './ExerciseSelector';

type Props = {
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<CategoryWithExercises | undefined>
  >;
  setSelectedExercise: React.Dispatch<
    React.SetStateAction<Exercise | undefined>
  >;
  styles: SelectorStyles;
  pickerStyles: PickerStyles;
  categories: CategoryWithExercises[];
};

const CategorySelect = ({
  setSelectedCategory,
  setSelectedExercise,
  styles,
  pickerStyles,
  categories,
}: Props) => {
  const handleValueChange = (value: any) => {
    setSelectedCategory(value);
    setSelectedExercise(undefined);
  };

  const icon = () => <Icon type="material" name="expand-more" size={40} />;

  const items =
    categories.map((category) => ({
      label: category.name,
      value: category,
    })) || [];

  return (
    <>
      <Text style={styles.label}>Category</Text>
      <RNPickerSelect
        style={pickerStyles}
        onValueChange={handleValueChange}
        items={items}
        placeholder={{label: 'Select a category', value: null}}
        Icon={icon}
      />
    </>
  );
};

export default CategorySelect;
