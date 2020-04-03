import React, {useState} from 'react';
import PageLayout from '../../layouts/PageLayout';
import {Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';

import {Item} from '../../components/Dropdown/DropdownItem';
import Dropdown from '../../components/Dropdown/Dropdown';

const HomeScreen = () => {
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
    },
  });

  const [items, setItems] = useState<Item<string>[]>([
    {
      label: 'Item1',
      value: 'Value1',
    },
    {
      label: 'Item2',
      value: 'Value2',
    },
    {
      label: 'Item3',
      value: 'Value3',
    },
    {
      label: 'Item4',
      value: 'Value4',
    },
    {
      label: 'Item5',
      value: 'Value5',
    },
    {
      label: 'Item6',
      value: 'Value6',
    },
    {
      label: 'Item7',
      value: 'Value7',
    },
    {
      label: 'Item8',
      value: 'Value8',
    },
    {
      label: 'Item9',
      value: 'Value9',
    },
    {
      label: 'Item10',
      value: 'Value10',
    },
  ]);
  const [selectedItem, setSelectedItem] = useState<string>();

  return (
    <PageLayout loading={false}>
      <Text style={styles.header} h4>
        Home
      </Text>
      <Dropdown
        items={items}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </PageLayout>
  );
};

export default HomeScreen;
