import React, {useState, useCallback, useEffect} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {ApolloQueryResult} from 'apollo-boost';

type PageLayoutProps = {
  loading: boolean;
  children?: JSX.Element | JSX.Element[];
  refetch?: (
    variables?: Record<string, any> | undefined,
  ) => Promise<ApolloQueryResult<any>>;
};

const PageLayout = ({loading, children, refetch}: PageLayoutProps) => {
  const [refreshing, setRefreshing] = useState(loading);
  const onRefresh = useCallback(() => {
    if (refetch) {
      // if refreshable
      setRefreshing(true);
      refetch().then(() => setRefreshing(false));
    }
  }, [refreshing]);

  useEffect(() => {
    setRefreshing(loading);
  }, [loading]);

  return (
    <ScrollView
      refreshControl={
        refetch && (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        )
      }>
      {!refreshing && children}
    </ScrollView>
  );
};

export default PageLayout;
