export const getExercises = (): Exercise[] => {
  return exercises;
};

export const getExercisesByCategory = (categoryId: string): Exercise[] => {
  return exercises.filter(exercise => exercise.categoryId === categoryId);
};

export const getAnExercise = (id: string): Exercise | undefined => {
  return exercises.find(exercise => exercise.id === id);
};

export const createExercise = ({name, desc, categoryId}: ExerciseInput) => {
  const tempExercises = getExercises();
  let id = tempExercises[tempExercises.length - 1].id + 1;
  exercises.push({id, name, desc, categoryId});
};

export const updateAnExercise = (updatedExercise: Exercise) => {
  exercises.map(
    exercise => updatedExercise.id === exercise.id && updatedExercise,
  );
};

export const deleteExercise = (id: string) => {
  exercises = exercises.filter(exercise => exercise.id !== id && exercise);
};

export type ExerciseInput = {
  name: string;
  desc: string;
  categoryId: string;
};

export type Exercise = {
  id: string;
  name: string;
  desc: string;
  categoryId: string;
};

let exercises: Exercise[] = [
  {
    id: '0',
    name: 'Bench Press',
    desc: 'Bench description',
    categoryId: '0',
  },
  {
    id: '1',
    name: 'Push-Ups',
    desc: 'Push-Up description',
    categoryId: '0',
  },
  {
    id: '2',
    name: 'Squats',
    desc: 'Squat description',
    categoryId: '1',
  },
  {
    id: '3',
    name: 'Calf Raises',
    desc: 'Calf raise description',
    categoryId: '1',
  },

  {
    id: '4',
    name: 'Pull-Ups',
    desc: 'Pull-Up description',
    categoryId: '2',
  },
  {
    id: '5',
    name: 'Bent Over Rows',
    desc: 'Bent Over Row description',
    categoryId: '2',
  },
];
