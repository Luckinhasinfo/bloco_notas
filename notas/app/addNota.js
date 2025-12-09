import { StyleSheet, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddNota() {
     const navigation = useNavigation();
     const router = useRouter();
     const params = useLocalSearchParams();

   
     const editando = params.id !== undefined;

     const [nomeNota, setNomeNota] = useState('');
     const [notaTxt, setNotaTxt] = useState('');

 
     useEffect(() => {
          if (editando) {
               setNomeNota(params.nome || "");
               setNotaTxt(params.texto || "");
          }
     }, [editando]);

     async function apertouBotao() {

          if (!nomeNota.trim()) {
               Alert.alert("Erro", "O campo \"Nome da nota\" está vazio!");
               return;
          }
          if (!notaTxt.trim()) {
               Alert.alert("Erro", "O campo \"Nota\" está vazio!");
               return;
          }

          const usuarioLogadoJson = await AsyncStorage.getItem('usuario_logado');
          const usuarioLogado = usuarioLogadoJson ? JSON.parse(usuarioLogadoJson) : null;


        
          const notasJson = await AsyncStorage.getItem('notas');
          let notas = notasJson ? JSON.parse(notasJson) : [];

       
          if (editando) {
               const index = notas.findIndex(n => n.id === Number(params.id));


               if (index !== -1) {
                    notas[index].nomeNota = nomeNota.trim();
                    notas[index].textoNota = notaTxt.trim();
               }

               await AsyncStorage.setItem('notas', JSON.stringify(notas));

               router.replace("/notas");
               return;
          }

          const maiorId = notas.length > 0 ? Math.max(...notas.map(n => n.id)) : 0;
          const novoId = maiorId + 1;


          const novaNota = {
               id: novoId,
               nomeNota: nomeNota.trim(),
               textoNota: notaTxt.trim(),
               usuarioLogado: usuarioLogado.email,
               pastaDentro: null
          };

          notas.push(novaNota);
          await AsyncStorage.setItem('notas', JSON.stringify(notas));

          router.replace("/notas");
     }

     const handleBackPress = () => {
          navigation.goBack();
     };

     return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                              placeholder="Digite o título..."
                              placeholderTextColor="rgba(255, 255, 255, 0.8)"
                              onChangeText={setNomeNota}
                              value={nomeNota}
                         />
                    </View>

                    <TextInput
                         style={styles.textoNota}
                         multiline={true}
                         textAlignVertical="top"
                         placeholder="Digite sua anotação aqui..."
                         placeholderTextColor="rgba(63, 81, 110, 0.7)"
                         onChangeText={setNotaTxt}
                         value={notaTxt}
                    />

                    <TouchableOpacity onPress={apertouBotao} activeOpacity={0.7}>
                         <View style={styles.floatingButton}>
                              <MaterialCommunityIcons name="content-save" size={28} color="#fff" />
                         </View>
                    </TouchableOpacity>
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
          zIndex: 1000,
     },
});
