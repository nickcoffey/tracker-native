import {gql} from 'apollo-boost';
import {Workout} from './WorkoutGQL';

export type WorkoutExercise = {
  id: string;
  name: string;
  desc: string;
  workout: Workout;
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
