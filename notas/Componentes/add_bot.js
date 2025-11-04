import { TouchableOpacity,} from 'react-native';
import { useRouter } from 'expo-router';
import Add_icon from '../assets/add_icon.svg';


const Add_bot = () => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => {
          
        }}>
            <Add_icon width={70} height={70} />
        </TouchableOpacity>
    );
}; 

export default Add_bot;




