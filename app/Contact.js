import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
const windowDimensions = Dimensions.get('window').height
const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(0);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const submitForm = () => {
        const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
        console.log(name);
        if (name == '') {
            Alert.alert("Warning", "Please enter Name");
            // } else if(email == '') { 
            Alert.alert("Warning", "Please enter Email");
        } else if (!email.match(regex)) {
            Alert.alert("Warning", "Email should be in the following format: abc@xyz.com");
        } else if (phone == '') {
            Alert.alert("Warning", "Please enter Phone No");
        } else if (message == '') {
            Alert.alert("Warning", "Please enter Message");
        } else {
            Alert.alert(email, message);
            router.replace("/");
        }
        
    }
    return (
        <View style={styles.container}>

            <Image source={require("../assets/shutterstock_1010583892.jpg")} style={styles.image} />

            <ScrollView contentContainerStyle={styles.formView}>
                <Text style={styles.formTitle}>CONTACT US</Text>
                <Text style={styles.label}>Name</Text>
                <TextInput value={name} onChangeText={setName} style={styles.text} placeholder="Enter Name" />
                <Text style={styles.label}>Email</Text>
                <TextInput value={email} onChangeText={setEmail} style={styles.text} placeholder="Enter Email eg: abc@gmail.com" />
                <Text style={styles.label}>Phno</Text>
                <TextInput value={phone} onChangeText={setPhone} style={styles.text} placeholder="Enter Phone #" keyboardType="numeric" inputMode="tel" />
                <Text style={styles.label}>Message</Text>
                <TextInput value={message} onChangeText={setMessage} style={[styles.text, styles.messgae]} placeholder="Leave a Messgae"
                    multiline={true} textAlignVertical="top" />
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={submitForm}>
                        <Text style={[styles.backbutton, styles.submit]}  >Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text onPress={() => { router.replace('/') }} style={styles.backbutton} >Cancel</Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>
        </View>
    )
}

export default Contact;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: "center",
        // marginVertical: 10,
        height: windowDimensions - 150,
        paddingBottom: 100
    },
    formView: {
        alignItems: 'center',
    },
    formTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    image: {
        width: '100%',
        ...Platform.select({
            android: {
                height: 200,
            },
            ios: {
                height: 200
            },
            default: {
                height: 400
            }
        })
    },
    label: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        // marginVertical: 10,
    },
    text: {
        borderWidth: 2,
        marginVertical: 10,
        height: 60,
        width: 300,
        paddingHorizontal: 10,
    },
    messgae: {
        height: 160,
    },
    backbutton: {
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontWeight: '900',
        fontSize: 20,
        color: 'red',
        cursor: 'pointer',
    },
    buttons: {
        flexDirection: 'row',
        textAlign: 'center'
    },
    submit: {
        color: 'blue'
    }
})