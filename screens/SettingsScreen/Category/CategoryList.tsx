import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {Category} from 'services/CategoryService';

type CategoryListProps = {
  categories: Category[];
  openEditCategory: (id: number) => void;
};

const CategoryList = ({categories, openEditCategory}: CategoryListProps) => {
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
      fontSize: 20,
    },
  });

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
          onPress={() => openEditCategory(category.id)}
        />
      ))}
    </>
  );
};

export default CategoryList;
