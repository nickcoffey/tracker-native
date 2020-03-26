import {gql} from 'apollo-boost';
import {Exercise} from './ExerciseGQL';

export const ALL_CATEGORIES = gql`
  {
    categories {
      id
      name
      desc
    }
  }
`;

export const CATEGORY_WITH_EXERCISES = gql`
  query getCategoryWithExercises($id: ID!) {
    category(id: $id) {
      id
      name
      desc
      exercises {
        id
        name
        desc
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($newCategory: CategoryCreateInput!) {
    addCategory(category: $newCategory) {
      id
      name
      desc
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($updatedCategory: CategoryUpdateInput!) {
    updateCategory(category: $updatedCategory) {
      id
      name
      desc
    }
  }
`;

export type Category = {
  id: string;
  name: string;
  desc: string;
};

export type CategoryData = {
  category: Category;
};

export type AllCategoriesData = {
  categories: Category[];
};

export type CategoryWithExercises = {
  id: string;
  name: string;
  desc: string;
  exercises: Exercise[];
};

export type CategoryWithExercisesData = {
  category: CategoryWithExercises;
};

export type CategoryCreateInput = {
  name: string;
  desc?: string;
};

export type CategoryUpdateInput = {
  id: string;
  name?: string;
  desc?: string;
};
