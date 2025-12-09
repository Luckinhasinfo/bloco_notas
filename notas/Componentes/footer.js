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
        style={styles.footerButton}
        onPress={() => router.push('/addNota')}
        activeOpacity={0.7}
      >
        <MaterialIcons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/addPasta')}
        activeOpacity={0.7}
      >
        <MaterialIcons name="create-new-folder" size={28} color="#ffffff" />
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
});