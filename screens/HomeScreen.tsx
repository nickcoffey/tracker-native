import React from 'react';
import PageLayout from '../layouts/PageLayout';
import {Text, Button, Divider} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {NavigationProps} from '../App';
import {useTheme} from '@react-navigation/native';

const HomeScreen = ({navigation}: NavigationProps) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
    },
    divider: {
      padding: 10,
      backgroundColor: colors.background,
    },
  });

  return (
    <PageLayout loading={false}>
      <Text style={styles.header} h3>
        Home
      </Text>
      <Divider style={styles.divider} />
      <Button
        title="Go to Current Workout"
        onPress={() => navigation.navigate('Current')}
      />
      <Divider style={styles.divider} />
      <Button
        title="Go to Past Workouts"
        onPress={() => navigation.navigate('Past')}
      />
      <Divider style={styles.divider} />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </PageLayout>
  );
};

export default HomeScreen;
