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
import {SettingsNavigationProps} from './SettingsNavigator';
import {useTheme} from '@react-navigation/native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import NewCategory from './Category/NewCategory';

const SettingsScreen = ({navigation}: SettingsNavigationProps) => {
  // GRAPHQL
  const {data, loading, refetch} = useQuery<AllCategoriesData>(ALL_CATEGORIES);
  const [deleteCategoryId, setDeleteCategoryId] = useState('');
  const [removeCategory] = useMutation<
    {removedCategory: CategoryData},
    {id: string}
  >(REMOVE_CATEGORY, {variables: {id: deleteCategoryId}});

  const {colors} = useTheme();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isNewFormVisible, setIsNewFormVisible] = useState(false);

  const handleCreatePress = () => {
    setIsNewFormVisible(true);
  };
  navigation.setOptions({
    headerRight: () => (
      <Button title="Create" type="clear" onPress={handleCreatePress} />
    ),
  });

  const openEditCategory = (id: string, name: string) => {
    navigation.navigate('Category', {
      id,
      name,
    });
  };

  const handleYesPress = () => handleCategoryRemove(true);
  const handleNoPress = () => handleCategoryRemove(false);
  const handleCategoryRemove = (doDelete: boolean) => {
    setIsDeleteModalVisible(false);
    doDelete &&
      removeCategory()
        .then(() => refetch())
        .catch((err) => console.log(err));
  };

  const styles = StyleSheet.create({
    divider: {
      padding: 10,
      backgroundColor: colors.background,
    },
    modalDivider: {
      padding: 10,
      backgroundColor: 'white',
    },
    dangerBtn: {
      backgroundColor: 'red',
    },
    deleteWarning: {
      textAlign: 'center',
      fontSize: 20,
    },
  });

  const handleBackdropPress = () => setIsDeleteModalVisible(false);

  return (
    <PageLayout loading={loading} refetch={refetch}>
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
        refetch={refetch}
      />
      <Overlay
        isVisible={isDeleteModalVisible}
        onBackdropPress={handleBackdropPress}
        height="auto">
        <>
          <Text style={styles.deleteWarning}>
            Are you sure you want to delete this category?
          </Text>
          <Divider style={styles.modalDivider} />
          <Button
            title="Yes"
            buttonStyle={styles.dangerBtn}
            onPress={handleYesPress}
          />
          <Button title="No" onPress={handleNoPress} />
        </>
      </Overlay>
    </PageLayout>
  );
};

export default SettingsScreen;
