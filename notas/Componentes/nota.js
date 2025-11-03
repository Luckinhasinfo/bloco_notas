import {View, Text, StyleSheet} from 'react-native';
const Nota = ({ nota }) => {
    return (
        <View style={styles.nota_sty}>
            <Text>{nota.texto}</Text>
        </View>
    );
}; 
const styles = StyleSheet.create({
    nota_sty: {   
        width: 150,
        height: 150,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        margin: 5,

    }
});
    export default Nota;