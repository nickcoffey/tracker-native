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

  const handleSelect = () => selectItem(index);

  return (
    <TouchableOpacity onPress={handleSelect}>
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
