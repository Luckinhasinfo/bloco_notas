import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LogOutIcon from '../assets/logOutIcon.svg';
import {Alert} from 'react-native';

export default function LogOut() {
     const router = useRouter();
     return (
          <TouchableOpacity onPress={() => {
               Alert.alert(
                    "Confirmação",
                    "Tem certeza que deseja sair?",
                    [
                         {
                              text: "Cancelar",
                         },
                         {
                              text: "Sair",
                              onPress: () => router.push("/")
                         }
                    ]
               );
          }}>
               <LogOutIcon
               width={30}
               height={30} 
               style={{
                    transform: [{rotate: '180deg'}],
                    color: "white"}}
               />
          </TouchableOpacity>
     );
}