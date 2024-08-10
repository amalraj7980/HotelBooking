

import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Colors from '../constants/Theme';
import InfoIcon from "react-native-vector-icons/Foundation";

const CustomTextInput = ({ isPassword,onpressCalander,onPressIn, value, onChangeText, keyboardType, label, placeholder, error, style,maxLength,onFocus ,onBlur,editable = true,isIconNotNeeded,autoCapitalize,isMandatory, info = false,iconClick,profileUpdatePage=false}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container,{marginVertical:profileUpdatePage == true? 11.5: 14}]} onPress={onpressCalander}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        label={label}
        maxLength={maxLength}
        error={error ? true : false}
        secureTextEntry={(isPassword && !showPassword) || isIconNotNeeded}
        onPressIn={onPressIn}
        style={styles.input}
        theme={{
          colors: {
            primary: Colors.darkBlueColor,
            error:value =="" && isFocused == false ? Colors.greyColor :Colors.darkBlueColor
          },
        }}

        labelStyle={{
          color: (value || isFocused) ? Colors.darkBlueColor : Colors.greyColor, // Set label color to dark blue if value is present or input is focused
        }}
        editable={editable}
        autoCapitalize={autoCapitalize}

        onFocus={() => {
          setIsFocused(true);
          onFocus && onFocus();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur && onBlur();
        }}
        right={
          info == true ? (
            <TextInput.Icon
              icon={() => (
                <InfoIcon name={"info"} color={Colors.greyColor} size={25} />
              )}
              onPress={iconClick}
            />
          ) : null
        }
      />
      {isPassword && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}
        >
        </TouchableOpacity>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 6,
    minHeight: 40,
    maxHeight:42,
    alignItems: 'center',
    marginVertical: 11,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    fontSize:16,
    fontWeight: '400',
    color:Colors.primaryColor,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "left",
    paddingHorizontal: 10, 
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  errorText: {
    position: 'absolute',
    bottom: -25, 
    left: 0,
    color: 'red',
    fontSize: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 15,
    color: Colors.darkBlueColor,
  },
  asterisk: {
    color: 'red',
    fontSize:16,
    marginLeft: 2,
  },
});
export default CustomTextInput;
