import React, {useState} from 'react';
import {getCategories, CategoryInput} from '../../services/CategoryService';
import PageLayout from '../../layouts/PageLayout';
import CategorySettings from './Category/CategorySettings';
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
    <PageLayout>
      <CategorySettings
        categories={categories}
        createNewCategory={createNewCategory}
        deleteACategory={deleteACategory}
      />
    </PageLayout>
  );
};

export default Settings;
