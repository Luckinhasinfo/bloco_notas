import { StyleSheet, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
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

    const [nomeAlarme, setNomeAlarme] = useState('');
    const [hora, setHora] = useState('');
    const [data, setData] = useState(''); 

    useEffect(() => {
        if (editando) {
            setNomeAlarme(params.nome || "");
            setHora(params.hora || "");
            setData(params.data || "");
        }
    }, [editando]);

    async function apertouBotao() {
        if (!nomeAlarme.trim()) {
            Alert.alert("Erro", "O campo \"Nome do alarme\" está vazio!");
            return;
        }
        if (!hora.trim()) {
            Alert.alert("Erro", "O campo \"Hora\" está vazio!");
            return;
        }
        if (!data.trim()) {
            Alert.alert("Erro", "O campo \"Data\" está vazio!");
            return;
        }

        const alarmesJson = await AsyncStorage.getItem('alarmes');
        let alarmes = alarmesJson ? JSON.parse(alarmesJson) : [];

        if (editando) {
            const index = alarmes.findIndex(a => a.id === Number(params.id));
            if (index !== -1) {
                alarmes[index].texto = nomeAlarme.trim();
                alarmes[index].hora = hora.trim();
                alarmes[index].data = data.trim();
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
            texto: nomeAlarme.trim(),
            hora: hora.trim(),
            data: data.trim(),
            usuarioLogado: usuarioLogado.email,
        };

        alarmes.push(novoAlarme);
        await AsyncStorage.setItem('alarmes', JSON.stringify(alarmes));
        router.replace("/alarmes");
    }

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.fundo}>
                <View style={styles.barra_sup}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color="#ffffff"
                        />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.titulo}
                        placeholder="Nome do alarme..."
                        placeholderTextColor="rgba(255, 255, 255, 0.8)"
                        onChangeText={setNomeAlarme}
                        value={nomeAlarme}
                    />
                </View>

                <TextInput
                    style={styles.textoNota}
                    placeholder="Hora (HH:mm)"
                    onChangeText={setHora}
                    value={hora}
                />

                <TextInput
                    style={styles.textoNota}
                    placeholder="Data (DD/MM/YYYY)"
                    onChangeText={setData}
                    value={data}
                />

                <TouchableOpacity onPress={apertouBotao} activeOpacity={0.7}>
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
    barra_sup: {
        width: "100%",
        height: 130,
        paddingTop: 40,
        backgroundColor: "#3f516e",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        justifyContent: "center",
    },
    backButton: {
        position: 'absolute',
        left: 16,
        bottom: 16,
        padding: 8,
        zIndex: 1,
    },
    titulo: {
        flex: 1,
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        marginLeft: 40,
        marginRight: 10,
        paddingVertical: 8,
    },
    textoNota: {
        fontSize: 18,
        color: "#2c3e50",
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3f516e',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#fff',
        zIndex: 1000,
    },
});
