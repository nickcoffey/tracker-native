import React, {useState} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CurrentWorkout from './pages/CurrentWorkout';
import PastWorkouts from './pages/PastWorkouts';
import Settings from './pages/Settings/Settings';
import ThemeContext, {theme} from './contexts/ThemeContext';

const App = () => {
  const [pages, setPages] = useState([
    {
      isVisible: true,
      content: <Home />,
      icon: 'home',
      title: 'Home',
    },
    {
      isVisible: false,
      content: <CurrentWorkout />,
      icon: 'fitness-center',
      title: 'Current',
    },
    {
      isVisible: false,
      content: <PastWorkouts />,
      icon: 'list',
      title: 'Past',
    },
    {
      isVisible: false,
      content: <Settings />,
      icon: 'settings',
      title: 'Settings',
    },
  ]);

  const handleNavPress = (index: number) => {
    setPages(
      pages.map((page, i) => ({
        ...page,
        isVisible: i === index ? true : false,
      })),
    );
  };

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {pages.map((page, index) => {
          return (
            page.isVisible && (
              <React.Fragment key={index}>{page.content}</React.Fragment>
            )
          );
        })}
      </View>
      <Navbar
        navItems={pages.map(item => ({icon: item.icon, title: item.title}))}
        onNavPress={handleNavPress}
      />
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: theme.white,
  },
});

export default App;
