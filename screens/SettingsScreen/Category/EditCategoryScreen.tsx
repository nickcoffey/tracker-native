import React, {useState} from 'react';
import {getACategory, updateACategory} from '../../../services/CategoryService';
import {
  getExercisesByCategory,
  ExerciseInput,
  createExercise,
} from '../../../services/ExerciseService';
import {Text, Button, Overlay, Divider} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Form, {InputType} from '../../../components/Form';
import {RouteProp, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import ExerciseList from '../Exercise/ExerciseList';

type EditCategoryScreenRouteProp = RouteProp<
  RootStackParamList,
  'EditCategory'
>;

type EditCategoryProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: EditCategoryScreenRouteProp;
};

const EditCategory = ({navigation, route}: EditCategoryProps) => {
  const {colors} = useTheme();
  const [category, setCategory] = useState(getACategory(route.params.id));
  const [exercises, setExercises] = useState(
    getExercisesByCategory(route.params.id),
  );

  const [editableCategory, setEditableCategory] = useState(
    getACategory(route.params.id),
  );
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const editInputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: (editableCategory && editableCategory.name) || '',
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: (editableCategory && editableCategory.desc) || '',
    },
  ];

  const [newExercise, setNewExercise] = useState<ExerciseInput>({
    name: '',
    desc: '',
    categoryId: route.params.id,
  });
  const [isExerciseFormVisible, setIsExerciseFormVisible] = useState(false);
  const exerciseInputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: newExercise.name,
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: newExercise.desc,
    },
  ];

  const handleExerciseChange = (key: string, value: string) => {
    setNewExercise({...newExercise, [key]: value});
  };

  const handleExerciseSubmit = () => {
    createExercise(newExercise);
    setExercises(getExercisesByCategory(route.params.id));
    setNewExercise({
      name: '',
      desc: '',
      categoryId: route.params.id,
    });
    setIsExerciseFormVisible(false);
  };

  const handleCategoryChange = (key: string, value: string) => {
    editableCategory &&
      setEditableCategory({...editableCategory, [key]: value});
  };

  const handleCategorySubmit = () => {
    editableCategory && updateACategory(editableCategory);
    setCategory(editableCategory);
    setEditableCategory(getACategory(route.params.id));
    setIsEditFormVisible(false);
  };

  const openEditExercise = (id: number, name: string) => {
    navigation.navigate('EditExercise', {
      id,
      name,
    });
  };

  const styles = StyleSheet.create({
    subHeaderText: {
      textAlign: 'center',
    },
    divider: {
      padding: 10,
      backgroundColor: colors.background,
    },
  });

  return (
    <>
      <Text style={styles.subHeaderText}>{category && category.desc}</Text>
      <Button title="Edit" onPress={() => setIsEditFormVisible(true)} />
      <Divider style={styles.divider} />
      <Overlay
        isVisible={isEditFormVisible}
        onBackdropPress={() => setIsEditFormVisible(false)}
        height="auto">
        <Form
          inputs={editInputs}
          title={`Edit ${category && category.name}`}
          handleChange={handleCategoryChange}
          handleSubmit={handleCategorySubmit}
        />
      </Overlay>
      <ExerciseList exercises={exercises} openEditExercise={openEditExercise} />
      <Divider style={styles.divider} />
      <Button
        title="New Exercise"
        onPress={() => setIsExerciseFormVisible(true)}
      />
      <Overlay
        isVisible={isExerciseFormVisible}
        onBackdropPress={() => setIsExerciseFormVisible(false)}
        height="auto">
        <Form
          inputs={exerciseInputs}
          title="New Exercise"
          handleChange={handleExerciseChange}
          handleSubmit={handleExerciseSubmit}
        />
      </Overlay>
    </>
  );
};

export default EditCategory;
