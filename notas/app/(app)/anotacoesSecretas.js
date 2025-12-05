import { StyleSheet, View, FlatList } from "react-native";
import Nota from "../../Componentes/Nota";
import Header from "../../Componentes/Header";
import Footer from "../../Componentes/Footer";
import { useState } from "react";
import { useRouter } from 'expo-router';

const NOTAS_INICIAIS = [
  {
    id: 1,
    texto: 'Minha primeira nota  oiiii'
  },
  {
    id: 2,
    texto: 'Minha segunda nota oiiii'
  },
  {
    id: 3,
    texto: 'Minha terceira nota oiiii'
  }
];

export default function NotasScreen() {
  const router = useRouter();
  const [notas, setNotas] = useState(NOTAS_INICIAIS);

  const handleLogout = () => {
    router.replace('/login');
  };
  const handleAddNota = () => {
    router.push('/anotacoesSecretas');
  };

  const handleAlarme = () => {
    router.push('/alarmes');
  };

  const renderNota = ({ item }) => (
    <Nota nota={item} />
  );

  return (
    <View style={styles.container}>
      <Header
        title="Anotações Secretas"
        showBackButton={true}
        onBackPress={() => router.back()}
      />
      <View style={styles.content}>
        <FlatList
          data={notas}
          renderItem={renderNota}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
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
})