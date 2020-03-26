import React, {useState, useEffect} from 'react';
import {Button, Divider} from 'react-native-elements';
import {ALL_CATEGORIES, AllCategoriesData} from '../../graphql/CategoryGQL';
import CategoryList from './Category/CategoryList';
import {StyleSheet} from 'react-native';
import {NavigationProps} from '../../App';
import {useTheme} from '@react-navigation/native';
import {useQuery} from '@apollo/react-hooks';
import NewCategory from './Category/NewCategory';

const Settings = ({navigation}: NavigationProps) => {
  const {data, refetch} = useQuery<AllCategoriesData>(ALL_CATEGORIES);
  const {colors} = useTheme();
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    refetch();
  });

  const openEditCategory = (id: number, name: string) => {
    navigation.navigate('Category', {
      id,
      name,
    });
  };

  const styles = StyleSheet.create({
    divider: {
      padding: 10,
      backgroundColor: colors.background,
    },
  });

  return (
    <>
      <Divider style={styles.divider} />
      <CategoryList
        categories={data?.categories || []}
        openEditCategory={openEditCategory}
      />
      <NewCategory
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
        refetch={refetch}
      />
      <Divider style={styles.divider} />
      <Button title="New Category" onPress={() => setIsFormVisible(true)} />
    </>
  );
};

export default Settings;
