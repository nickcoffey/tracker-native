import React, {useState} from 'react';
import PageLayout from '../../../layouts/PageLayout';
import {Text, Button, Divider, Overlay} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import ExerciseList from '../Exercise/ExerciseList';
import {
  CATEGORY_WITH_EXERCISES,
  CategoryWithExercisesData,
} from '../../../graphql/CategoryGQL';
import {REMOVE_EXERCISE, ExerciseData} from '../../../graphql/ExerciseGQL';
import {useQuery, useMutation} from '@apollo/react-hooks';
import EditCategory from './EditCategory';
import NewExercise from '../Exercise/NewExercise';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

type CategoryScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: CategoryScreenRouteProp;
};

const CategoryScreen = ({navigation, route}: CategoryScreenProps) => {
  const {colors} = useTheme();
  const categoryId = route.params.id;
  const {data, loading} = useQuery<CategoryWithExercisesData>(
    CATEGORY_WITH_EXERCISES,
    {
      variables: {id: categoryId},
    },
  );
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isExerciseFormVisible, setIsExerciseFormVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteExerciseId, setDeleteExerciseId] = useState('');
  const [removeExercise] = useMutation<
    {removedExercise: ExerciseData},
    {id: string}
  >(REMOVE_EXERCISE, {variables: {id: deleteExerciseId}});

  const openEditExercise = (id: string, name: string) => {
    navigation.navigate('Exercise', {
      id,
      name,
    });
  };

  const handleExerciseRemove = (doDelete: boolean) => {
    setIsDeleteModalVisible(false);
    doDelete && removeExercise();
  };

  const styles = StyleSheet.create({
    subHeaderText: {
      textAlign: 'center',
    },
    divider: {
      padding: 10,
      backgroundColor: colors.background,
    },
    dangerBtn: {
      backgroundColor: 'red',
    },
    deleteWarning: {
      textAlign: 'center',
      fontSize: 20,
    },
  });

  return (
    <PageLayout loading={loading}>
      <Text style={styles.subHeaderText}>{data && data?.category.desc}</Text>
      {data?.category ? (
        <>
          <Button title="Edit" onPress={() => setIsEditFormVisible(true)} />
          <EditCategory
            category={data.category}
            isFormVisible={isEditFormVisible}
            setIsFormVisible={setIsEditFormVisible}
          />
        </>
      ) : (
        <></>
      )}
      <Divider style={styles.divider} />
      <ExerciseList
        exercises={data?.category.exercises || []}
        openEditExercise={openEditExercise}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
        setDeleteExerciseId={setDeleteExerciseId}
      />
      <Divider style={styles.divider} />
      <Button
        title="New Exercise"
        onPress={() => setIsExerciseFormVisible(true)}
      />
      <NewExercise
        isFormVisible={isExerciseFormVisible}
        setIsFormVisible={setIsExerciseFormVisible}
        categoryId={categoryId}
      />
      <Overlay
        isVisible={isDeleteModalVisible}
        onBackdropPress={() => setIsDeleteModalVisible(false)}
        height="auto">
        <>
          <Text style={styles.deleteWarning}>
            Are you sure you want to delete this exercise?
          </Text>
          <Divider style={styles.divider} />
          <Button
            title="Yes"
            buttonStyle={styles.dangerBtn}
            onPress={() => handleExerciseRemove(true)}
          />
          <Button title="No" onPress={() => handleExerciseRemove(false)} />
        </>
      </Overlay>
    </PageLayout>
  );
};

export default CategoryScreen;
