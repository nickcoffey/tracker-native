import {gql} from 'apollo-boost';
import {WorkoutExercise} from './WorkoutExerciseGQL';

export const ADD_WORKOUT = gql`
  mutation addWorkout($newWorkout: WorkoutCreateInput!) {
    addWorkout(workout: $newWorkout) {
      id
      startTime
      endTime
    }
  }
`;

export const WORKOUT_WITH_EXERCISES = gql`
  query getWorkoutWithExercises($id: ID!) {
    workout(id: $id) {
      id
      startTime
      endTime
      workoutExercises {
        id
        name
        desc
      }
    }
  }
`;

export const UPDATE_WORKOUT = gql`
  mutation updateWorkout($updatedWorkout: WorkoutUpdateInput!) {
    updateWorkout(workout: $updatedWorkout) {
      id
      startTime
      endTime
    }
  }
`;

export type Workout = {
  id: string;
  startTime: string;
  endTime: string;
};

export type WorkoutWithExercises = {
  id: string;
  startTime: string;
  endTime: string;
  workoutExercises: WorkoutExercise[];
};

export type WorkoutDataWithExercises = {
  workout: WorkoutWithExercises;
};

export type WorkoutCreateInput = {
  startTime: string;
  endTime?: string;
};

export type WorkoutUpdateInput = {
  id: string;
  startTime?: string;
  endTime?: string;
};
