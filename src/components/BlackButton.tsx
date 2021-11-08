import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const BlackButton = ({title, onPress, style = {}}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        ...(style as any),
        ...styles.blackButton,
      }}>
      <Text style={{...styles.buttonText}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    height: 45,
    width: 200,
    backgroundColor: '#0FA900',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BlackButton;
