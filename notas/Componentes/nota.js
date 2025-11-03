import {View, Text, StyleSheet} from 'react-native';
const Nota = ({ nota }) => {
    return (
        <View style={styles.nota}>
            <Text>{nota.texto}</Text>
        </View>
    );
}; 
const styles = StyleSheet.create({
    nota: {   
        width: 50,
        height: 50,
        borderRadius: '100%',
        opacity: 0.4,
    }
});
    export default Nota;