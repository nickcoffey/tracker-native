import {gql} from 'apollo-boost'
import {WorkoutExercise} from './WorkoutExerciseGQL'

export const ADD_WORKOUT = gql`
  mutation addWorkout {
    addWorkout {
      id
      startTime
      endTime
    }
  }
`

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
`

export const STOP_WORKOUT = gql`
  mutation stopWorkout($id: ID!) {
    stopWorkout(id: $id) {
      id
      startTime
      endTime
    }
  }
`

export const UPDATE_WORKOUT = gql`
  mutation updateWorkout($updatedWorkout: WorkoutUpdateInput!) {
    updateWorkout(workout: $updatedWorkout) {
      id
      startTime
      endTime
    }
  }
`

export const ALL_WORKOUTS = gql`
  query getAllWorkouts {
    workouts {
      id
      startTime
      endTime
    }
  }
`

export type Workout = {
  id: string
  startTime: string
  endTime: string
}

export type AllWorkoutsData = {
  workouts: Workout[]
}

export type WorkoutWithExercises = {
  id: string
  startTime: string
  endTime: string
  workoutExercises: WorkoutExercise[]
}

export type WorkoutDataWithExercises = {
  workout: WorkoutWithExercises
}

export type WorkoutUpdateInput = {
  id: string
  startTime?: string
  endTime?: string
}
