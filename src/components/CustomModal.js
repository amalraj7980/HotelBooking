import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomModal = ({
  isVisible,
  onClose,
  children,
  animationType = "slide",
  transparent = true,
  containerStyle = {},
  contentStyle = {},
  closeButtonStyle = {},
  closeButtonTextStyle = {},
  closeButtonText = "Close",
}) => {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, containerStyle]}>
        <View style={[styles.modalContent, contentStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  closeButtonText: {
    color: "blue",
  },
});

export default CustomModal;

