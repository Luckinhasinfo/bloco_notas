import { Slot, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userIsLoggedIn = true;
        
        setIsLoggedIn(userIsLoggedIn);
        setIsReady(true);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsReady(true);
      }
    };

    checkAuth();
  }, []);

  if (!isReady) { 
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9EC0CA' }}>
        <ActivityIndicator size="large" color="#3f516e" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}