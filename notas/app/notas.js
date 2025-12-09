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
                    pathname: '/editarNota',
                    params: { 
                         id: item.id,
                         texto: item.textoNota
                    }
               });
          }
     };

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
                         />
                    </View>
               );
          }
     };

     const handleAddNota = () => {
          router.push('/addNota');
     };

     const handleAddPasta = () => {
          router.push('/addPasta');
     };

     return (
          <View style={styles.container}>
               <Header title="Anotações" />
               
               <View style={styles.content}>
               {todosItens.length === 0 ? (
                    <View style={styles.emptyContainer}>
                         <Text style={styles.emptyText}>
                              Nenhuma pasta ou nota encontrada
                         </Text>
                         <Text style={styles.emptySubtext}>
                              Toque no botão "+" para criar uma nova nota ou pasta
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
                    onAddPasta={handleAddPasta}
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
