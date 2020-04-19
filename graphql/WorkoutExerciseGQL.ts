import {gql} from 'apollo-boost'
import {Workout} from './WorkoutGQL'
import {WorkoutSet} from './WorkoutSetGQL'

export const ADD_WORKOUT_EXERCISE = gql`
  mutation addWorkoutExercise($newWorkoutExercise: CreateWorkoutExerciseInput!) {
    addWorkoutExercise(workoutExercise: $newWorkoutExercise) {
      id
      name
      desc
    }
  }
`

export const UPDATE_WORKOUT_EXERCISE = gql`
  mutation updateWorkoutExercise($updatedWorkoutExercise: UpdateWorkoutExerciseInput!) {
    updateWorkoutExercise(workoutExercise: $updatedWorkoutExercise) {
      id
      name
      desc
    }
  }
`

export const WORKOUT_EXERCISE_WITH_SETS = gql`
  query getWorkoutExercise($id: ID!) {
    workoutExercise(id: $id) {
      id
      name
      desc
      workout {
        id
      }
      workoutSets {
        id
        weight
        repetitions
      }
    }
  }
`

export const REMOVE_WORKOUT_EXERCISE = gql`
  mutation removeWorkoutExercise($id: ID!) {
    removeWorkoutExercise(id: $id) {
      id
      name
      desc
    }
  }
`

export type CreateWorkoutExerciseInput = {
  name: string
  desc?: string
  workoutId: string
}

export type UpdateWorkoutExerciseInput = {
  id: string
  name?: string
  desc?: string
  workoutId?: string
}

export type WorkoutExercise = {
  id: string
  name: string
  desc: string
  workout: Workout
}

export type WorkoutExerciseWithSets = {
  id: string
  name: string
  desc: string
  workout: Workout
  workoutSets: WorkoutSet[]
}

export type WorkoutExerciseWithSetsData = {
  workoutExercise: WorkoutExerciseWithSets
}

export type WorkoutExercisesData = {
  workoutExercises: WorkoutExerciseWithSets[]
}
