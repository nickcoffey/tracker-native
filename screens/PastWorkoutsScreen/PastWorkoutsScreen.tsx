import React from 'react';
import {Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const PastWorkoutsScreen = () => {
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
    },
  });

  return (
    <Text style={styles.header} h4>
      Past Workouts
    </Text>
  );
};

export default PastWorkoutsScreen;
