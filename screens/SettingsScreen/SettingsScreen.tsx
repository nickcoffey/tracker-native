import React, {useState} from 'react';
import PageLayout from '../../layouts/PageLayout';
import {Button, Divider, Overlay, Text} from 'react-native-elements';
import {
  ALL_CATEGORIES,
  AllCategoriesData,
  REMOVE_CATEGORY,
  CategoryData,
} from '../../graphql/CategoryGQL';
import CategoryList from './Category/CategoryList';
import {StyleSheet} from 'react-native';
import {NavigationProps} from '../../App';
import {useTheme} from '@react-navigation/native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import NewCategory from './Category/NewCategory';

const SettingsScreen = ({navigation}: NavigationProps) => {
  // GRAPHQL
  const {data, loading} = useQuery<AllCategoriesData>(ALL_CATEGORIES);
  const [deleteCategoryId, setDeleteCategoryId] = useState('');
  const [removeCategory] = useMutation<
    {removedCategory: CategoryData},
    {id: string}
  >(REMOVE_CATEGORY, {variables: {id: deleteCategoryId}});

  const {colors} = useTheme();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isNewFormVisible, setIsNewFormVisible] = useState(false);

  const openEditCategory = (id: string, name: string) => {
    navigation.navigate('Category', {
      id,
      name,
    });
  };

  const handleCategoryRemove = (doDelete: boolean) => {
    setIsDeleteModalVisible(false);
    doDelete && removeCategory();
  };

  const styles = StyleSheet.create({
    divider: {
      padding: 10,
      backgroundColor: colors.background,
    },
    dangerBtn: {
      backgroundColor: 'red',
    },
    deleteWarning: {
      textAlign: 'center',
      fontSize: 20,
    },
  });

  return (
    <PageLayout loading={loading}>
      <Divider style={styles.divider} />
      <CategoryList
        categories={data?.categories || []}
        openEditCategory={openEditCategory}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
        setDeleteCategoryId={setDeleteCategoryId}
      />
      <NewCategory
        isFormVisible={isNewFormVisible}
        setIsFormVisible={setIsNewFormVisible}
      />
      <Divider style={styles.divider} />
      <Button title="New Category" onPress={() => setIsNewFormVisible(true)} />
      <Overlay
        isVisible={isDeleteModalVisible}
        onBackdropPress={() => setIsDeleteModalVisible(false)}
        height="auto">
        <>
          <Text style={styles.deleteWarning}>
            Are you sure you want to delete this category?
          </Text>
          <Divider style={styles.divider} />
          <Button
            title="Yes"
            buttonStyle={styles.dangerBtn}
            onPress={() => handleCategoryRemove(true)}
          />
          <Button title="No" onPress={() => handleCategoryRemove(false)} />
        </>
      </Overlay>
    </PageLayout>
  );
};

export default SettingsScreen;
