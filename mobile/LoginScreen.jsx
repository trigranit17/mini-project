import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/backend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred while logging in');
            }

            console.log('Login successful:', data);
            AsyncStorage.setItem('userToken', data.token);
            navigation.replace('Dashboard'); 
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"/>
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry="secureTextEntry"/> {
                errorMessage
                    ? <Text style={styles.error}>{errorMessage}</Text>
                    : null
            }
            <Button title="Login" onPress={handleLogin}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10
    },
    error: {
        color: 'red',
        marginBottom: 12
    }
});

export default LoginScreen;
