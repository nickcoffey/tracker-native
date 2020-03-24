import React from 'react';
import {ListItem} from 'react-native-elements';
import {Category} from 'services/CategoryService';

type CategoryListProps = {
  categories: Category[];
  openEditCategory: (id: number, name: string) => void;
};

const CategoryList = ({categories, openEditCategory}: CategoryListProps) => (
  <>
    {categories.map((category, index) => (
      <ListItem
        key={index}
        title={category.name}
        subtitle={category.desc}
        chevron
        topDivider={index === 0}
        bottomDivider
        onPress={() => openEditCategory(category.id, category.name)}
      />
    ))}
  </>
);

export default CategoryList;
