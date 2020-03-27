import React, {useState} from 'react';
import {Overlay} from 'react-native-elements';
import Form, {InputType} from '../../../components/Form';
import {
  Exercise,
  ExerciseData,
  ExerciseUpdateInput,
  UPDATE_EXERCISE,
} from '../../../graphql/ExerciseGQL';
import {useMutation} from '@apollo/react-hooks';

type EditExerciseProps = {
  exercise: Exercise;
  isFormVisible: boolean;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditExercise = ({
  exercise,
  isFormVisible,
  setIsFormVisible,
}: EditExerciseProps) => {
  const [editableExercise, setEditableExercise] = useState(() => {
    const {id, name, desc, category} = exercise;
    return {id, name, desc, categoryId: category.id};
  });

  const inputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: editableExercise.name,
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: editableExercise.desc,
    },
  ];

  const [updateExercise] = useMutation<
    {returnedExercise: ExerciseData},
    {updatedExercise: ExerciseUpdateInput}
  >(UPDATE_EXERCISE, {
    variables: {
      updatedExercise: editableExercise,
    },
  });

  const handleChange = (key: string, value: string) => {
    editableExercise &&
      setEditableExercise({...editableExercise, [key]: value});
  };

  const handleSubmit = () => {
    updateExercise();
    setIsFormVisible(false);
  };
  return (
    <Overlay
      isVisible={isFormVisible}
      onBackdropPress={() => setIsFormVisible(false)}
      height="auto">
      <Form
        inputs={inputs}
        title={`Edit ${exercise.name}`}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Overlay>
  );
};

export default EditExercise;
