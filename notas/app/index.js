import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";   
import AsyncStorage from "@react-native-async-storage/async-storage";
import PasswordInput from "../Componentes/PasswordInput"; 




const Login = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');


          async function apertouBotao() {   
          try {
               const usuariosJson = await AsyncStorage.getItem('usuarios');
               let usuarios = usuariosJson ? JSON.parse(usuariosJson) : [];
               
               const emailCerto = usuarios.some(u => u.email == email);
               const passwordCerto = usuarios.some(u => u.password == password);
               
               
               if (!emailCerto) {
                    Alert.alert("Erro", "Usuário ou senha não encontrados!");
                    return;
               }

               if (!passwordCerto) {
                    Alert.alert("Erro", "Usuário ou senha não encontrados!");
                    return;
               }
               const user = usuarios.find(u => u.email == email);
         
               await AsyncStorage.setItem('usuario_logado', JSON.stringify(user));

               router.push("/notas");
          } catch (error) {
               Alert.alert("Erro", "Falha ao salvar usuário!");
               console.error(error);
          }
     }



     const router = useRouter();
     return (
     <View style={styles.app}>
          <View style={styles.container}>
               <Text style={styles.title}>Faça seu login</Text>

               <TextInput style={styles.input} 
               placeholder="E-mail" 
               value={email}
               onChangeText={setEmail}/>

               <PasswordInput
               placeholder="Senha"
               value={password}
               onChangeText={setPassword}/>

               <TouchableOpacity
               style={styles.button}
               onPress={apertouBotao}
               >
               <Text style={styles.buttonText}>Login</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={() => {
                    router.push("/cadastro")}}
                    style={styles.link}>

               <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
               </TouchableOpacity>
          </View>
     </View>
  );
}
  
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#9EC0CA",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#B9CED5",
  },
  button: {
    backgroundColor: "#222",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    color: "#778ebdff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  card: {
    backgroundColor: "#B9CED5",
    padding: 12,
    borderRadius: 8,
    width: "45%",
    margin: 5,
  },
});

export default Login;