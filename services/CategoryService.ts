export const getCategories = (): Category[] => {
  return categories;
};

export const getACategory = (id: number): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const createCategory = ({name, desc}: CategoryInput) => {
  const tempCategories = getCategories();
  let id = tempCategories[tempCategories.length - 1].id + 1;
  categories.push({id, name, desc});
};

export const updateACategory = (updatedCategory: Category) => {
  categories.map(
    category => updatedCategory.id === category.id && updatedCategory,
  );
};

export const deleteCategory = (id: number) => {
  categories = categories.filter(category => category.id !== id && category);
};

export type CategoryInput = {
  name: string;
  desc: string;
};

export type Category = {
  id: number;
  name: string;
  desc: string;
};

let categories: Category[] = [
  {
    id: 0,
    name: 'Chest',
    desc: 'A core chest exercise',
  },
  {
    id: 1,
    name: 'Legs',
    desc: 'A core leg exercise',
  },
  {
    id: 2,
    name: 'Back',
    desc: 'A core back exercise',
  },
];
