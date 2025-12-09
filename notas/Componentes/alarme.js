import { View, Text, StyleSheet } from 'react-native';
import Alarme_desligado_icon from '../assets/alarme_desligado_icon.svg';
import Alarme_ligado_icon from '../assets/alarme_ligado_icon.svg';

const Alarme = ({ alarme }) => {
     let img = '';
     if (alarme.estado==='ligado') {
          img = <Alarme_ligado_icon />;
     }
     else {
          img = <Alarme_desligado_icon />;
     }


    return (
        <View style={styles.alarme_sty}>
            {img}
            <View style={styles.conteudo_alarme}>
                <Text 
                    style={styles.texto_alarme} 
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                >
                    {alarme.texto}
                </Text>
                <Text 
                    style={styles.texto_alarme} 
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                >
                    {alarme.hora} - {alarme.data}
                </Text>
            </View>
        </View>
    );
}; 

const styles = StyleSheet.create({
    alarme_sty: {   
          width: 160,
          height: 110,
          backgroundColor: '#ffffff',
          borderRadius: 5,
          margin: 5,
          opacity: 0.8,
          padding: 7,
          flexDirection: 'column',
          elevation: 6,
    },

    texto_alarme: {
        fontStyle: 'italic',
        fontWeight: 'bold',
    },

    conteudo_alarme: {
        flexDirection: 'column',
    }
});

export default Alarme;
