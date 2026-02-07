import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { BethanyContext } from "./ContextPRovider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {

    const {setIsLoggedIn} = useContext(BethanyContext);
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkLogin = () => {
        const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
        if (email == '') {
                    Alert.alert('Warning', 'Enter Email')
                } else if (!email.match(regex)) {
                    Alert.alert('Warning', 'Email should be in this format abc@xyz.com')
                } else if (password == '') {
                    Alert.alert('Warning', 'Enter Password')
                } else {
                    AsyncStorage.getItem('userLoggedIn', (err, res) => {
                        if(res != 'none') {
                            Alert.alert('Someone Else already logged in');
                            router.replace('/');
                        } else {
                            AsyncStorage.getItem(email, (err, res) => {
                                if(res != null) {
                                    const userJson = JSON.parse(res);
                                    if(password != userJson.password) {
                                        Alert.alert('Error', 'Incorrect Password');
                                    } else {
                                        AsyncStorage.setItem('userLoggedIn', email, () => {
                                            console.log('login succesful, pwd mattaching')
                                            setIsLoggedIn(true);
                                            router.push('/')
                                        })
                                    }
                                } else {
                                    Alert.alert(`No account for email ${email}`)
                                }
                            })
                        }
                    })
                }
                
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SIGN IN</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.text} value={email} onChangeText={setEmail} placeholder="Enter Email eg: abc@xyz.com" inputMode="email" />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.text} value={password} onChangeText={setPassword} placeholder="Enter Password" secureTextEntry={true}/>
                <TouchableOpacity onPress={checkLogin}>
                    <Text style={styles.button}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {router.replace('/')}}>
                    <Text style={styles.button}>CANCEL LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {router.replace('/Register')}}>
                    <Text style={styles.button}>CREATE ACCOUNT</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    title: {
        fontSize: 22,
        fontWeight: '900'
    },
    form: {
        paddingVertical: 20,
    },
    label: {
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center'
    },
    text: {
        borderWidth: 2,
        marginVertical: 10,
        height: 60,
        width: 300,
        paddingHorizontal: 10,
    },

    button: {
        fontSize: 16,
        paddingVertical: 10,
        textAlign: 'center',
        cursor: 'pointer'
    }
})