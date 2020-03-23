import React from 'react';
import PageLayout from '../layouts/PageLayout';
import {Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const CurrentWorkout = () => {
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
    },
  });

  return (
    <PageLayout>
      <Text style={styles.header} h3>
        Current Workout
      </Text>
    </PageLayout>
  );
};

export default CurrentWorkout;
