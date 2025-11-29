import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";


const Cadastro = () => {
    const router = useRouter();
     return (
    <View style={styles.app}>
        <View style={styles.container}>
            <Text style={styles.title}>Cadastre-se</Text>

            <TextInput style={styles.input} placeholder="Nome" />
            <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    router.push("/notas");
                }}
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