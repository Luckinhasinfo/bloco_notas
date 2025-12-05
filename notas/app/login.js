import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from 'expo-router';
import PasswordInput from "../Componentes/PasswordInput";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    router.replace('/(app)');
  };

  return (
    <View style={styles.app}>
      <View style={styles.container}>
        <Text style={styles.title}>Faça seu login</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Usuário" 
        />
        <PasswordInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => router.push('/cadastro')}>
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
});