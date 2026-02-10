import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from "react-native";
import {  Feather, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { BethanyContext } from "./ContextPRovider";
const Header = () => {
    const logo = require("../assets/bethanys-pie-shop-logo_horiz-white.png");
    const router = useRouter();

    const {toggleLogin, getUser, isLoggedIn, toggleCart, cartLoaded, getCartCount} = useContext(BethanyContext);

    useEffect(() => {
        getUser();
    }, [isLoggedIn, cartLoaded]);

    let display = isLoggedIn ? <FontAwesome name="user-circle-o" size={24} color="black" /> : <FontAwesome name="user-circle-o" size={24} color="white" />;
    let cart = cartLoaded ?   <Feather name='shopping-cart' size={24} color='black' /> : <Feather name='shopping-cart' size={24} color='white' /> 
    
    return(
        <View style={styles.header}>
            <TouchableWithoutFeedback onPress={() => {router.replace("/")}}>
                <Image source={logo} style={styles.logo}  />
            </TouchableWithoutFeedback>            
            <Text style={styles.menu} onPress={() => {router.replace("/Shop")}}>SHOP</Text>
            <Text style={styles.menu} onPress={() => {router.replace("/Contact")}}>CONTACT</Text>
            <Text style={styles.menu} onPress={() => {router.replace("/Register")}}>REGISTER</Text>
            <Text style={styles.menu} onPress={toggleLogin}>{display}</Text>
            <Text style={styles.menu} onPress={toggleCart}>{cart}</Text>
            {/* <AntDesign style={styles.menu} name='user' size={24} color='white' onPress={() => {router.replace("/Login")}} /> */}
           
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
        marginLeft: 10,
        cursor: 'pointer'
    },
    menu: {
        paddingLeft: 8,
        paddingRight: 8,
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
})