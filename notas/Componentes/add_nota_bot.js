import { TouchableOpacity,} from 'react-native';
import { useRouter } from 'expo-router';
import Add_nota_icon from '../assets/add_nota_icon.svg';


const Add_nota_bot = () => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => {
          
        }}>
            <Add_nota_icon width={70} height={70} />
        </TouchableOpacity>
    );
}; 

export default Add_nota_bot;




