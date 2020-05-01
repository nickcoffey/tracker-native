import {gql} from 'apollo-boost'
import {Workout} from './WorkoutGQL'
import {WorkoutSet} from './WorkoutSetGQL'
import {Exercise} from './ExerciseGQL'

export const ADD_WORKOUT_EXERCISE = gql`
  mutation addWorkoutExercise($newWorkoutExercise: CreateWorkoutExerciseInput!) {
    addWorkoutExercise(workoutExercise: $newWorkoutExercise) {
      id
      exercise {
        name
        desc
      }
    }
  }
`

export const UPDATE_WORKOUT_EXERCISE = gql`
  mutation updateWorkoutExercise($updatedWorkoutExercise: UpdateWorkoutExerciseInput!) {
    updateWorkoutExercise(workoutExercise: $updatedWorkoutExercise) {
      id
      exercise {
        name
        desc
      }
    }
  }
`

export const WORKOUT_EXERCISE_WITH_SETS = gql`
  query getWorkoutExercise($id: ID!) {
    workoutExercise(id: $id) {
      id
      exercise {
        name
        desc
      }
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
      exercise {
        name
        desc
      }
    }
  }
`

export type CreateWorkoutExerciseInput = {
  exerciseId: string
  workoutId: string
}

export type UpdateWorkoutExerciseInput = {
  id: string
  exerciseId?: string
  workoutId?: string
}

export type WorkoutExercise = {
  id: string
  exercise: Exercise
  workout: Workout
}

export type WorkoutExerciseWithSets = {
  id: string
  exercise: Exercise
  workout: Workout
  workoutSets: WorkoutSet[]
}

export type WorkoutExerciseWithSetsData = {
  workoutExercise: WorkoutExerciseWithSets
}

export type WorkoutExercisesData = {
  workoutExercises: WorkoutExerciseWithSets[]
}
