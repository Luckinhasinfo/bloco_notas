import { TouchableOpacity,} from 'react-native';
import { useRouter } from 'expo-router';
import Add_nota_icon from '../assets/add_nota_icon.svg';


export default function Add_nota_bot({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Add_nota_icon width={70} height={70} />
        </TouchableOpacity>
    );
}


