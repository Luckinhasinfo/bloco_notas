import { Stack } from "expo-router";
import { BackHandler } from "react-native";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

export default function AppLayout() {

  useEffect(() => {

    const onBackPress = () => true;


    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
