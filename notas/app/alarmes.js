import { StyleSheet, View, FlatList } from "react-native";
import Alarme from "../Componentes/alarme";
import Header from "../Componentes/header_alarmes";
import Footer from "../Componentes/footer";
import DiasSelector from "../Componentes/DiasSelector";
import { useState } from "react";
import { useRouter } from 'expo-router';

export default function AlarmesScreen() {
    const router = useRouter();
    const [alarmes, setAlarmes] = useState([
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
        },
    ]);

    const handleAddAlarme = () => {
        router.push('/adicionar-alarme');
    };

    const handleConfiguracoes = () => {
        router.push('/configuracoes');
    };

    const renderAlarme = ({ item }) => (
        <Alarme alarme={item} />
    );

    return (
        <View style={styles.container}>
            <Header 
                title="Tarefas" 
                showBackButton={false}//MUDA SE QUISER DPS
                onBackPress={() => router.back()}
            />

            <View style={styles.spacer} />

            <View style={styles.diasContainer}>
                <DiasSelector />
            </View>

            <View style={styles.content}>
                <FlatList
                    data={alarmes}
                    renderItem={renderAlarme}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.flatListContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <Footer 
                onAddNota={handleAddAlarme}
                onAlarme={handleConfiguracoes}
                showBackButton={false}
                alarmeIcon="cog" // Ícone de engrenagem para configurações
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
});