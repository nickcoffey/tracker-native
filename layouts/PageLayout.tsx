import React, {useContext} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import {Text} from 'react-native-elements';

type PageLayoutProps = {
  children?: JSX.Element | JSX.Element[];
};

const PageLayout = ({children}: PageLayoutProps) => {
  const theme = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: theme.primary,
      paddingTop: 30,
    },
    headerText: {
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.white,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText} h2>
          Tracker
        </Text>
      </View>
      <SafeAreaView>{children}</SafeAreaView>
    </View>
  );
};

export default PageLayout;
