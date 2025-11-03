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
     <View style={styles.fundo}>

          <View style={styles.barra_sup}>
               <Text>Anotações</Text>
          </View>

          <View style={styles.fundo_notas}>
               <FlatList
                    data={notas_array}
                    renderItem={({ item }) => <Nota nota={item} key={item.id} />}
                    keyExtractor={item => item.id.toString()}
               />
          </View>

     </View>
    );
}

const styles = StyleSheet.create({
    fundo:{
          flex: 1,
          backgroundColor: "#e3e3e3",
          justifyContent: "center",
          alignItems: "center",
    },

     barra_sup: {
          width: "auto",
          height: "20%",
          backgroundColor: "#0000feff",
          justifyContent: "center",
          alignItems: "center",
     },

     fundo_notas: {
          flex: 1,
          alignItems: "center",
          padding: 24,
     },
});
