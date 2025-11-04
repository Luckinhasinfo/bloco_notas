import { TouchableOpacity,} from 'react-native';
import { useRouter } from 'expo-router';
import Alarme_icon from '../assets/alarme_icon.svg';


const Alarme_bot = () => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => {
          router.navigate('alarmes')
        }}>
            <Alarme_icon width={70} height={70} />
        </TouchableOpacity>
    );
}; 

export default Alarme_bot;

