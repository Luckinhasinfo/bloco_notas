import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Nota from '../../Componentes/Nota';
import HeaderPastaDetalhes from '../../Componentes/HeaderPastaDetalhes';

export default function PastaDetalhes() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const pastaId = parseInt(params.pastaId);
  
  const [pasta, setPasta] = useState(null);
  const [notasDaPasta, setNotasDaPasta] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [activeDeleteNote, setActiveDeleteNote] = useState(null);

  useEffect(() => {
    const pastaEncontrada = {
      id: pastaId,
      nome: params.pastaNome || 'Pasta',
      cor: params.corPasta || '#FF6B6B',
      notaIds: JSON.parse(params.notaIds || '[]')
    };
    
    setPasta(pastaEncontrada);
    setNotasDaPasta([
      { id: 1, texto: 'Nota 1 na pasta', pastaId: pastaId },
      { id: 2, texto: 'Nota 2 na pasta', pastaId: pastaId },
      { id: 3, texto: 'Nota 3 na pasta', pastaId: pastaId },
    ]);
  }, [pastaId]);

  const handleAddNota = () => {
    Keyboard.dismiss();
    Alert.prompt(
      'Nova Nota',
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
                pastaId: pastaId
              };
              
              setNotasDaPasta([...notasDaPasta, novaNota]);
              Alert.alert('Sucesso', 'Nota criada na pasta!');
            }
          }
        }
      ],
      'plain-text'
    );
  };

  const handleSaveNome = (novoNome) => {
    setPasta({...pasta, nome: novoNome});
  };

  const handlePressNota = (nota) => {
    if (deleteMode) {
      toggleNoteSelection(nota);
    } else {
      router.push({
        pathname: '/editarNota',
        params: {
          id: nota.id,
          texto: nota.texto
        }
      });
    }
  };

  const handleLongPressNota = (nota) => {
    if (!deleteMode) {
      setActiveDeleteNote(nota.id);
    }
  };

  const handleDeletePress = (nota) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja deletar esta nota?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => setActiveDeleteNote(null)
        },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => {
            setNotasDaPasta(notasDaPasta.filter(n => n.id !== nota.id));
            setActiveDeleteNote(null);
          }
        }
      ]
    );
  };

  const toggleNoteSelection = (nota) => {
    if (selectedNotes.some(n => n.id === nota.id)) {
      setSelectedNotes(selectedNotes.filter(n => n.id !== nota.id));
    } else {
      setSelectedNotes([...selectedNotes, nota]);
    }
  };

  const toggleDeleteMode = () => {
    if (deleteMode) {
      setDeleteMode(false);
      setSelectedNotes([]);
    } else {
      setDeleteMode(true);
      setActiveDeleteNote(null);
    }
  };

  const deleteSelectedNotes = () => {
    if (selectedNotes.length === 0) return;

    Alert.alert(
      'Confirmar Exclusão',
      `Deseja deletar ${selectedNotes.length} nota(s) selecionada(s)?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => {
            const idsToDelete = selectedNotes.map(n => n.id);
            setNotasDaPasta(notasDaPasta.filter(n => !idsToDelete.includes(n.id)));
            setSelectedNotes([]);
            setDeleteMode(false);
          }
        }
      ]
    );
  };

  const renderNota = ({ item }) => (
    <Nota
      nota={item}
      onPress={() => handlePressNota(item)}
      onLongPress={() => handleLongPressNota(item)}
      onDeletePress={() => handleDeletePress(item)}
      isSelected={selectedNotes.some(n => n.id === item.id)}
      showCheckbox={deleteMode}
      showDeleteButton={activeDeleteNote === item.id && !deleteMode}
    />
  );

  if (!pasta) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <HeaderPastaDetalhes
          pasta={pasta}
          onBackPress={() => router.back()}
          onSaveNome={handleSaveNome}
        />

        <View style={styles.content}>
          {notasDaPasta.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="note-add" size={60} color="#8ca7b7" />
              <Text style={styles.emptyText}>Pasta vazia</Text>
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
            <>
              <View style={styles.headerNotas}>
                <Text style={styles.notasCountText}>
                  {notasDaPasta.length} {notasDaPasta.length === 1 ? 'nota' : 'notas'}
                </Text>
                <TouchableOpacity
                  style={styles.deleteModeButton}
                  onPress={toggleDeleteMode}
                >
                  <MaterialIcons
                    name={deleteMode ? "cancel" : "delete"}
                    size={24}
                    color={deleteMode ? "#ff4444" : "#3f516e"}
                  />
                  <Text style={[
                    styles.deleteModeText,
                    { color: deleteMode ? "#ff4444" : "#3f516e" }
                  ]}>
                    {deleteMode ? "Cancelar" : "Deletar"}
                  </Text>
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={notasDaPasta}
                renderItem={renderNota}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}
        </View>

        {!deleteMode && (
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={handleAddNota}
          >
            <MaterialIcons name="add" size={28} color="#fff" />
          </TouchableOpacity>
        )}

        {deleteMode && selectedNotes.length > 0 && (
          <TouchableOpacity
            style={styles.floatingDeleteButton}
            onPress={deleteSelectedNotes}
          >
            <MaterialIcons name="delete" size={24} color="#fff" />
            <Text style={styles.floatingDeleteText}>
              Deletar ({selectedNotes.length})
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a9c7d4",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#a9c7d4",
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  headerNotas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(63, 81, 110, 0.2)',
  },
  notasCountText: {
    fontSize: 16,
    color: '#3f516e',
    fontWeight: '600',
  },
  deleteModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  deleteModeText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '600',
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
  floatingDeleteButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff4444',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 100,
  },
  floatingDeleteText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});