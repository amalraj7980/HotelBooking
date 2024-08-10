import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../constants';
import { isResponseIsValid, validateEmail } from '../../utils/helpers'; // Adjust the import path as needed
import { singnUpApiCall } from '../../utils/apiCalls';

const RegisterScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!fullName) {
            setFullNameError('Full name is required');
            return;
        } else {
            setFullNameError('');
        }

        if (!address) {
            setAddressError('Address is required');
            return;
        } else {
            setAddressError('');
        }

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
            const response = await singnUpApiCall({
                fullName: fullName,
                address: address,
                email: email,
                password: password,
            });
            if (isResponseIsValid(response)) {
                const userData = response;
                console.log("userData", userData)
                navigation.replace('Login');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const isButtonDisabled = !fullName || !address || !validateEmail(email) || password.length < 6 || loading;

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
                        value={fullName}
                        onChangeText={setFullName}
                        label="Full Name"
                        placeholder="Enter your full name"
                        error={fullNameError}
                        autoCapitalize="words"
                        style={styles.inputStyle}
                        onFocus={() => setFullNameError('')}
                        onBlur={() => !fullName && setFullNameError('Full name is required')}
                    />
                </View>
                <View style={styles.InputContainer}>
                    <CustomTextInput
                        value={address}
                        onChangeText={setAddress}
                        label="Address"
                        placeholder="Enter your address"
                        error={addressError}
                        autoCapitalize="none"
                        style={styles.inputStyle}
                        onFocus={() => setAddressError('')}
                        onBlur={() => !address && setAddressError('Address is required')}
                    />
                </View>
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
                        onBlur={() => !validateEmail(email) && setEmailError('Invalid email format')}
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
                    text="Register"
                    loading={loading}
                    onClick={handleRegister}
                    style={styles.button}
                    buttonDisable={isButtonDisabled} // Pass the disable state
                />
                <CustomButton
                    text="Go to Login"
                    onClick={() => navigation.navigate('Login')}
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
        paddingVertical: 2
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
        width: '100%',
        marginTop: 30,
        backgroundColor: 'transparent',
    },
    registerText: {
        color: Colors.secondaryColor,
    },
});

export default RegisterScreen;
