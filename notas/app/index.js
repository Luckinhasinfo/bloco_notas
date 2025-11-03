import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import Nota from "../Componentes/nota";


const [notas, setNotas] = useState([
    {
        id: 1,
        texto: 'Minha primeira nota'
    },
    {
        id: 2,
        texto: 'Minha segunda nota'
    }
]);

    <View style={styles.container}>
        <View>
          <Button title="Novo Contato" onPress={()=>{
            router.navigate('novo')
          }}/>
        </View>
        <FlatList
          data={notas}
          renderItem={({ item }) => <Nota nota={item} key={item.id} />}
          keyExtractor={item => item.id.toString()}
        />
    </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
