import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';

type PageLayoutProps = {
  loading: boolean;
  children?: JSX.Element | JSX.Element[];
};

const styles = StyleSheet.create({
  loading: {
    textAlign: 'center',
  },
});

const PageLayout = ({loading, children}: PageLayoutProps) => (
  <React.Fragment>
    {loading ? (
      <Text style={styles.loading} h4>
        Loading...
      </Text>
    ) : (
      children
    )}
  </React.Fragment>
);

export default PageLayout;
