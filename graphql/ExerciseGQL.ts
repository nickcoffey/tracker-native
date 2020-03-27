import {gql} from 'apollo-boost';
import {Category} from './CategoryGQL';

export const ADD_EXERCISE = gql`
  mutation addExercise($newExercise: ExerciseCreateInput!) {
    addExercise(exercise: $newExercise) {
      id
      name
      desc
    }
  }
`;

export const UPDATE_EXERCISE = gql`
  mutation updateExercise($updatedExercise: ExerciseUpdateInput!) {
    updateExercise(exercise: $updatedExercise) {
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
      category {
        id
      }
    }
  }
`;

export const REMOVE_EXERCISE = gql`
  mutation removeExercise($id: ID!) {
    removeExercise(id: $id) {
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

export type ExerciseUpdateInput = {
  id: string;
  name?: string;
  desc?: string;
  categoryId: string;
};

export type Exercise = {
  id: string;
  name: string;
  desc: string;
  category: Category;
};

export type ExerciseData = {
  exercise: Exercise;
};

export type ExercisesData = {
  exercises: Exercise[];
};
