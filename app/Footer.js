import { useRouter } from "expo-router";
import { StyleSheet, Text, View, Platform, Dimensions, Image } from "react-native"

const windowDimensions = Dimensions.get('window');
const windowHeight = windowDimensions.height;
const smallLogo = require("../assets/bethanys-pie-shop-logo_extra-4-black.png")
const Footer = () => {
    const router = useRouter()
    return(
        <View style={styles.footer}>
            <Image source={smallLogo} style={styles.logo} />
            <Text style={styles.menu} onPress={() => {router.push('/About')}}>ABOUT</Text>
            <Text style={styles.menu}>NEWS</Text>
            <Text style={styles.menu}>BLOG</Text>
        </View>
    )
}
export default Footer;

const styles = StyleSheet.create({
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d77948',
        height: 50,
        width: '100%',
        flexDirection: 'row',
        ...Platform.select({
            android: {
                position: 'absolute',
                top: windowHeight - 70
            },
            default: {
                position: 'relative',
                bottom: 0
            }
        })
        
    },
    logo: {
        height: 30,
        width: 30,
        ...Platform.select({
            android: {
                marginLeft: 23,
            },
            default: {
                left: '-35%'
            }
        })
    },
    menu: {
        paddingLeft: 25,
        paddingRight: 25,
        color: 'white',
        fontWeight: '700'
    }
})