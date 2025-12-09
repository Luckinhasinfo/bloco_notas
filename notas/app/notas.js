import { StyleSheet, View, FlatList, Alert, Text } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import Header from "../Componentes/header";
import Footer from "../Componentes/footer";
import Nota from "../Componentes/nota";
import Pasta from "../Componentes/pasta";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotasScreen() {
     const router = useRouter();
     const [pastas, setPastas] = useState([]);
     const [notas, setNotas] = useState([]);
     const [todosItens, setTodosItens] = useState([]);

     useEffect(() => {
          async function carregarDados() {
               const usuarioLogadoJson = await AsyncStorage.getItem('usuario_logado');
               const emailUsuario = usuarioLogadoJson ? JSON.parse(usuarioLogadoJson) : null;

               const notasJson = await AsyncStorage.getItem('notas');
               const notasCarregadas = notasJson ? JSON.parse(notasJson) : [];

               const pastasJson = await AsyncStorage.getItem('pastas');
               const pastasCarregadas = pastasJson ? JSON.parse(pastasJson) : [];

               setNotas(notasCarregadas);
               setPastas(pastasCarregadas);

                const notasFiltradas = notasCarregadas.filter(n => n.usuarioLogado === emailUsuario.email).map(n => ({...n,
                    tipo: 'nota',
                    texto: n.textoNota
               }));

               const itensCombinados = [
                    ...pastasCarregadas.map(p => ({ ...p, tipo: 'pasta' })),
                    ...notasFiltradas
               ];

               setTodosItens(itensCombinados);
          }

          carregarDados();
     }, []);

     const handlePressItem = (item) => {
    if (item.tipo === 'pasta') {
        router.push({
            pathname: '/pastaDetalhes',
            params: {
                pastaId: item.id.toString(),
                pastaNome: item.nome,
                corPasta: item.cor,
                notaIds: '[]'
            }
        });
    } else {
        router.push({
            pathname: '/addNota',
            params: { 
                id: item.id.toString(),
                nome: item.nomeNota,
                texto: item.textoNota
            }
        });
    }
};

//-------------------------------------------------------SEGURAR ITEM

const handleLongPressItem = (item) => {
    if (item.tipo === 'nota') {
        Alert.alert(
            "Excluir nota",
            "Tem certeza que deseja apagar esta nota?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Apagar", 
                    style: "destructive",
                    onPress: async () => {
                        const notasJson = await AsyncStorage.getItem('notas');
                        let notas = notasJson ? JSON.parse(notasJson) : [];
                        
                        notas = notas.filter(n => n.id !== item.id);
                        await AsyncStorage.setItem('notas', JSON.stringify(notas));

                        setNotas(notas);

                        const notasFiltradas = notas.filter(n => n.usuarioLogado === item.usuarioLogado)
                            .map(n => ({ ...n, tipo: 'nota', texto: n.textoNota }));

                        const itensCombinados = [
                            ...pastas.map(p => ({ ...p, tipo: 'pasta' })),
                            ...notasFiltradas
                        ];

                        setTodosItens(itensCombinados);
                    }
                }
            ]
        );
    }
};

//-------------------------------------------------------SEGURAR ITEM

     const renderItem = ({ item, index }) => {
          const itemStyle = {
               marginRight: index % 2 === 0 ? 8 : 0,
          };

          if (item.tipo === 'pasta') {
               return (
                    <View style={[styles.itemWrapper, itemStyle]}>
                         <Pasta 
                              pasta={item}
                              onPress={() => handlePressItem(item)}
                         />
                    </View>
               );
          } else {
               return (
                    <View style={[styles.itemWrapper, itemStyle]}>
                         <Nota 
                              nota={item}
                              onPress={() => handlePressItem(item)}
                              onLongPress={() => handleLongPressItem(item)}
                         />
                    </View>
               );
          }
     };

     const handleAddNota = () => {
          router.push('/addNota');
     };


     return (
          <View style={styles.container}>
               <Header title="Anotações" />
               
               <View style={styles.content}>
               {todosItens.length === 0 ? (
                    <View style={styles.emptyContainer}>
                         <Text style={styles.emptyText}>
                              Nenhuma nota encontrada
                         </Text>
                         <Text style={styles.emptySubtext}>
                              Toque no botão "+" para criar uma nova nota
                         </Text>
                    </View>
               ) : (
                    <FlatList
                         data={todosItens}
                         renderItem={renderItem}
                         keyExtractor={item => `${item.tipo}-${item.id}`}
                         numColumns={2}
                         contentContainerStyle={styles.flatListContent}
                         columnWrapperStyle={styles.columnWrapper}
                         showsVerticalScrollIndicator={false}
                    />
               )}
               </View>

               <Footer 
                    onAddNota={handleAddNota}
               />
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#a9c7d4",
     },
     content: {
          flex: 1,
     },
     flatListContent: {
          padding: 16,
          paddingTop: 24,
          alignItems: 'center', 
     },
     columnWrapper: {
          justifyContent: 'space-between', 
          width: '100%',
          marginBottom: 16,
     },
     itemWrapper: {
          width: '48%',
     },
     emptyContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
     },
     emptyText: {
          fontSize: 20,
          color: '#3f516e',
          fontWeight: 'bold',
          textAlign: 'center',
     },
     emptySubtext: {
          fontSize: 16,
          color: '#5a7080',
          textAlign: 'center',
          marginTop: 10,
          paddingHorizontal: 40,
     },
     
});
