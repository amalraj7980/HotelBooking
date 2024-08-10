import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../constants';
import { isResponseIsValid, validateEmail } from '../../utils/helpers';
import { LoginApiCall } from '../../utils/apiCalls';
import { setUserInformation } from '../../utils/LocalStorage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            return;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            return;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        } else {
            setPasswordError('');
        }

        setLoading(true);
        try {
            const response = await LoginApiCall({
                email: email,
                password: password,
            });
            if (isResponseIsValid(response)) {
                const userData = response.data.access_token;
                console.log("userData in login", userData)
                await setUserInformation('access_token', userData);
                navigation.replace('HomeTabs');
                setLoading(false);

            }
            else if (response.status == 401) {
                Alert.alert("Please enter valid user name or password")

            }
            else {
                Alert.alert("Something went wrong")
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const isButtonDisabled = !validateEmail(email) || password.length < 6 || loading;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://logos-world.net/wp-content/uploads/2021/08/Booking-Logo.png' }}
                    style={styles.logo}
                />
                <View style={styles.InputContainer}>
                    <CustomTextInput
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        label="Email"
                        placeholder="Enter your email"
                        error={emailError}
                        autoCapitalize="none"
                        style={styles.inputStyle}
                        onFocus={() => setEmailError('')}
                        onBlur={() => !email && setEmailError('Email is required')}
                    />
                </View>
                <View style={styles.InputContainer}>
                    <CustomTextInput
                        value={password}
                        onChangeText={setPassword}
                        isPassword
                        label="Password"
                        placeholder="Enter your password"
                        error={passwordError}
                        autoCapitalize="none"
                        style={styles.inputStyle}
                        onFocus={() => setPasswordError('')}
                        onBlur={() => !password && setPasswordError('Password is required')}
                    />
                </View>
                <CustomButton
                    text="Login"
                    loading={loading}
                    onClick={handleLogin}
                    style={styles.button}
                    buttonDisable={isButtonDisabled}
                />
                <CustomButton
                    text="Go to Register"
                    onClick={() => navigation.navigate('Register')}
                    style={styles.registerButton}
                    Textstyle={styles.registerText}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
    },
    InputContainer: {
        paddingVertical: 5
    },
    inputStyle: {
        width: '100%',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        marginTop: 15,
    },
    registerButton: {
        width: "100%",
        marginTop: 30,
        backgroundColor: "transparent"
    },
    registerText: {
        color: Colors.secondaryColor,
    },
});

export default LoginScreen;
