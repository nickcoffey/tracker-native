import React, {useState} from 'react';
import PageLayout from '../../../layouts/PageLayout';
import {Text, Button, Divider} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {EXERCISE, ExerciseData} from '../../../graphql/ExerciseGQL';
import {useQuery} from '@apollo/react-hooks';
import EditExercise from './EditExercise';
import {StackNavigationProp} from '@react-navigation/stack';

type ExerciseScreenRouteProp = RouteProp<RootStackParamList, 'Exercise'>;

type ExerciseProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: ExerciseScreenRouteProp;
};

const ExerciseScreen = ({navigation, route}: ExerciseProps) => {
  const {colors} = useTheme();

  const exerciseId = route.params.id;
  const {data, loading, refetch} = useQuery<ExerciseData>(EXERCISE, {
    variables: {id: exerciseId},
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  navigation.setOptions({
    headerRight: () =>
      data?.exercise ? (
        <Button
          title="Edit"
          type="clear"
          onPress={() => setIsFormVisible(true)}
        />
      ) : (
        <></>
      ),
    title: data?.exercise.name || '',
  });

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
        <EditExercise
          exercise={data.exercise}
          isFormVisible={isFormVisible}
          setIsFormVisible={setIsFormVisible}
          refetch={refetch}
        />
      ) : (
        <></>
      )}
    </PageLayout>
  );
};

export default ExerciseScreen;
