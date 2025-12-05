import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddPastaBotao = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons 
        name="folder-plus-outline" 
        size={32} 
        color="#fff" 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});

export default AddPastaBotao;