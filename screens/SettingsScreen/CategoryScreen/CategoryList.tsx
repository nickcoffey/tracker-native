import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import ThemeContext from '../../../contexts/ThemeContext';
import {ListItem, Text} from 'react-native-elements';
import {Category} from 'services/CategoryService';

type CategoryListProps = {
  categories: Category[];
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>;
};

const CategoryList = ({
  categories,
  setEditMode,
  setSelectedCategory,
}: CategoryListProps) => {
  const theme = useContext(ThemeContext);
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
      fontSize: 20,
    },
  });

  const handlePress = (id: number) => {
    setSelectedCategory(id);
    setEditMode(true);
  };

  return (
    <>
      <Text style={styles.header}>Categories</Text>
      {categories.map((category, index) => (
        <ListItem
          key={index}
          title={category.name}
          subtitle={category.desc}
          chevron
          topDivider={index === 0}
          bottomDivider
          onPress={() => handlePress(category.id)}
        />
      ))}
    </>
  );
};

export default CategoryList;
