import React from 'react';
import {Text, Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {NavigationProps} from '../App';

const HomeScreen = ({navigation}: NavigationProps) => {
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
    },
    btn: {
      width: 50,
    },
  });

  return (
    <>
      <Text style={styles.header} h3>
        Home
      </Text>
      <Button
        title="Go to Current Workout"
        onPress={() => navigation.navigate('Current')}
      />
      <Button
        title="Go to Past Workouts"
        onPress={() => navigation.navigate('Past')}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </>
  );
};

export default HomeScreen;
