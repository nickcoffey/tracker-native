import React from 'react';
import {Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const CurrentWorkoutScreen = () => {
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
    },
  });

  return (
    <Text style={styles.header} h3>
      Current Workout
    </Text>
  );
};

export default CurrentWorkoutScreen;
