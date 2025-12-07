import { StyleSheet, View, FlatList, Alert, Text } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import Header from "../Componentes/header";
import Footer from "../Componentes/footer";
import Nota from "../Componentes/nota";
import Pasta from "../Componentes/pasta";

const PASTAS_INICIAIS = [
  { id: 1, nome: 'Trabalho', cor: '#FF6B6B', quantidade: 5 },
  { id: 2, nome: 'Estudos', cor: '#4ECDC4', quantidade: 8 },
  { id: 3, nome: 'Pessoal', cor: '#FFD166', quantidade: 3 },
  { id: 4, nome: 'Projetos', cor: '#06D6A0', quantidade: 12 },
];

const NOTAS_INICIAIS = [
  { id: 1, texto: 'Minha primeira nota oiiii' },
];

export default function NotasScreen() {
  const router = useRouter();
  const [pastas, setPastas] = useState(PASTAS_INICIAIS);
  const [notas, setNotas] = useState(NOTAS_INICIAIS);
  const [todosItens, setTodosItens] = useState([]);

  useEffect(() => {
    const itensCombinados = [
      ...pastas.map(pasta => ({ ...pasta, tipo: 'pasta' })),
      ...notas.map(nota => ({ ...nota, tipo: 'nota' }))
    ];
    setTodosItens(itensCombinados);
  }, [pastas, notas]);

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
          texto: item.texto 
        }
      });
    }
  };

  const handleLongPressItem = (item) => {
    Alert.alert(
      'Opções',
      item.tipo === 'pasta' 
        ? `Pasta: "${item.nome}"`
        : `"${item.texto.substring(0, 30)}${item.texto.length > 30 ? '...' : ''}"`,
      [
        {
          text: item.tipo === 'pasta' ? 'Abrir Pasta' : 'Editar',
          onPress: () => handlePressItem(item)
        },
        {
          text: 'Deletar',
          onPress: () => {
            Alert.alert(
              'Confirmar Exclusão',
              `Tem certeza que deseja deletar este ${item.tipo === 'pasta' ? 'pasta' : 'nota'}?`,
              [
                {
                  text: 'Cancelar',
                  style: 'cancel'
                },
                {
                  text: 'Deletar',
                  style: 'destructive',
                  onPress: () => {
                    if (item.tipo === 'pasta') {
                      setPastas(pastas.filter(p => p.id !== item.id));
                    } else {
                      setNotas(notas.filter(n => n.id !== item.id));
                    }
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
            if (item.tipo === 'pasta') {
              const novaPasta = {
                id: Date.now(), 
                nome: `${item.nome} (cópia)`,
                cor: item.cor,
                quantidade: item.quantidade
              };
              setPastas([...pastas, novaPasta]);
            } else {
              const novaNota = {
                id: Date.now(), 
                texto: `${item.texto} (cópia)`
              };
              setNotas([...notas, novaNota]);
            }
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    );
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
            onLongPress={() => handleLongPressItem(item)}
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
    router.push('/AddNota');
  };


  const handleAddPasta = () => {
    router.push('/pasta');
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