import React, {useState} from 'react';
import {getACategory, updateACategory} from '../../../services/CategoryService';
import {Text, Button, Overlay} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Form, {InputType} from '../../../components/Form';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';

type EditCategoryScreenRouteProp = RouteProp<
  RootStackParamList,
  'EditCategory'
>;

type EditCategoryProps = {
  route: EditCategoryScreenRouteProp;
};

const EditCategory = ({route}: EditCategoryProps) => {
  const [category, setCategory] = useState(getACategory(route.params.id));
  const [editableCategory, setEditableCategory] = useState(
    getACategory(route.params.id),
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const inputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: (editableCategory && editableCategory.name) || '',
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: (editableCategory && editableCategory.desc) || '',
    },
  ];

  const handleCategoryChange = (key: string, value: string) => {
    editableCategory &&
      setEditableCategory({...editableCategory, [key]: value});
  };

  const handleSubmit = () => {
    editableCategory && updateACategory(editableCategory);
    setCategory(editableCategory);
    setEditableCategory(getACategory(route.params.id));
    setIsFormVisible(false);
  };

  const styles = StyleSheet.create({
    headerText: {
      textAlign: 'center',
    },
    subHeaderText: {
      textAlign: 'center',
    },
  });

  return (
    <>
      <Text style={styles.headerText} h3>
        {category && category.name}
      </Text>
      <Text style={styles.subHeaderText}>{category && category.desc}</Text>
      <Button title="Edit" onPress={() => setIsFormVisible(true)} />
      <Overlay
        isVisible={isFormVisible}
        onBackdropPress={() => setIsFormVisible(false)}
        height="auto">
        <Form
          inputs={inputs}
          title={`Edit ${category && category.name}`}
          handleChange={handleCategoryChange}
          handleSubmit={handleSubmit}
        />
      </Overlay>
    </>
  );
};

export default EditCategory;
