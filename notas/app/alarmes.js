import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import Alarme from "../Componentes/alarme";
import Add_alarme_bot from "../Componentes/add_alarme_bot";
import { useState } from "react";

export default function notas_gerar() {
    const [alarmes_array, setAlarme] = useState([
        {
            id: 1,
            estado: 'ligado',
            texto: 'Meu primeiro alarme',
            data: '16/08/2025',
            hora: '06:30',
        },
        {
            id: 2,
            estado: 'ligado',
            texto: 'Meu segundo alarme',
            data: '16/08/2025',
            hora: '08:00',
        },
        {
            id: 3,
            estado: 'desligado',
            texto: 'Meu terceiro alarme',
            data: '16/08/2025',
            hora: '12:30',
        }
    ]);

    return (
     <View style={styles.fundo}>

          <View style={styles.barra_sup}>
               <Text style={styles.texto_barra_sup}>Tarefas</Text>
          </View>

          <View style={styles.fundo_notas}>
               <FlatList
                    data={alarmes_array}
                    renderItem={({ item }) => <Alarme alarme={item} />}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
               />
          </View>

          <View style={styles.barra_inf}>
               <Add_alarme_bot></Add_alarme_bot>
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
