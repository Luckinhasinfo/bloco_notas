import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const Pasta = ({ 
  pasta, 
  onPress, 
  onLongPress,
  notaCount = 0,
  isSelected = false,
  showDeleteIcon = false,
}) => {


    const handlePress = () => {
  if (onPress) {
    onPress(pasta);
  } else {
    router.push({
      pathname: '/pastaDetalhes',
      params: {
        pastaId: pasta.id,
        pastaNome: pasta.nome,
        corPasta: pasta.cor,
        notaIds: JSON.stringify(pasta.notaIds)
      }
    });
  }
};
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selected,
      ]}
      onPress={() => onPress?.(pasta)}
      onLongPress={() => onLongPress?.(pasta)}
      activeOpacity={0.8}
      delayLongPress={500}
    >
      <View style={styles.touchArea}>
        <MaterialIcons 
          name="folder" 
          size={120} 
          color="#d1d8e0" 
          style={styles.folderShadow}
        />
        
        <MaterialIcons 
          name="folder" 
          size={115} 
          color="#f8f9fa" 
          style={styles.folderMain}
        />
        
        <View style={styles.folderTab}>
          <Text style={styles.folderName} numberOfLines={1}>
            {pasta.nome}
          </Text>
        </View>
        
        {/* Badges */}
        {notaCount > 0 && (
          <View style={styles.notesBadge}>
            <Text style={styles.notesText}>{notaCount}</Text>
          </View>
        )}
        
        {showDeleteIcon && (
          <View style={styles.deleteBadge}>
            <Ionicons name="trash-outline" size={12} color="#ff4444" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    margin: 8,
    width: 160,
    height: 100,
    position: 'relative',
  },
  selected: {
    transform: [{ scale: 0.98 }],
  },
  touchArea: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderShadow: {
    position: 'absolute',
    top: 3,
    left: 3,
    opacity: 0.3,
  },
  folderMain: {
    position: 'absolute',
    top: 0,
    left: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  folderTab: {
    position: 'absolute',
    top: 20,
    width: 100,
    height: 24,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dee2e6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  folderName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#495057',
    paddingHorizontal: 6,
  },
  notesBadge: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    backgroundColor: '#4dabf7',
    borderRadius: 8,
    width: 24,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  notesText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  deleteBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff4444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default Pasta;