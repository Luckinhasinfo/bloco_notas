import { TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Add_icon from '../assets/add_icon.svg';


const Add_bot = () => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => {
          router.navigate('add_nota')
        }}>
            <Add_icon width={100} height={100} />;
        </TouchableOpacity>
    );
}; 

export default Add_bot;




