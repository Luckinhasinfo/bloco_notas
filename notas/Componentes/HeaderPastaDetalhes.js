import { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HeaderPastaDetalhes({
  pasta,
  onBackPress,
  onSaveNome,
}) {
  const [nomePasta, setNomePasta] = useState(pasta?.nome || 'Sem Nome');
  const [editandoNome, setEditandoNome] = useState(false);

  const handleSalvarNome = () => {
    if (nomePasta.trim()) {
      if (onSaveNome) {
        onSaveNome(nomePasta.trim());
      }
      setEditandoNome(false);
    } else {
      setNomePasta(pasta?.nome || 'Sem Nome');
      setEditandoNome(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      if (editandoNome) {
        handleSalvarNome();
      }
    }}>
      <View style={styles.container}>
        <View style={styles.barra_sup}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (editandoNome) {
                handleSalvarNome();
              }
              onBackPress();
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
            <View style={styles.tituloContainer}>
              <TextInput
                style={styles.titulo}
                value={nomePasta}
                editable={false}
                onPressIn={() => setEditandoNome(true)}
                placeholder="Sem Nome"
                placeholderTextColor="rgba(255, 255, 255, 0.8)"
              />
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditandoNome(true)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name="pencil"
                  size={18}
                  color="rgba(255, 255, 255, 0.8)"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3f516e",
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
  editButton: {
    padding: 4,
    marginLeft: 8,
  },
});