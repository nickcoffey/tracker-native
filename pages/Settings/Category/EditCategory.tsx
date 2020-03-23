import React, {useState, useContext} from 'react';
import {getACategory, updateACategory} from '../../../services/CategoryService';
import {Text, Button, Icon, Overlay} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import ThemeContext from '../../../contexts/ThemeContext';
import Form, {InputType} from '../../../components/Form';

type EditCategoryProps = {
  id: number;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditCategory = ({id, setEditMode}: EditCategoryProps) => {
  const theme = useContext(ThemeContext);
  const [category, setCategory] = useState(getACategory(id));
  const [editableCategory, setEditableCategory] = useState(getACategory(id));
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
    setEditableCategory(getACategory(id));
    setIsFormVisible(false);
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    headerBtn: {
      backgroundColor: theme.default,
    },
    headerBtnContainer: {
      flex: 1,
    },
    headerBtnText: {
      color: theme.secondary,
    },
    headerText: {
      textAlign: 'center',
      flex: 1,
    },
    subHeaderText: {
      textAlign: 'center',
    },
  });

  return (
    <>
      <View style={styles.header}>
        <Button
          containerStyle={styles.headerBtnContainer}
          buttonStyle={styles.headerBtn}
          titleStyle={styles.headerBtnText}
          icon={
            <Icon
              type="material"
              name="chevron-left"
              size={15}
              color={theme.secondary}
            />
          }
          title="Back"
          onPress={() => setEditMode(false)}
        />
        <Text style={styles.headerText} h3>
          {category && category.name}
        </Text>
        <Button
          containerStyle={styles.headerBtnContainer}
          buttonStyle={styles.headerBtn}
          titleStyle={styles.headerBtnText}
          title="Edit"
          onPress={() => setIsFormVisible(true)}
        />
      </View>
      <Text style={styles.subHeaderText}>{category && category.desc}</Text>
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
