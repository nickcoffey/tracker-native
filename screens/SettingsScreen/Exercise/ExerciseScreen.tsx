import React, {useState} from 'react';
import PageLayout from '../../../layouts/PageLayout';
import {updateAnExercise} from '../../../services/ExerciseService';
import {Text, Button, Overlay} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Form, {InputType} from '../../../components/Form';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {EXERCISE, ExerciseData} from '../../../graphql/ExerciseGQL';
import {useQuery} from '@apollo/react-hooks';

type ExerciseScreenRouteProp = RouteProp<RootStackParamList, 'Exercise'>;

type EditExerciseProps = {
  route: ExerciseScreenRouteProp;
};

const EditExercise = ({route}: EditExerciseProps) => {
  const exerciseId = route.params.id;
  const {data, loading} = useQuery<ExerciseData>(EXERCISE, {
    variables: {id: exerciseId},
  });
  //const [exercise, setExercise] = useState(getAnExercise(route.params.id));
  const [editableExercise, setEditableExercise] = useState(data?.exercise);
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
    //setEditableExercise(getAnExercise(route.params.id));
    setIsFormVisible(false);
  };

  const styles = StyleSheet.create({
    subHeaderText: {
      textAlign: 'center',
    },
  });

  return (
    <PageLayout loading={loading}>
      <Text style={styles.subHeaderText}>{data?.exercise.desc}</Text>
      <Button title="Edit" onPress={() => setIsFormVisible(true)} />
      <Overlay
        isVisible={isFormVisible}
        onBackdropPress={() => setIsFormVisible(false)}
        height="auto">
        <Form
          inputs={inputs}
          title={`Edit ${data?.exercise.name}`}
          handleChange={handleExerciseChange}
          handleSubmit={handleSubmit}
        />
      </Overlay>
    </PageLayout>
  );
};

export default EditExercise;
