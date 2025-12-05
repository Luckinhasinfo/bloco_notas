import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
} from 'react-native';

const CardAnotacao = ({ 
  nota, 
  onPress, 
  onLongPress,
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
    setIsLongPressing(true);
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
    
    onLongPress?.(nota);
  };

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      friction: 3,
      useNativeDriver: true,
    }).start();
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
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[
          styles.container,
          containerStyle,
          isLongPressing && styles.longPressActive,
        ]}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        delayLongPress={longPressDelay}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <Text 
            style={[styles.text, textStyle]}
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            {nota.texto}
          </Text>
          {onLongPress && (
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>
                {isLongPressing ? 'Solte para opções' : 'Segure para opções'}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    minHeight: 100,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  longPressActive: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  hintContainer: {
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  hintText: {
    fontSize: 10,
    color: '#2196F3',
    fontStyle: 'italic',
  },
});

export default CardAnotacao;