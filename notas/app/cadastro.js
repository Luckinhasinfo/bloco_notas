import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";   
import PasswordInput from "../Componentes/PasswordInput"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cadastro = () => {
    const router = useRouter();

     const [nome, setNome] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
    
     async function apertouBotao() {
          if (!nome.trim()) {
             Alert.alert("Erro", "Preencha o campo \"Nome\" corretamente!");
             return;
          }
          if (!email.trim()) {
             Alert.alert("Erro", "Preencha o campo \"E-mail\" corretamente!");
             return;
          }
          if (!email.includes('@')) {
             Alert.alert("Erro", "Preencha o campo \"E-mail\" com um email válido!");
             return;
          }
          if (!password.trim()) {
             Alert.alert("Erro", "Preencha o campo \"Senha\" corretamente!");
             return;
          }
         
         
         const user = {
               nome: nome,
               email: email,
               password: password,
               senha_secreta: ''
          };
         
         try {
               const usuariosJson = await AsyncStorage.getItem('usuarios');
               let usuarios = usuariosJson ? JSON.parse(usuariosJson) : [];
               
               const emailExistente = usuarios.some(u => u.email == email);
               
               if (emailExistente == true) {
                    Alert.alert("Erro", "Este email já está cadastrado!");
                    return;
               }
               
               usuarios.push(user);
               
               await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
               await AsyncStorage.setItem('usuario_logado', JSON.stringify(user));
               router.push("/notas");
          } catch (error) {
               Alert.alert("Erro", "Falha ao salvar usuário!");
               console.error(error);
          }
     }


     return (
    <View style={styles.app}>
        <View style={styles.container}>
            <Text style={styles.title}>Cadastre-se</Text>

            <TextInput 
               style={styles.input}
               placeholder="Nome" 
               value={nome}
               onChangeText={setNome}/>

            <TextInput 
               style={styles.input} 
               placeholder="E-mail" 
               keyboardType="email-address"
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

                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { router.push("/")}} style={styles.link}>
                <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
        </View>
    </View>
);
};

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


  export default Cadastro;