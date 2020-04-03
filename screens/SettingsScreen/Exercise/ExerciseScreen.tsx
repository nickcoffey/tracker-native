import React, {useState} from 'react';
import PageLayout from '../../../layouts/PageLayout';
import {Text, Button, Divider} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import {SettingsStackParamList} from '../SettingsNavigator';
import {EXERCISE, ExerciseData} from '../../../graphql/ExerciseGQL';
import {useQuery} from '@apollo/react-hooks';
import EditExercise from './EditExercise';
import {StackNavigationProp} from '@react-navigation/stack';

type ExerciseScreenRouteProp = RouteProp<SettingsStackParamList, 'Exercise'>;

type ExerciseProps = {
  navigation: StackNavigationProp<SettingsStackParamList>;
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
    <PageLayout loading={loading} refetch={refetch}>
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
