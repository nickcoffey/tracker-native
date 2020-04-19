import {gql} from 'apollo-boost'
import {WorkoutExercise} from './WorkoutExerciseGQL'

export const ADD_WORKOUT_SET = gql`
  mutation addWorkoutSet($newWorkoutSet: WorkoutSetCreateInput!) {
    addWorkoutSet(workoutSet: $newWorkoutSet) {
      id
      weight
      repetitions
    }
  }
`

export const UPDATE_WORKOUT_SET = gql`
  mutation updateWorkoutSet($updatedWorkoutSet: WorkoutSetUpdateInput!) {
    updateWorkoutSet(workoutSet: $updatedWorkoutSet) {
      id
      weight
      repetitions
    }
  }
`

export const WORKOUT_SET = gql`
  query getWorkoutSet($id: ID!) {
    workoutSet(id: $id) {
      id
      weight
      repetitions
      workoutExercise {
        id
      }
    }
  }
`

export const REMOVE_WORKOUT_SET = gql`
  mutation removeWorkoutSet($id: ID!) {
    removeWorkoutSet(id: $id) {
      id
      weight
      repetitions
    }
  }
`

export type WorkoutSetCreateInput = {
  weight?: Number
  repetitions?: Number
  workoutExerciseId: string
}

export type WorkoutSetUpdateInput = {
  id: string
  weight?: Number
  repetitions?: Number
  workoutExerciseId?: string
}

export type WorkoutSet = {
  id: string
  weight: Number
  repetitions: Number
  workoutExercise: WorkoutExercise
}

export type WorkoutSetData = {
  workoutSet: WorkoutSet
}

export type WorkoutSetsData = {
  workoutSets: WorkoutSet[]
}
