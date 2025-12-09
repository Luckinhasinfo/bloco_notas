import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

export default function Footer({
  onAddNota,
  onAlarme,
  onAddPasta
}) {
     const router = useRouter();
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/addNota')}
        activeOpacity={0.7}
      >
        <MaterialIcons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 60,
    backgroundColor: '#3f516e',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerButton: {
    padding: 10,
    borderRadius: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3f516e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
});