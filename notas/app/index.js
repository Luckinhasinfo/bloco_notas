import { StyleSheet, Text, View, FlatList } from "react-native";
import Nota from "../Componentes/nota";
import Add_nota_bot from "../Componentes/add_nota_bot";
import Alarme_bot from "../Componentes/alarme_bot";
import { useState } from "react";
import { useRouter } from 'expo-router';

export default function notas_gerar() {
     const router = useRouter();
    const [notas_array, setNotas] = useState([
        {
            id: 1,
            texto: 'Minha primeira nota'
        },
        {
            id: 2,
            texto: 'Minha segunda nota'
        },
        {
            id: 3,
            texto: 'Minha terceira nota'
        }
    ]);
  
    return (
     <View style={styles.fundo}>

          <View style={styles.barra_sup}>
               <Text style={styles.texto_barra_sup}>Anotações</Text>
          </View>

         <View style={styles.fundo_notas}>
               <View style={styles.fundo_notas}>
               <FlatList
                    data={notas_array}
                    renderItem={({ item }) => <Nota nota={item} />}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
               />
          </View>
          </View>

          <View style={styles.barra_inf}>
               <Add_nota_bot onPress={() => router.push('/anotacoesSecretas')}>

               </Add_nota_bot>
               <Alarme_bot></Alarme_bot>
          </View>
     </View>
    );
}

const styles = StyleSheet.create({
     //BACK
    fundo:{
          flex: 1,
          backgroundColor: "#a9c7d4",
          justifyContent: "center",
          alignItems: "center",
    },
    //BACK
    //BARRA SUPERIOR
     barra_sup: {
          width: "100%",
          height: "10%",
          backgroundColor: "#3f516e",
          justifyContent: "center",
          alignItems: "center",
     },
     texto_barra_sup: {
          color: "#ffffff",
          fontSize: 30,
          fontWeight: "bold",
     },
     //BARRA SUPERIOR
     //NOTAS
     fundo_notas: {
          flex: 1,
          alignItems: "center",
          paddingTop: 24,
     },
     //NOTAS
     //BARRA INFERIOR
     barra_inf: {
          width: "100%",
          height: "10%",
          backgroundColor: "#3f516e",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 100,
     },
     //BARRA INFERIOR
});
