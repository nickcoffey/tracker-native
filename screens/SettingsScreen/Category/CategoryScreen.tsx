import React, {useState} from 'react';
import PageLayout from '../../../layouts/PageLayout';
import {Text, Button, Divider} from 'react-native-elements';
import {StyleSheet} from 'react-native';
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

  const openEditExercise = (id: number, name: string) => {
    navigation.navigate('Exercise', {
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
    <PageLayout loading={loading}>
      <Text style={styles.subHeaderText}>{data && data?.category.desc}</Text>
      {data?.category ? (
        <>
          <Button title="Edit" onPress={() => setIsEditFormVisible(true)} />
          <EditCategory
            category={data?.category}
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
    </PageLayout>
  );
};

export default CategoryScreen;
