import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const coresDisponiveis = [
  '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', 
  '#118AB2', '#EF476F', '#7209B7', '#FB5607',
  '#3A86FF', '#8338EC'
];

export default function PastaForm() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [nomePasta, setNomePasta] = useState(params.nomePasta || '');
  const [corSelecionada, setCorSelecionada] = useState(params.corPasta || '#FF6B6B');

  const isEditando = !!params.pastaId;

  const handleSalvar = () => {
    if (!nomePasta.trim()) {
      Alert.alert('Atenção', 'Digite um nome para a pasta');
      return;
    }

    const dadosPasta = {
      id: isEditando ? parseInt(params.pastaId) : Date.now(),
      nome: nomePasta.trim(),
      cor: corSelecionada,
      notaIds: isEditando ? JSON.parse(params.notaIds || '[]') : []
    };

    // Aqui você salvaria no estado global ou contexto
    // Por enquanto, vamos usar um callback
    if (params.onSave) {
      params.onSave(dadosPasta);
    }
    
    Alert.alert(
      'Sucesso',
      isEditando ? 'Pasta atualizada!' : 'Pasta criada!',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const handleExcluir = () => {
    if (!isEditando) return;

    Alert.alert(
      'Excluir Pasta',
      `Deseja excluir a pasta "${nomePasta}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            if (params.onDelete) {
              params.onDelete(parseInt(params.pastaId));
            }
            router.back();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {isEditando ? 'Editar Pasta' : 'Nova Pasta'}
        </Text>
      </View>

      {/* Nome da pasta */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome da Pasta</Text>
        <TextInput
          style={styles.input}
          value={nomePasta}
          onChangeText={setNomePasta}
          placeholder="Digite o nome da pasta"
          autoFocus
          maxLength={30}
        />
      </View>

      {/* Seletor de cor */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cor da Pasta</Text>
        <View style={styles.coresContainer}>
          {coresDisponiveis.map((cor) => (
            <TouchableOpacity
              key={cor}
              style={[
                styles.corOption,
                { backgroundColor: cor },
                corSelecionada === cor && styles.corSelecionada
              ]}
              onPress={() => setCorSelecionada(cor)}
            >
              {corSelecionada === cor && (
                <MaterialIcons name="check" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Preview da pasta */}
      <View style={styles.previewContainer}>
        <Text style={styles.label}>Visualização</Text>
        <View style={[styles.pastaPreview, { backgroundColor: corSelecionada + '20' }]}>
          <MaterialIcons name="folder" size={50} color={corSelecionada} />
          <Text style={[styles.previewNome, { color: corSelecionada }]}>
            {nomePasta || 'Nome da Pasta'}
          </Text>
        </View>
      </View>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        {isEditando && (
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleExcluir}
          >
            <MaterialIcons name="delete" size={20} color="#fff" />
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSalvar}
        >
          <MaterialIcons 
            name={isEditando ? "save" : "create-new-folder"} 
            size={20} 
            color="#fff" 
          />
          <Text style={styles.saveButtonText}>
            {isEditando ? 'Salvar' : 'Criar Pasta'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  coresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  corOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  corSelecionada: {
    borderColor: '#333',
    transform: [{ scale: 1.1 }],
  },
  previewContainer: {
    marginBottom: 30,
  },
  pastaPreview: {
    width: 150,
    height: 120,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  previewNome: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    flex: 0.4,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    flex: 0.6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});