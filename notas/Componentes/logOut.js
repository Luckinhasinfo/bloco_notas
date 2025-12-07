import { useRouter } from 'expo-router';
import {Alert} from 'react-native';

function LogOut() {
     const router = useRouter();
          Alert.alert(
               "Confirmação",
               "Tem certeza que deseja sair?",
               [
                    {
                         text: "Cancelar",
                    },
                    {
                         text: "Sair",
                         onPress: () => router.replace("/")
                    }
               ]
          );
}