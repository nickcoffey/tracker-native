import React, {useState} from 'react'
import {TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native'
import DropdownItem, {Item} from './DropdownItem'

type DropdownProps<T> = {
  items: Item<T>[]
  selectedItem: T | undefined
  setSelectedItem: React.Dispatch<React.SetStateAction<T | undefined>>
}

const styles = StyleSheet.create({
  dropdown: {
    maxHeight: 100
  },
  btn: {
    textAlign: 'center',
    fontSize: 35,
    backgroundColor: 'lightblue'
  }
})

const Dropdown = ({items, selectedItem, setSelectedItem}: DropdownProps<any>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const selectItem = (index: number) => {
    setSelectedIndex(index)
    setSelectedItem(items[index].value)
  }

  const handlePress = () => setIsOpen(!isOpen)

  return (
    <>
      <Text>{!isOpen && selectedItem}</Text>
      <ScrollView style={styles.dropdown} showsVerticalScrollIndicator={false}>
        {isOpen &&
          items.map((item, index) => (
            <DropdownItem item={item} key={index} index={index} selectedIndex={selectedIndex} selectItem={selectItem} />
          ))}
      </ScrollView>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.btn}>Toggle</Text>
      </TouchableOpacity>
    </>
  )
}

export default Dropdown
