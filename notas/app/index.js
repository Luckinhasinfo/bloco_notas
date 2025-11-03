import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import Nota from "../Componentes/nota";
import { useState } from "react";

export default function notas_gerar() {
    const [notas_array, setNotas] = useState([
        {
            id: 1,
            texto: 'Minha primeira nota'
        },
        {
            id: 2,
            texto: 'Minha segunda nota'
        }
    ]);

    return (
        <View style={styles.container}>
            <FlatList
                data={notas_array}
                renderItem={({ item }) => <Nota nota={item} key={item.id} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
});
