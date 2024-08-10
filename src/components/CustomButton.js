import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Image,
     } from "react-native";
  import React from "react";
  import { Colors } from "../constants/Theme";
  import Ionicons from "react-native-vector-icons/Ionicons";
  const { width } = Dimensions.get("window");
  
  const CustomButton = ({
    text = "",
    buttonDisable = false,
    loading = false,
    onClick,
    showPlusIcon = false,
    subTextStatus = false,
    style,
    Textstyle,
    subTextStyle,
    subText
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={loading || buttonDisable}
        style={[
          styles.buttonView,
          {
            backgroundColor: loading
              ? Colors.buttonLoadingColor
              : buttonDisable
              ? Colors.buttonDisableColor
              : Colors.darkBlueColor,
          },
          style,
        ]}
        onPress={onClick}
      >
        {loading ? (
          <ActivityIndicator color={Colors.whiteColor} size="small" />
        ) : (
          <View style={{ alignItems: "center", flexDirection: subTextStatus ? "column" : "row", justifyContent: "center" }}>
            {showPlusIcon && (
              <Ionicons
                name="add-circle"
                size={24}
                color={Colors.whiteColor}
                style={{ marginRight: 5 }}
              />
            )}
            <Text
              style={[
                styles.buttonText,
                { color: buttonDisable ? Colors.greyColor : Colors.whiteColor },
                Textstyle,
              ]}
            >
              {text}
            </Text>
            {subTextStatus && (
              <Text style={subTextStyle}>
                {subText}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    buttonView: {
      height: 42,
      width: width - 20,
      alignSelf: "center",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 15,
      color: Colors.whiteColor,
    },
  });
  
  export default CustomButton;
  