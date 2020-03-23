import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import ThemeContext from '../contexts/ThemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type NavigationProp = StackNavigationProp<RootStackParamList>;

type NavbarProps = {
  navigation: NavigationProp;
};

type NavItem = {
  icon: string;
  title: 'Home' | 'Current' | 'Past' | 'Settings';
};

const Navbar = ({navigation}: NavbarProps) => {
  const theme = useContext(ThemeContext);
  const navItems: NavItem[] = [
    {
      icon: 'home',
      title: 'Home',
    },
    {
      icon: 'fitness-center',
      title: 'Current',
    },
    {
      icon: 'list',
      title: 'Past',
    },
    {
      icon: 'settings',
      title: 'Settings',
    },
  ];

  const styles = StyleSheet.create({
    nav: {
      flex: 0.075,
      flexDirection: 'row',
      backgroundColor: theme.white,
    },
    navItem: {
      flex: 1,
      paddingTop: 4,
    },
    navItemLeftBorder: {
      borderLeftWidth: 1,
    },
    navItemText: {
      textAlign: 'center',
      color: theme.black,
    },
  });

  return (
    <View style={styles.nav}>
      {navItems.map((navItem, index) => (
        <TouchableOpacity
          style={[styles.navItem]}
          onPress={() => navigation.navigate(navItem.title)}
          key={index}>
          <Icon name={navItem.icon} type="material" color={theme.black} />
          <Text style={styles.navItemText}>{navItem.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Navbar;
