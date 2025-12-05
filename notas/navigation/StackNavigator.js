import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../app/login";
import Cadastro from "../app/cadastro";
import Index from "../app/index";
import AddNota from "../app/AddNota";
import Alarmes from "../app/alarmes";
import Anotacoes from "../app/anotacoes";
import Pasta from "../app/pasta";
import AnotacoesSecretas from "../app/anotacoesSecretas";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Index} />
        <Stack.Screen name="AddNota" component={AddNota} />
        <Stack.Screen name="Alarmes" component={Alarmes} />
        <Stack.Screen name="Anotacoes" component={Anotacoes} />
        <Stack.Screen name="Pasta" component={Pasta} />
        <Stack.Screen name="AnotacoesSecretas" component={AnotacoesSecretas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
