import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Faça seu login</Text>

      <TextInput style={styles.input} placeholder="Usuário" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert("Login realizado!");
          setTela("anotacoes");
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setTela("cadastro")} style={styles.link}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );

  
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