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

export const EXERCISE = gql`
  query getExercise($id: ID!) {
    exercise(id: $id) {
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
  categoryId: string;
};

export type ExerciseData = {
  exercise: Exercise;
};

export type ExercisesData = {
  exercises: Exercise[];
};
