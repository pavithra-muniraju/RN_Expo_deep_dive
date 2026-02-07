import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const Register = () => {

    const router = useRouter();
    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    const checkRegister = () => {
        const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
        if (fName == '') {
            Alert.alert('Warning', 'Enter First Name')
        } else if (lName == '') {
            Alert.alert('Warning', 'Enter Last Name')
        } else if (email == '') {
            Alert.alert('Warning', 'Enter Email')
        } else if (!email.match(regex)) {
            Alert.alert('Warning', 'Email should be in this format abc@xyz.com')
        } else if (password == '') {
            Alert.alert('Warning', 'Enter Password')
        } else if (password !== cPassword) {
            Alert.alert('Warning', 'Password and Confirm Password Do Not Match')
        } else {    
            AsyncStorage.getItem(email, (err, res) => {
                if (res !== null) {
                    Alert.alert(`${email} user already exists`)
                } else {
                    let user = {
                        fname: fName,
                        lName: lName,
                        password: password
                    };
                    const userJson = JSON.stringify(user);
                    AsyncStorage.setItem(email, userJson, () => {
                        Alert.alert('Success', 'User Registerd Succesfully, Login to Continue');
                        router.replace("/Login")
                    })
                }
            })

        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>REGISTER</Text>
            <ScrollView>

                <View style={styles.form}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput style={styles.text} value={fName} onChangeText={setFname} placeholder="Enter First Name" />

                    <Text style={styles.label}>Last Name</Text>
                    <TextInput style={styles.text} value={lName} onChangeText={setLname} placeholder="Enter Last Name" />

                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.text} value={email} onChangeText={setEmail} placeholder="Enter Email eg: abc@xyz.com" inputMode="email" />
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.text} value={password} onChangeText={setPassword} placeholder="Enter Password" secureTextEntry={true} />

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.text} value={cPassword} onChangeText={setCPassword} placeholder="Confirm Password" secureTextEntry={true} />

                    <TouchableOpacity onPress={checkRegister}>
                        <Text style={styles.button}>REGISTER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { router.replace('/') }}>
                        <Text style={styles.button}>CANCEL REGISTER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { router.replace('/Login') }}>
                        <Text style={styles.button}>LOGIN</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}

export default Register;

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