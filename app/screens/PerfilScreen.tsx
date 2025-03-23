import React from "react";
import { Text, View, StyleSheet} from "react-native";


const PerfilScreen = () => {
    return(
        <View>
            <Text>My Perfil Screen</Text>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        
    }

});

export default PerfilScreen;