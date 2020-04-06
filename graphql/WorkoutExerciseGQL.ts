import {gql} from 'apollo-boost';

export const ADD_WORKOUT_EXERCISE = gql`
  mutation addWorkoutExercise(
    $newWorkoutExercise: CreateWorkoutExerciseInput!
  ) {
    addWorkoutExercise(workoutExercise: $newWorkoutExercise) {
      id
      name
      desc
    }
  }
`;

export type WorkoutExercise = {
  id: string;
  name: string;
  desc: string;
};

export type CreateWorkoutExerciseInput = {
  name: string;
  desc?: string;
  workoutId: string;
};

export type UpdateWorkoutExerciseInput = {
  id: string;
  name?: string;
  desc?: string;
  workoutId?: string;
};
