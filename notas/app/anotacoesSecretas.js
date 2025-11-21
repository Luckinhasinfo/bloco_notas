import { StyleSheet, Text, View, FlatList } from "react-native";
import Nota from "../Componentes/nota";
import Add_nota_bot from "../Componentes/add_nota_bot";
import Alarme_bot from "../Componentes/alarme_bot";
import { useState } from "react";
import { useRouter } from 'expo-router';
import Fileplus from "../assets/file-plus.svg";
import Vector from "../assets/Vector.svg";
import Seta from "../assets/seta.svg"

export default function notas_gerar() {
     const router = useRouter();
    const [notas_array, setNotas] = useState([
        {
            id: 1,
            texto: ''
        },
        {
            id: 2,
            texto: ''
        },
        {
            id: 3,
            texto: ''
        },
          {
            id: 4,
            texto: ''
        },
          {
            id: 5,
            texto: ''
        },
          {
            id: 6,
            texto: ''
        }

    ]);
  
    return (
     <View style={styles.fundo}>

          <View style={styles.barra_sup}>
            <Seta width={50} height={50} />
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
           
              <Fileplus width={50} height={50} />
              <Vector width={50} height={50} />
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
          flexDirection:"row",
           alignItems:"center",
           justifyContent:"center",
        
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
