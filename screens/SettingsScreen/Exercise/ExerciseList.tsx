import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {Exercise} from '../../../graphql/ExerciseGQL';

type ExerciseListProps = {
  exercises: Exercise[];
  openEditExercise: (id: number, name: string) => void;
};

const ExerciseList = ({exercises, openEditExercise}: ExerciseListProps) => {
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
      fontSize: 20,
    },
  });

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
        />
      ))}
    </>
  );
};

export default ExerciseList;
