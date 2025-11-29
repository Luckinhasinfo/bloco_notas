import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import SetaIcon from '../assets/seta.svg';

export default function Seta() {
	const router = useRouter();
	return (
		<TouchableOpacity onPress={() => router.back()}>
			<SetaIcon width={30} height={30} />
		</TouchableOpacity>
	);
}