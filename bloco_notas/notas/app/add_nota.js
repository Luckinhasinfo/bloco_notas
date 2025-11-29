import { StyleSheet, Text, View, FlatList, im } from "react-native";
import Done from "../assets/Done.svg";
import Close from "../assets/Close.svg";
import Sum from "../assets/Sum.svg";


export default function add_nota() {
     return (
          <View style={styles.fundo}>

               <View style={styles.barra_sup}>
                    <Text style={styles.texto_barra_sup}>Anotações</Text>
               </View>

               <View style={styles.fundo_notas}>
                    <View style={styles.nota}>
                        <Text style={styles.texto_nota}>Escreva sua nota aqui...</Text>
                    </View>
                    <View style={styles.nota}>
                         <Text style={styles.texto_nota}>Escreva sua nota aqui...</Text>
                    </View>

               </View>
               <View style={styles.barra_inf}>
                    
                    <Done width={50} height={50} 
                    style={{
                         color: "white"}}/>
                    
                    <Sum width={50} height={50} 
                    style={{
                         color: "white"}}/>
                    
                    <Close width={50} height={50} 
                    style={{
                         color: "red"}}/>
               </View>
          </View>

     );
}


const styles = StyleSheet.create({
     fundo: {
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
     fundo_notas: {
          flex: 1,
          alignItems: "center",
          paddingTop: 24,
     },
     nota: {
          width: "350",
          height: "450",
          backgroundColor: "#ffffff",
          marginTop: 10,
          borderRadius: 20,

     },
     barra_inf: {
          width: "100%",
          height: "10%",
          backgroundColor: "#3f516e",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 80,
     },
     texto_nota: {
          margin: 20,
          fontSize: 18,
          color: "#808080",
     },
});