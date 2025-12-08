import { StyleSheet, View, FlatList, Text, TouchableOpacity, Alert, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Nota from "../Componentes/nota";

export default function Pasta() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const pastaId = parseInt(params.pastaId);
  const pastaNome = params.pastaNome || "Sem Nome";
  const corPasta = params.corPasta || "#FF6B6B";

  const [notasNaPasta, setNotasNaPasta] = useState([]);
  const [editandoNome, setEditandoNome] = useState(false);
  const [nomePasta, setNomePasta] = useState(pastaNome);


  const handleSalvarNome = () => {
    if (nomePasta.trim()) {
      setEditandoNome(false);
    } else {
      setNomePasta("Sem Nome");
      setEditandoNome(false);
    }
  };

  const handlePressNota = (nota) => {
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
          onPress: () => handlePressNota(nota)
        },
        {
          text: 'Remover da Pasta',
          onPress: () => {
            Alert.alert(
              'Remover da Pasta',
              'Deseja remover esta nota da pasta?',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel'
                },
                {
                  text: 'Remover',
                  style: 'destructive',
                  onPress: () => {
                    setNotasNaPasta(notasNaPasta.filter(n => n.id !== nota.id));
                  }
                }
              ]
            );
          },
          style: 'destructive'
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    );
  };

  const handleAddNota = () => {
    Alert.prompt(
      'Nova Nota na Pasta',
      'Digite o texto da nota:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Criar',
          onPress: (texto) => {
            if (texto && texto.trim()) {
              const novaNota = {
                id: Date.now(),
                texto: texto.trim(),
                pastaId: pastaId,
                data: new Date().toISOString().split('T')[0],
              };

              setNotasNaPasta([...notasNaPasta, novaNota]);
            }
          }
        }
      ],
      'plain-text'
    );
  };

  const renderNota = ({ item }) => (
    <Nota
      nota={item}
      onPress={() => handlePressNota(item)}
      onLongPress={() => handleLongPressNota(item)}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      if (editandoNome) {
        handleSalvarNome();
      }
    }}>
      <View style={styles.fundo}>
        <View style={styles.barra_sup}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (editandoNome) {
                handleSalvarNome();
              }
              router.back();
            }}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#ffffff"
            />
          </TouchableOpacity>

          {editandoNome ? (
            <TextInput
              style={styles.tituloInput}
              value={nomePasta}
              onChangeText={setNomePasta}
              placeholder="Digite o nome da pasta..."
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              autoFocus
              onSubmitEditing={handleSalvarNome}
              onBlur={handleSalvarNome}
            />
          ) : (
            <TouchableOpacity
              style={styles.tituloContainer}
              onPress={() => setEditandoNome(true)}
              activeOpacity={0.7}
            >
              <TextInput
                style={styles.titulo}
                value={nomePasta}
                editable={false}
                placeholder="Nova Pasta"
                placeholderTextColor="rgba(255, 255, 255, 0.8)"
              />
              <MaterialIcons
                name="edit"
                size={18}
                color="rgba(255, 255, 255, 0.8)"
                style={styles.editIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.contadorContainer}>
          <Text style={styles.contadorText}>
            {notasNaPasta.length} {notasNaPasta.length === 1 ? 'nota' : 'notas'} nesta pasta
          </Text>
        </View>

        <View style={styles.content}>
          {notasNaPasta.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="folder-open" size={60} color="#8ca7b7" />
              <Text style={styles.emptyText}>
                Pasta vazia
              </Text>
              <Text style={styles.emptySubtext}>
                Adicione notas a esta pasta
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddNota}
              >
                <MaterialIcons name="add" size={24} color="#fff" />
                <Text style={styles.addButtonText}>Adicionar Nota</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={notasNaPasta}
              renderItem={renderNota}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleAddNota}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
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
  tituloContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
    marginRight: 10,
    paddingVertical: 8,
  },
  titulo: {
    flex: 1,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 8,
  },
  tituloInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginLeft: 40,
    marginRight: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
  },
  editIcon: {
    marginLeft: 8,
    opacity: 0.8,
  },
  contadorContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(63, 81, 110, 0.2)',
  },
  contadorText: {
    fontSize: 16,
    color: '#3f516e',
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  flatListContent: {
    padding: 16,
    paddingTop: 20,
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
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#5a7080',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 40,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3f516e',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
  },
});