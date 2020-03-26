import React, {useState, useEffect} from 'react';
import Form, {InputType} from '../../../components/Form';
import {
  Category,
  CategoryData,
  UPDATE_CATEGORY,
  CategoryUpdateInput,
} from '../../../graphql/CategoryGQL';
import {Overlay} from 'react-native-elements';
import {useMutation} from '@apollo/react-hooks';
import {ApolloQueryResult} from 'apollo-boost';

type EditCategoryProps = {
  category: Category;
  isFormVisible: boolean;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    variables?: Record<string, any> | undefined,
  ) => Promise<ApolloQueryResult<CategoryData>>;
};

const EditCategory = ({
  category,
  isFormVisible,
  setIsFormVisible,
  refetch,
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
      value: (editableCategory && editableCategory.name) || '',
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: (editableCategory && editableCategory.desc) || '',
    },
  ];

  const handleChange = (key: string, value: string) => {
    editableCategory &&
      setEditableCategory({...editableCategory, [key]: value});
  };

  const handleSubmit = () => {
    updateCategory().then(() => refetch());
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
