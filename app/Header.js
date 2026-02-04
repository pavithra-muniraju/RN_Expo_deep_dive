import { StyleSheet, Text, View, Image } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const Header = () => {
    const logo = require("../assets/bethanys-pie-shop-logo_horiz-white.png");
    const router = useRouter();
    return(
        <View style={styles.header}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.menu} onPress={() => {router.replace("/About")}}>SHOP</Text>
            <Text style={styles.menu}>CONTACT</Text>
            <Text style={styles.menu}>REGISTER</Text>
            <AntDesign style={styles.menu} name='user' size={24} color='white' />
            <Feather style={styles.menu} name='shopping-cart' size={24} color='white' />
        </View>
    )
}
export default Header;

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#d77948',
        height: 80,
        width: '100%',
        flexDirection: 'row',
    },
    logo: {
        width: 95,
        height:30,
        marginRight: 5,
        marginLeft: 10
    },
    menu: {
        paddingLeft: 8,
        paddingRight: 8,
        color: 'white',
        fontWeight: 'bold'
    }
})