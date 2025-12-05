import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AlarmeBotao = ({ onPress, iconName = "alarm" }) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons 
        name={iconName} 
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

export default AlarmeBotao;