import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import ThemeContext from '../contexts/ThemeContext';

type NavProps = {
  navItems: NavItem[];
  onNavPress: (index: number) => void;
};

type NavItem = {
  icon: string;
  title: string;
};

const Navbar = ({onNavPress, navItems}: NavProps) => {
  const theme = useContext(ThemeContext);

  const styles = StyleSheet.create({
    nav: {
      flex: 0.075,
      flexDirection: 'row',
      backgroundColor: theme.primary,
    },
    navItem: {
      flex: 1,
      paddingTop: 4,
      borderTopWidth: 1,
      borderColor: theme.black,
    },
    navItemLeftBorder: {
      borderLeftWidth: 1,
    },
    navItemText: {
      textAlign: 'center',
      color: theme.white,
    },
  });

  return (
    <View style={styles.nav}>
      {navItems.map((navItem, index) => (
        <TouchableOpacity
          style={[styles.navItem, index !== 0 && styles.navItemLeftBorder]}
          onPress={() => onNavPress(index)}
          key={index}>
          <Icon name={navItem.icon} type="material" color={theme.white} />
          <Text style={styles.navItemText}>{navItem.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Navbar;
