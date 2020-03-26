import React, {useState} from 'react';
import {ExerciseInput, createExercise} from '../../../services/ExerciseService';
import {Text, Button, Overlay, Divider} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Form, {InputType} from '../../../components/Form';
import {RouteProp, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import ExerciseList from '../Exercise/ExerciseList';
import {
  CATEGORY_WITH_EXERCISES,
  CategoryWithExercisesData,
} from '../../../graphql/CategoryGQL';
import {useQuery} from '@apollo/react-hooks';
import EditCategory from './EditCategory';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

type CategoryScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: CategoryScreenRouteProp;
};

const CategoryScreen = ({navigation, route}: CategoryScreenProps) => {
  const {colors} = useTheme();
  const {data, refetch} = useQuery<CategoryWithExercisesData>(
    CATEGORY_WITH_EXERCISES,
    {
      variables: {id: route.params.id},
    },
  );
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

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
    //setExercises(getExercisesByCategory(route.params.id));
    setNewExercise({
      name: '',
      desc: '',
      categoryId: route.params.id,
    });
    setIsExerciseFormVisible(false);
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
      <Text style={styles.subHeaderText}>{data && data?.category.desc}</Text>
      {data?.category && (
        <>
          <Button title="Edit" onPress={() => setIsEditFormVisible(true)} />
          <EditCategory
            category={data?.category}
            isFormVisible={isEditFormVisible}
            setIsFormVisible={setIsEditFormVisible}
            refetch={refetch}
          />
        </>
      )}
      <Divider style={styles.divider} />
      <ExerciseList
        exercises={data?.category.exercises || []}
        openEditExercise={openEditExercise}
      />
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

export default CategoryScreen;
