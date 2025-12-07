import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DiasSelector = () => {
    const dias = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    
    return (
        <View style={styles.container}>
            {dias.map((dia, index) => (
                <TouchableOpacity key={index} style={styles.diaButton}>
                    <Text style={styles.diaText}>{dia}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    diaButton: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#3f516e',
    },
    diaText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default DiasSelector;