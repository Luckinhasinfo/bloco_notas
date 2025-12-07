import { Stack } from "expo-router";
import { BackHandler } from "react-native";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

export default function AppLayout() {

  useEffect(() => {
    //blloqueia o botão físico
    const onBackPress = () => true;
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    //esconde a barra de navegação do cell
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
