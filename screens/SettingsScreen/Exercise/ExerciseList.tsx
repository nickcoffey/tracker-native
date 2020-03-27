import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {Exercise} from '../../../graphql/ExerciseGQL';

type ExerciseListProps = {
  exercises: Exercise[];
  openEditExercise: (id: string, name: string) => void;
  setIsDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteExerciseId: React.Dispatch<React.SetStateAction<string>>;
};

const ExerciseList = ({
  exercises,
  openEditExercise,
  setDeleteExerciseId,
  setIsDeleteModalVisible,
}: ExerciseListProps) => {
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
      fontSize: 20,
    },
  });

  const handleDeletePress = (id: string) => {
    setDeleteExerciseId(id);
    setIsDeleteModalVisible(true);
  };

  return (
    <>
      <Text style={styles.header}>Exercises</Text>
      {exercises.map((exercise, index) => (
        <ListItem
          key={index}
          title={exercise.name}
          subtitle={exercise.desc}
          chevron
          topDivider={index === 0}
          bottomDivider
          onPress={() => openEditExercise(exercise.id, exercise.name)}
          onLongPress={() => handleDeletePress(exercise.id)}
        />
      ))}
    </>
  );
};

export default ExerciseList;
