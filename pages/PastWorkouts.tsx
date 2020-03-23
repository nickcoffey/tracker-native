import React from 'react';
import PageLayout from '../layouts/PageLayout';
import {Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const PastWorkouts = () => {
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
    },
  });

  return (
    <PageLayout>
      <Text style={styles.header} h3>
        Past Workouts
      </Text>
    </PageLayout>
  );
};

export default PastWorkouts;
