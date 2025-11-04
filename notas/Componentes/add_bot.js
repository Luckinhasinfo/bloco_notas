import { TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';


const Add_bot = () => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => {
          router.navigate('add_nota')
        }}>
            <Image
                source={require('../assets/add_icon.png')}
                style={{ width: 100, height: 100 }}
            />
        </TouchableOpacity>
    );
}; 

export default Add_bot;