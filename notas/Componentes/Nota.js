import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Nota = ({ 
  nota, 
  onPress, 
  onLongPress,
  isSelected = false,
  showCheckbox = false,
  showDeleteButton = false,     
  onDeletePress, 
  containerStyle,
  textStyle,
  longPressDelay = 500,
}) => {
  const [scale] = useState(new Animated.Value(1));
  const [isLongPressing, setIsLongPressing] = useState(false);

  const handlePress = () => {
    if (!isLongPressing) {
      onPress?.(nota);
    }
    setIsLongPressing(false);
  };

  const handleLongPress = () => {
    if (!showCheckbox) {
      setIsLongPressing(true);
      onLongPress?.(nota);
    }
  };

  const handleDeletePress = () => {
    onDeletePress?.(nota);
  };

  const handlePressIn = () => {
    if (!showCheckbox) {
      Animated.spring(scale, {
        toValue: 0.98,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!isLongPressing) {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.outerContainer}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          style={[
            styles.container,
            containerStyle,
            isLongPressing && styles.longPressActive,
            isSelected && styles.selected,
            showDeleteButton && styles.deleteButtonVisible,
          ]}
          onPress={handlePress}
          onLongPress={handleLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          delayLongPress={longPressDelay}
          activeOpacity={0.7}
        >
          {showCheckbox && (
            <View style={styles.checkboxContainer}>
              <View style={[
                styles.checkbox,
                isSelected && styles.checkboxSelected
              ]}>
                {isSelected && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
            </View>
          )}
          
          <View style={styles.content}>
            <Text 
              style={[styles.text, textStyle]}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {nota.texto}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {showDeleteButton && (
        <TouchableOpacity
          style={styles.deleteButtonContainer}
          onPress={handleDeletePress}
          activeOpacity={0.8}
        >
          <View style={styles.deleteButton}>
            <Ionicons name="trash" size={20} color="#ff4444" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'relative',
    margin: 8,
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
    zIndex: 1,
  },
  longPressActive: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selected: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  deleteButtonVisible: {
    zIndex: 2,
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  checkboxContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  deleteButtonContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 4,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#ff4444',
  },
});

export default Nota;