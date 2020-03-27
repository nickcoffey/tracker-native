import React, {useState} from 'react';
import Form, {InputType} from '../../../components/Form';
import {
  Category,
  CategoryData,
  UPDATE_CATEGORY,
  CategoryUpdateInput,
} from '../../../graphql/CategoryGQL';
import {Overlay} from 'react-native-elements';
import {useMutation} from '@apollo/react-hooks';

type EditCategoryProps = {
  category: Category;
  isFormVisible: boolean;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditCategory = ({
  category,
  isFormVisible,
  setIsFormVisible,
}: EditCategoryProps) => {
  const [editableCategory, setEditableCategory] = useState<Category>(() => {
    const {id, name, desc} = category;
    return {id, name, desc};
  });

  const [updateCategory] = useMutation<
    {returnedCategory: CategoryData},
    {updatedCategory: CategoryUpdateInput}
  >(UPDATE_CATEGORY, {
    variables: {
      updatedCategory: editableCategory,
    },
  });

  const editInputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: editableCategory.name,
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: editableCategory.desc,
    },
  ];

  const handleChange = (key: string, value: string) => {
    setEditableCategory({...editableCategory, [key]: value});
  };

  const handleSubmit = () => {
    updateCategory();
    setIsFormVisible(false);
  };

  return (
    <>
      <Overlay
        isVisible={isFormVisible}
        onBackdropPress={() => setIsFormVisible(false)}
        height="auto">
        <Form
          inputs={editInputs}
          title={`Edit ${category && category.name}`}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Overlay>
    </>
  );
};

export default EditCategory;
