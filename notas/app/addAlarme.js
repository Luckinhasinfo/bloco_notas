import { StyleSheet, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddAlarme() {
    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const editando = params.id !== undefined;

    const [textoAlarme, setTextoAlarme] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');

    useEffect(() => {
        if (editando) {
            setTextoAlarme(params.texto || "");
            setData(params.data || "");
            setHora(params.hora || "");
        }
    }, [editando]);

    async function apertouBotao() {
        if (!textoAlarme.trim() || !data.trim() || !hora.trim()) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }
        if (textoAlarme.length > 500) {
            Alert.alert("Erro", "O texto do alarme não pode exceder 500 caracteres.");
            return;
        }
        if (hora.length > 4) {
            Alert.alert("Erro", "A hora do alarme não pode exceder 4 caracteres.");
            return;
        }

        const alarmesJson = await AsyncStorage.getItem('alarmes');
        let alarmes = alarmesJson ? JSON.parse(alarmesJson) : [];

        if (editando) {
            const index = alarmes.findIndex(a => a.id === Number(params.id));
            if (index !== -1) {
                alarmes[index].texto = textoAlarme.trim();
                alarmes[index].data = data.trim();
                alarmes[index].hora = hora.trim();
            }
            await AsyncStorage.setItem('alarmes', JSON.stringify(alarmes));
            router.replace("/alarmes");
            return;
        }

        const usuarioLogadoJson = await AsyncStorage.getItem('usuario_logado');
        const usuarioLogado = usuarioLogadoJson ? JSON.parse(usuarioLogadoJson) : null;

        const maiorId = alarmes.length > 0 ? Math.max(...alarmes.map(a => a.id)) : 0;
        const novoId = maiorId + 1;

        const novoAlarme = {
            id: novoId,
            estado: 'ligado',
            texto: textoAlarme.trim(),
            data: data.trim(),
            hora: hora.trim(),
            usuarioLogado: usuarioLogado.email,
        };

        alarmes.push(novoAlarme);
        await AsyncStorage.setItem('alarmes', JSON.stringify(alarmes));
        router.replace("/alarmes");
    }

    const handleBackPress = () => navigation.goBack();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.fundo}>
               <View style={styles.barra_sup}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBackPress} activeOpacity={0.7}>
                         <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.titulo}>Adicionar Alarme</Text>
               </View>

                <View style={styles.inputsContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do alarme"
                        value={textoAlarme}
                        onChangeText={setTextoAlarme}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Data (DD/MM/YYYY)"
                        value={data}
                        onChangeText={setData}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Hora (HH:mm)"
                        value={hora}
                        onChangeText={setHora}
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity onPress={apertouBotao} activeOpacity={0.8}>
                    <View style={styles.floatingButton}>
                        <MaterialCommunityIcons name="content-save" size={28} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: "#a9c7d4",
    },
    backButton: {
        position: 'absolute',
        left: 16,
        bottom: 16,
        padding: 8,
        zIndex: 1,
    },
    inputsContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    input: {
        backgroundColor: "#fff",
        marginVertical: 10,
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        color: "#2c3e50",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3f516e',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#fff',
    },
    barra_sup: {
    width: "100%",
    height: 140,           // mais altura para dar espaço ao título
    paddingTop: 50,
    backgroundColor: "#3f516e",
    justifyContent: "center",
    alignItems: "center",  // centraliza o título
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
titulo: {
    fontSize: 25,             // maior que antes
    fontWeight: 'bold',
    color: '#fff',            // branco para contrastar
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
},

});
