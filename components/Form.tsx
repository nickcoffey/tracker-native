import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import {Input, Button, Text, Divider} from 'react-native-elements';

export type InputType = {
  label: string;
  placeholder: string;
  key: string;
  value: string;
};

type FormProps = {
  inputs: InputType[];
  title: string;
  handleChange: (key: string, value: string) => void;
  handleSubmit: () => void;
};

const Form = ({inputs, title, handleChange, handleSubmit}: FormProps) => {
  const theme = useContext(ThemeContext);

  const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
    },
    divider: {
      padding: 10,
      backgroundColor: theme.white,
    },
  });

  return (
    <>
      <Text style={styles.title} h4>
        {title}
      </Text>
      {inputs.map((input, index) => (
        <React.Fragment key={index}>
          <Text>{input.label}</Text>
          <Input
            placeholder={input.placeholder}
            value={input.value}
            onChangeText={text => handleChange(input.key, text)}
          />
        </React.Fragment>
      ))}
      <Divider style={styles.divider} />
      <Button title="Submit" onPress={handleSubmit} />
    </>
  );
};

export default Form;
