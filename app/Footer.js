import { useRouter } from "expo-router";
import { StyleSheet, Text, View, Platform, Dimensions, Image } from "react-native"
import * as WebBrowser from 'expo-web-browser';
const windowDimensions = Dimensions.get('window');
const windowHeight = windowDimensions.height;
const smallLogo = require("../assets/bethanys-pie-shop-logo_extra-4-black.png");

// cn be use dto visit any external link
const youtube = () => {
    WebBrowser.openBrowserAsync('https://www.youtube.com/@pluralsight');    
}
const Footer = () => {
    const router = useRouter()
    return(
        <View style={styles.footer}>
            <Image source={smallLogo} style={styles.logo} />
            <Text style={styles.menu} onPress={() => {router.push('/About')}}>ABOUT</Text>
            <Text style={styles.menu} onPress={() => {router.push('/News')}}>NEWS</Text>
            <Text style={styles.menu} onPress={() => {router.push('/Blog')}}>BLOG</Text>
            <Text style={styles.menu} onPress={youtube}>YOUTUBE</Text>
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