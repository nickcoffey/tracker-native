import React from 'react';
import {ListItem} from 'react-native-elements';
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
  const handleDeletePress = (id: string) => {
    setDeleteExerciseId(id);
    setIsDeleteModalVisible(true);
  };

  return (
    <>
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
