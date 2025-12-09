import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Alarme_desligado_icon from '../assets/alarme_desligado_icon.svg';
import Alarme_ligado_icon from '../assets/alarme_ligado_icon.svg';

const Alarme = ({ alarme }) => {
    // estado para controlar se o alarme está ligado ou desligado
    const [ligado, setLigado] = useState(alarme.estado === 'ligado');

    // função para alternar o estado
    const mudaAlarme = () => {
        setLigado(!ligado);
    };

    return (
        <View style={styles.alarme_sty}>
            <TouchableOpacity onPress={mudaAlarme} style={{ marginBottom: 5 }}>
                {ligado ? <Alarme_ligado_icon /> : <Alarme_desligado_icon />}
            </TouchableOpacity>
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
