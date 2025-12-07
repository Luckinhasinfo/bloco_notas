import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useRef } from 'react';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SenhaDialog from './SenhaDialog';
import { router, useRouter } from 'expo-router';


const Header = ({
  title = "Anotações",
  backgroundColor = "#3f516e",
  titleColor = "#ffffff",
  showBackButton = false,
  showMenuButton = true,
  onBackPress,
  onMenuPress,
  backButtonColor = "#ffffff",
  onLogout
}) => {
  const navigation = useNavigation();
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [senhaDialogVisible, setSenhaDialogVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSidebarVisible(false);
    });
  };

  const handleLogout = () => {
    closeSidebar();
    if (onLogout) {
      onLogout();
    }
  };

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      openSidebar();
    }
  };

  const handleAnotacoesSecretasPress = () => {
    closeSidebar();
    setTimeout(() => {
      setSenhaDialogVisible(true);
    }, 300);
  };

  const handleConfirmarSenha = (senha) => {
    if (!senha) return;
    setSenhaDialogVisible(false);
    router.replace('/anotacoesSecretas');
  };

  return (
    <View style={[styles.header, { backgroundColor }]}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={backButtonColor}
          />
        </TouchableOpacity>
      )}

      <Text style={[styles.headerText, { color: titleColor }]}>
        {title}
      </Text>

      {showMenuButton && (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={handleMenuPress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="menu"
            size={24}
            color={backButtonColor}
          />
        </TouchableOpacity>
      )}

      <Modal
        visible={sidebarVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeSidebar}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeSidebar}
        >
          <Animated.View
            style={[
              styles.sidebar,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarHeaderTitle}>Menu</Text>
              <TouchableOpacity
                style={styles.sidebarCloseButton}
                onPress={closeSidebar}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.sidebarContent}>
              <TouchableOpacity
                style={[styles.sidebarItem, styles.sidebarItemButton]}
                onPress={() => {
                  closeSidebar();
                }}
              >
                <MaterialCommunityIcons
                  name="cog"
                  size={22}
                  color="#3f516e"
                />
                <Text style={styles.sidebarItemText}>Configurações</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.sidebarItem, styles.sidebarItemButton]}
                onPress={() => {
                  router.replace('/notas');
                }}
              >
                <MaterialCommunityIcons
                  name="note"
                  size={22}
                  color="#3f516e"
                />
                <Text style={styles.sidebarItemText}>Anotações</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.sidebarItem, styles.sidebarItemButton]}
                onPress={handleAnotacoesSecretasPress}
              >
                <MaterialCommunityIcons
                  name="lock"
                  size={22}
                  color="#3f516e"
                />
                <Text style={styles.sidebarItemText}>Anotações Secretas</Text>
              </TouchableOpacity>

              <View style={styles.sidebarDivider} />

              <TouchableOpacity
                style={[styles.sidebarItem, styles.sidebarItemLogout]}
                onPress={() => {
                         Alert.alert(
                              "Confirmação",
                              "Tem certeza que deseja sair?",
                              [
                                   {
                                        text: "Cancelar",
                                   },
                                   {
                                        text: "Sair",
                                        onPress: async () => {
                                             await AsyncStorage.setItem('usuario_logado', '')
                                             router.replace("/")
                                        }
                                   }
                              ]
                         );
                    }
               }
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={22}
                  color="#ff6b6b"
                />
                <Text style={[styles.sidebarItemText, styles.sidebarItemTextLogout]}>Sair</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sidebarFooter}>
              <Text style={styles.sidebarFooterText}>Anotações App</Text>
              <Text style={styles.sidebarFooterVersion}>v1.0.0</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      <SenhaDialog
        visible={senhaDialogVisible}
        onClose={() => setSenhaDialogVisible(false)}
        onConfirm={handleConfirmarSenha}
        title="Acesso às Anotações Secretas"
        message="Digite sua senha para acessar as anotações secretas:"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 130, 
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: 'relative',
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 50,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    padding: 8,
    zIndex: 1,
  },
  menuButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    padding: 8,
    zIndex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#a9c7d4',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 15,
  },
  sidebarHeader: {
    backgroundColor: '#3f516e',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarHeaderTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sidebarCloseButton: {
    padding: 4,
  },
  sidebarContent: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sidebarItemLogout: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  sidebarItemButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderLeftWidth: 4,
    borderLeftColor: '#13567cff',
  },
  sidebarItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#3f516e',
    fontWeight: '500',
  },
  sidebarItemTextLogout: {
    color: '#ff6b6b',
    fontWeight: '600',
  },
  sidebarDivider: {
    height: 1,
    backgroundColor: 'rgba(63, 81, 110, 0.3)',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  sidebarFooter: {
    padding: 20,
    backgroundColor: 'rgba(63, 81, 110, 0.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(63, 81, 110, 0.2)',
  },
  sidebarFooterText: {
    fontSize: 14,
    color: '#3f516e',
    fontWeight: '500',
    textAlign: 'center',
  },
  sidebarFooterVersion: {
    fontSize: 12,
    color: '#3f516e',
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default Header;