import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

type PageLayoutProps = {
  children?: JSX.Element | JSX.Element[];
};

const PageLayout = ({children}: PageLayoutProps) => {
  const theme = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: theme.white,
    },
  });

  return <View style={styles.container}>{children}</View>;
};

export default PageLayout;
