import {gql} from 'apollo-boost';

export const ADD_WORKOUT = gql`
  mutation addWorkout($newWorkout: WorkoutCreateInput!) {
    addWorkout(workout: $newWorkout) {
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

export type WorkoutData = {
  workout: Workout;
};

export type WorkoutCreateInput = {
  startTime: string;
  endTime?: string;
};
