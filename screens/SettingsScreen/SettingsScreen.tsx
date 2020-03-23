import React, {useState} from 'react';
import {getCategories, CategoryInput} from '../../services/CategoryService';
import CategorySettings from './CategoryScreen/CategoryScreen';
import {createCategory, deleteCategory} from '../../services/CategoryService';

const Settings = () => {
  const [categories, setCategories] = useState(getCategories);

  const createNewCategory = ({name, desc}: CategoryInput) => {
    createCategory({name, desc});
    setCategories(getCategories());
  };

  const deleteACategory = (id: number) => {
    deleteCategory(id);
    setCategories(getCategories());
  };

  return (
    <CategorySettings
      categories={categories}
      createNewCategory={createNewCategory}
      deleteACategory={deleteACategory}
    />
  );
};

export default Settings;
