import { StyleSheet, View, FlatList, Text,  TouchableOpacity, Alert} from "react-native";
import Alarme from "../Componentes/alarme";
import Header from "../Componentes/header_alarmes";
import Footer from "../Componentes/footer_alarmes";
import DiasSelector from "../Componentes/DiasSelector";
import { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AlarmesScreen() {
    const router = useRouter();
    const [alarmes, setAlarmes] = useState([]);

    useEffect(() => {
        async function carregarAlarmes() {
            const alarmesJson = await AsyncStorage.getItem('alarmes');
            const alarmesCarregados = alarmesJson ? JSON.parse(alarmesJson) : [];
            setAlarmes(alarmesCarregados);
        }

        carregarAlarmes();
    }, []);

    const handleAddAlarme = () => {
        router.push('/addAlarme');
    };

//-----------------------------APAGAR-Alarme

const handleLongPressAlarme = (alarme) => {
        Alert.alert(
            "Apagar Alarme",
            `Deseja apagar o alarme "${alarme.texto}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Apagar", 
                    style: "destructive", 
                    onPress: async () => {
                        const novosAlarmes = alarmes.filter(a => a.id !== alarme.id);
                        setAlarmes(novosAlarmes);
                        await AsyncStorage.setItem('alarmes', JSON.stringify(novosAlarmes));
                    }
                }
            ]
        );
    };


//-----------------------------APAGAR-ALARME

     
      const renderAlarme = ({ item }) => (
        <TouchableOpacity
            onPress={() => handlePressAlarme(item)}
            onLongPress={() => handleLongPressAlarme(item)}
            activeOpacity={0.8}
        >
            <Alarme 
                alarme={item}
            />
        </TouchableOpacity>
    );

     const handlePressAlarme = (alarme) => {
          router.push({
               pathname: '/addAlarme',
               params: {
                    id: alarme.id.toString(),
                    texto: alarme.texto,
                    hora: alarme.hora,
                    data: alarme.data,
               }
          });
     };


    return (
        <View style={styles.container}>
            <Header 
                title="Tarefas" 
                showBackButton={false} // MUDA SE QUISER DPS
                onBackPress={() => router.back()}
            />

            <View style={styles.spacer} />

            {/* <View style={styles.diasContainer}>
                <DiasSelector />
            </View> */}
             <View style={styles.decoracaoArea}>
                <Text style={styles.decoracaoText}> Seus alarmes aparecem aqui </Text>
            </View>

            <View style={styles.content}>
                {alarmes.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Sem alarmes aqui</Text>
                        <Text style={styles.emptySubtext}>
                            Toque no botão "+" para adicionar um novo alarme
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={alarmes}
                        renderItem={renderAlarme}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.flatListContent}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            <Footer 
                onAddAlarme={handleAddAlarme}
                showBackButton={false}
                alarmeIcon="cog"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#a9c7d4",
    },
    spacer: {
        width: "100%",
        height: 20,
        backgroundColor: "#a9c7d4",
    },
    diasContainer: {
        width: "100%",
        height: 70,
        backgroundColor: "#95AFBB",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    content: {
        flex: 1,
    },
    flatListContent: {
        padding: 16,
        paddingTop: 15,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3f516e',
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: 16,
        color: '#5a7080',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 40,
    },

     decoracaoArea: { 
          width: "100%",
          height: 70,
          backgroundColor: "#95AFBB", 
          justifyContent: "center", 
          alignItems: "center", 
          marginVertical: 10, 
          borderRadius: 12, 
     }, 

     decoracaoText: { 
          color: "#fff", 
          fontSize: 16, 
          fontWeight: "600",
     },
});
