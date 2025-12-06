import { TouchableOpacity,} from 'react-native';
import { StyleSheet, Text, View} from "react-native";


const Dia_bot = () => {

    return (
        <View style={styles.dias}>
               {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((dia, index) => (
               <TouchableOpacity key={index} style={styles.botaoDia} onPress={() =>{}}>
                    <Text style={styles.texto_dia}>{dia}</Text>
                    <Text style={styles.texto_dia}>{index + 1}</Text>
               </TouchableOpacity>
))}
          </View>
    );
}; 


const styles = StyleSheet.create({
   dias: {
     width: "100%",
     height: "10%",
     flexDirection: "row",       
     justifyContent: "space-around",   
     alignItems: "center",
},

     botaoDia: {
          backgroundColor: "#ffffff02",
          borderBlockColor: "#000000ff",
          justifyContent: "center",
          alignItems: "center",
          width: 45,
          height: 40,
          borderWidth: 2,
          borderColor: "#000000ff",
     },

     texto_dia: {
     fontWeight: "bold",
     color: "#000000ff",
     },

});

export default Dia_bot;

