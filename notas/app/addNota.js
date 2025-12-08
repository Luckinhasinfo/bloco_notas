import { StyleSheet, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddNota() {
     const navigation = useNavigation();

     const handleBackPress = () => {
          navigation.goBack();
     };

     return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <View style={styles.fundo}>
                    <View style={styles.barra_sup}>
                         <TouchableOpacity
                              style={styles.backButton}
                              onPress={handleBackPress}
                              activeOpacity={0.7}
                         >
                              <MaterialCommunityIcons
                                   name="arrow-left"
                                   size={24}
                                   color="#ffffff"
                              />
                         </TouchableOpacity>

                         <TextInput
                              style={styles.titulo}
                              defaultValue="Sem Nome"
                              placeholder="Digite o título..."
                              placeholderTextColor="rgba(255, 255, 255, 0.8)"
                         />
                    </View>

                    <TextInput
                         style={styles.textoNota}
                         multiline={true}
                         textAlignVertical="top"
                         placeholder="Digite sua anotação aqui..."
                         placeholderTextColor="rgba(63, 81, 110, 0.7)"
                         autoFocus={true}
                    />
               </View>
          </TouchableWithoutFeedback>
     );
}

const styles = StyleSheet.create({
     fundo: {
          flex: 1,
          backgroundColor: "#a9c7d4",
     },
     barra_sup: {
          width: "100%",
          height: 130,
          paddingTop: 40,
          backgroundColor: "#3f516e",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          justifyContent: "center",
     },
     backButton: {
          position: 'absolute',
          left: 16,
          bottom: 16,
          padding: 8,
          zIndex: 1,
     },
     titulo: {
          flex: 1,
          color: "#ffffff",
          fontSize: 20,
          fontWeight: "600",
          textAlign: "center",
          marginLeft: 40,
          marginRight: 10,
          paddingVertical: 8,
     },
     textoNota: {
          flex: 1,
          fontSize: 18,
          color: "#2c3e50",
          padding: 20,
          paddingTop: 25,
          backgroundColor: "transparent",
     },
});