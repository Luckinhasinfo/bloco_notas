import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PasswordInput = ({ 
  placeholder = "Senha", 
  value,
  onChangeText,
  style,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#666"
          {...props}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconContainer}
        >
          <MaterialIcons
            name={showPassword ? "visibility-off" : "visibility"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    width: "100%",
    padding: 10,
    paddingRight: 45,
    borderRadius: 8,
    backgroundColor: "#B9CED5",
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 34, 
  },
});

export default PasswordInput;