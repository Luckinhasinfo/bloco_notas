import { TouchableOpacity,} from 'react-native';
import { useRouter } from 'expo-router';
import Add_alarme_icon from '../assets/add_alarme_icon.svg';


const Add_alarme_bot = () => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => {
            router.push('/add_alarme')
        }}>
            <Add_alarme_icon width={70} height={70} />
        </TouchableOpacity>
    );
}; 

export default Add_alarme_bot;




