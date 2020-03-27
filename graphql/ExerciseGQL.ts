import {gql} from 'apollo-boost';

export const ADD_EXERCISE = gql`
  mutation addExercise($newExercise: ExerciseCreateInput!) {
    addExercise(exercise: $newExercise) {
      id
      name
      desc
    }
  }
`;

export type ExerciseCreateInput = {
  name: string;
  desc?: string;
  categoryId: string;
};

export type Exercise = {
  id: string;
  name: string;
  desc: string;
  exerciseId: string;
};

export type ExerciseData = {
  exercise: Exercise;
};
