import React, {useState, useContext} from 'react';
import {Overlay, Button, Divider} from 'react-native-elements';
import {getCategories, CategoryInput} from '../../services/CategoryService';
import CategoryList from './Category/CategoryList';
import {createCategory, deleteCategory} from '../../services/CategoryService';
import Form, {InputType} from '../../components/Form';
import ThemeContext from '../../contexts/ThemeContext';
import {StyleSheet} from 'react-native';
import {NavigationProps} from '../../App';

const Settings = ({navigation}: NavigationProps) => {
  const theme = useContext(ThemeContext);
  const [categories, setCategories] = useState(getCategories);
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

  const createNewCategory = ({name, desc}: CategoryInput) => {
    createCategory({name, desc});
    setCategories(getCategories());
  };

  const deleteACategory = (id: number) => {
    deleteCategory(id);
    setCategories(getCategories());
  };

  const handleCategoryChange = (key: string, value: string) => {
    setNewCategory({...newCategory, [key]: value});
  };

  const handleSubmit = () => {
    createNewCategory(newCategory);
    setNewCategory(initialNewCategory);
    setIsFormVisible(false);
  };

  const openEditCategory = (id: number) => {
    navigation.navigate('EditCategory', {
      id: id,
    });
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
      <CategoryList
        categories={categories}
        openEditCategory={openEditCategory}
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
  );
};

const initialNewCategory = {
  name: '',
  desc: '',
};

export default Settings;
