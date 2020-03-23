import React from 'react';
import PageLayout from '../layouts/PageLayout';
import {Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const Home = () => {
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
    },
  });

  return (
    <PageLayout>
      <Text style={styles.header} h3>
        Home
      </Text>
    </PageLayout>
  );
};

export default Home;
