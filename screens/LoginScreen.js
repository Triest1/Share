import React from "react";
import { View, TextInput, Text, TouchableOpacity, ImageBackground } from "react-native";
import style from "../styles/LoginStyle";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../config/firebase.config";
import { useState } from "react";

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onPressLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigation.navigate('Home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert(errorMessage);
        });
       
    }

    return (
        <ImageBackground
            source={require('https://img.freepik.com/free-vector/blue-fluid-background-frame_53876-99019.jpg?w=740&t=st=1700896295~exp=1700896895~hmac=6274fb8e3acdd304bff54fa0e46d7e04eb76f6dfc51dab5596b76e9367dbef43')} // Adjust the path accordingly
            style={style.backgroundImage}
        >
            <View style={style.container}>
                <View style={style.inputGroup}>
                    <Text>Email</Text>
                    <TextInput 
                        onChangeText={(val) => setEmail(val)}
                        value={email}
                        placeholder="Enter your email address"
                        keyboardType="email-address"
                        style={style.input}
                    />
                </View>
                <View style={style.inputGroup}>
                    <Text>Password</Text>
                    <TextInput 
                        onChangeText={(val) => setPassword(val)}
                        value={password}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        style={style.input}
                    />
                </View>
                <TouchableOpacity 
                    onPress={onPressLogin}
                    style={style.button}>
                    <Text style={style.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default LoginScreen;
