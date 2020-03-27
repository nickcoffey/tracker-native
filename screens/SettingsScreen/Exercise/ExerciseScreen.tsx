import React, {useState} from 'react';
import {
  getAnExercise,
  updateAnExercise,
} from '../../../services/ExerciseService';
import {Text, Button, Overlay} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Form, {InputType} from '../../../components/Form';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';

type EditExerciseScreenRouteProp = RouteProp<
  RootStackParamList,
  'EditExercise'
>;

type EditExerciseProps = {
  route: EditExerciseScreenRouteProp;
};

const EditExercise = ({route}: EditExerciseProps) => {
  const [exercise, setExercise] = useState(getAnExercise(route.params.id));
  const [editableExercise, setEditableExercise] = useState(
    getAnExercise(route.params.id),
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const inputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: (editableExercise && editableExercise.name) || '',
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: (editableExercise && editableExercise.desc) || '',
    },
  ];

  const handleExerciseChange = (key: string, value: string) => {
    editableExercise &&
      setEditableExercise({...editableExercise, [key]: value});
  };

  const handleSubmit = () => {
    editableExercise && updateAnExercise(editableExercise);
    setExercise(editableExercise);
    setEditableExercise(getAnExercise(route.params.id));
    setIsFormVisible(false);
  };

  const styles = StyleSheet.create({
    subHeaderText: {
      textAlign: 'center',
    },
  });

  return (
    <>
      <Text style={styles.subHeaderText}>{exercise && exercise.desc}</Text>
      <Button title="Edit" onPress={() => setIsFormVisible(true)} />
      <Overlay
        isVisible={isFormVisible}
        onBackdropPress={() => setIsFormVisible(false)}
        height="auto">
        <Form
          inputs={inputs}
          title={`Edit ${exercise && exercise.name}`}
          handleChange={handleExerciseChange}
          handleSubmit={handleSubmit}
        />
      </Overlay>
    </>
  );
};

export default EditExercise;
