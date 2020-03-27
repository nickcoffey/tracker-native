import React, {useState} from 'react';
import PageLayout from '../../../layouts/PageLayout';
import {Text, Button, Divider} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {EXERCISE, ExerciseData} from '../../../graphql/ExerciseGQL';
import {useQuery} from '@apollo/react-hooks';
import EditExercise from './EditExercise';

type ExerciseScreenRouteProp = RouteProp<RootStackParamList, 'Exercise'>;

type ExerciseProps = {
  route: ExerciseScreenRouteProp;
};

const ExerciseScreen = ({route}: ExerciseProps) => {
  const {colors} = useTheme();

  const exerciseId = route.params.id;
  const {data, loading} = useQuery<ExerciseData>(EXERCISE, {
    variables: {id: exerciseId},
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const styles = StyleSheet.create({
    subHeaderText: {
      textAlign: 'center',
    },
    divider: {
      padding: 10,
      backgroundColor: colors.background,
    },
  });

  return (
    <PageLayout loading={loading}>
      <Text style={styles.subHeaderText}>{data?.exercise.desc}</Text>
      <Divider style={styles.divider} />
      {data?.exercise ? (
        <>
          <Button title="Edit" onPress={() => setIsFormVisible(true)} />
          <EditExercise
            exercise={data.exercise}
            isFormVisible={isFormVisible}
            setIsFormVisible={setIsFormVisible}
          />
        </>
      ) : (
        <></>
      )}
    </PageLayout>
  );
};

export default ExerciseScreen;
