import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

type DropdownItemProps = {
  item: Item<any>;
  index: number;
  selectedIndex: number;
  selectItem: (index: number) => void;
};

const DropdownItem = ({
  item,
  index,
  selectedIndex,
  selectItem,
}: DropdownItemProps) => {
  const styles = StyleSheet.create({
    item: {
      fontSize: 20,
      textAlign: 'center',
    },
    selectedItem: {
      color: 'white',
      backgroundColor: 'blue',
    },
    deselectedItem: {},
  });

  return (
    <TouchableOpacity onPress={() => selectItem(index)}>
      <Text
        style={{
          ...styles.item,
          ...(index === selectedIndex
            ? styles.selectedItem
            : styles.deselectedItem),
        }}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

export type Item<T> = {
  label: string;
  value: T;
};

export default DropdownItem;
