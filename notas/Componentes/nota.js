import {View, Text, StyleSheet} from 'react-native';
const Nota = ({}) => {
    return (
        <View style={styles.nota_sty}>
            <Text>TESTE</Text>
        </View>
    );
}; 
const styles = StyleSheet.create({
    nota_sty: {   
        width: 50,
        height: 50,
        borderRadius: '100%',
        opacity: 0.4,
    }
});
    export default Nota;