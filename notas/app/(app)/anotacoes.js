import { StyleSheet, View, FlatList, Alert } from "react-native";
import Nota from "../../Componentes/Nota";
import Header from "../../Componentes/Header";
import Footer from "../../Componentes/Footer";
import { useState } from "react";
import { useRouter } from 'expo-router';

const NOTAS_INICIAIS = [
  {
    id: 1,
    texto: 'Minha primeira nota'
  },
  {
    id: 2,
    texto: 'Minha segunda nota'
  },
  {
    id: 3,
    texto: 'Minha terceira nota'
  },
  {
    id: 4,
    texto: 'Nota importante para teste'
  }
];

export default function NotasScreen() {
  const router = useRouter();
  const [notas, setNotas] = useState(NOTAS_INICIAIS);

  const handleAddNota = () => {
    router.push('/anotacoesSecretas');
  };

  const handleAlarme = () => {
    console.log("Alarme pressionado");
  };

  const handlePressNota = (nota) => {
    console.log('Abrindo nota para edição:', nota.id);
    router.push({
      pathname: '/editarNota',
      params: { 
        id: nota.id,
        texto: nota.texto 
      }
    });
  };

  const handleLongPressNota = (nota) => {
    Alert.alert(
      'Opções da Nota',
      `"${nota.texto.substring(0, 30)}${nota.texto.length > 30 ? '...' : ''}"`,
      [
        {
          text: 'Editar',
          onPress: () => {
            router.push({
              pathname: '/editarNota',
              params: { 
                id: nota.id,
                texto: nota.texto 
              }
            });
          }
        },
        {
          text: 'Deletar',
          onPress: () => {
            Alert.alert(
              'Confirmar Exclusão',
              'Tem certeza que deseja deletar esta nota?',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel'
                },
                {
                  text: 'Deletar',
                  style: 'destructive',
                  onPress: () => {
                    setNotas(notas.filter(n => n.id !== nota.id));
                  }
                }
              ]
            );
          },
          style: 'destructive'
        },
        {
          text: 'Duplicar',
          onPress: () => {
            const novaNota = {
              id: Date.now(), 
              texto: `${nota.texto} (cópia)`
            };
            setNotas([...notas, novaNota]);
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    );
  };

  const renderNota = ({ item }) => (
    <Nota 
      nota={item}
      onPress={handlePressNota}
      onLongPress={handleLongPressNota}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Anotações" />
      
      <View style={styles.content}>
        {notas.length === 0 ? (
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
            data={notas}
            renderItem={renderNota}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <Footer 
        onAddNota={handleAddNota}
        onAlarme={handleAlarme}
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});