import React, {useState} from 'react';
import PageLayout from '../../../layouts/PageLayout';
import {Text, Button, Divider, Overlay} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingsStackParamList} from '../SettingsNavigator';
import ExerciseList from '../Exercise/ExerciseList';
import {
  CATEGORY_WITH_EXERCISES,
  CategoryWithExercisesData,
} from '../../../graphql/CategoryGQL';
import {REMOVE_EXERCISE, ExerciseData} from '../../../graphql/ExerciseGQL';
import {useQuery, useMutation} from '@apollo/react-hooks';
import EditCategory from './EditCategory';
import NewExercise from '../Exercise/NewExercise';

type CategoryScreenRouteProp = RouteProp<SettingsStackParamList, 'Category'>;

type CategoryScreenProps = {
  navigation: StackNavigationProp<SettingsStackParamList>;
  route: CategoryScreenRouteProp;
};

const CategoryScreen = ({navigation, route}: CategoryScreenProps) => {
  const {colors} = useTheme();
  const categoryId = route.params.id;
  const {data, loading, refetch} = useQuery<CategoryWithExercisesData>(
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

  navigation.setOptions({
    headerRight: () =>
      data?.category ? (
        <Button
          title="Edit"
          type="clear"
          onPress={() => setIsEditFormVisible(true)}
        />
      ) : (
        <></>
      ),
    title: data?.category.name || '',
  });

  const openEditExercise = (id: string, name: string) => {
    navigation.navigate('Exercise', {
      id,
      name,
    });
  };

  const handleExerciseRemove = (doDelete: boolean) => {
    setIsDeleteModalVisible(false);
    doDelete && removeExercise().then(() => refetch());
  };

  const styles = StyleSheet.create({
    desc: {
      textAlign: 'center',
    },
    exerciseHeader: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    exerciseTitle: {
      fontSize: 20,
    },
    divider: {
      padding: 10,
      backgroundColor: colors.background,
    },
    modalDivider: {
      padding: 10,
      backgroundColor: 'white',
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
    <PageLayout loading={loading} refetch={refetch}>
      <Text style={styles.desc}>{data && data?.category.desc}</Text>
      {data?.category ? (
        <EditCategory
          category={data.category}
          isFormVisible={isEditFormVisible}
          setIsFormVisible={setIsEditFormVisible}
          refetch={refetch}
        />
      ) : (
        <></>
      )}
      <Divider style={styles.divider} />
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseTitle}>Exercises</Text>
        <Button
          title="Create New"
          type="clear"
          onPress={() => setIsExerciseFormVisible(true)}
        />
      </View>
      <ExerciseList
        exercises={data?.category.exercises || []}
        openEditExercise={openEditExercise}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
        setDeleteExerciseId={setDeleteExerciseId}
      />
      <NewExercise
        isFormVisible={isExerciseFormVisible}
        setIsFormVisible={setIsExerciseFormVisible}
        categoryId={categoryId}
        refetch={refetch}
      />
      <Overlay
        isVisible={isDeleteModalVisible}
        onBackdropPress={() => setIsDeleteModalVisible(false)}
        height="auto">
        <>
          <Text style={styles.deleteWarning}>
            Are you sure you want to delete this exercise?
          </Text>
          <Divider style={styles.modalDivider} />
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
