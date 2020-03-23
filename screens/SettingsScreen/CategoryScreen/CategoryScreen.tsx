import React, {useState, useContext} from 'react';
import {Category, CategoryInput} from 'services/CategoryService';
import Form, {InputType} from '../../../components/Form';
import CategoryList from './CategoryList';
import {Overlay, Button, Divider} from 'react-native-elements';
import ThemeContext from '../../../contexts/ThemeContext';
import {StyleSheet} from 'react-native';
import EditCategory from './EditCategoryScreen';

type CategorySettingsProps = {
  categories: Category[];
  createNewCategory: ({name, desc}: CategoryInput) => void;
  deleteACategory: (id: number) => void;
};

const CategorySettings = ({
  categories,
  createNewCategory,
  deleteACategory,
}: CategorySettingsProps) => {
  const theme = useContext(ThemeContext);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [newCategory, setNewCategory] = useState(initialNewCategory);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const inputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: newCategory.name,
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: newCategory.desc,
    },
  ];

  const handleCategoryChange = (key: string, value: string) => {
    setNewCategory({...newCategory, [key]: value});
  };

  const handleSubmit = () => {
    createNewCategory(newCategory);
    setNewCategory(initialNewCategory);
    setIsFormVisible(false);
  };

  const styles = StyleSheet.create({
    btn: {
      backgroundColor: theme.primary,
    },
    divider: {
      padding: 10,
      backgroundColor: theme.white,
    },
  });

  return (
    <>
      {editMode ? (
        <EditCategory id={selectedCategory} setEditMode={setEditMode} />
      ) : (
        <>
          <CategoryList
            categories={categories}
            setEditMode={setEditMode}
            setSelectedCategory={setSelectedCategory}
          />
          <Overlay
            isVisible={isFormVisible}
            onBackdropPress={() => setIsFormVisible(false)}
            height="auto">
            <Form
              inputs={inputs}
              title="New Category"
              handleChange={handleCategoryChange}
              handleSubmit={handleSubmit}
            />
          </Overlay>
          <Divider style={styles.divider} />
          <Button title="New Category" onPress={() => setIsFormVisible(true)} />
        </>
      )}
    </>
  );
};

const initialNewCategory = {
  name: '',
  desc: '',
};

export default CategorySettings;
