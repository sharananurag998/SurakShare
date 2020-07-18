import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function MaterialToast4(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text1}>
        Multiline Text added to the toast of BuilderX
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>UNDO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 288,
    backgroundColor: "#323232",
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 2,
    flexDirection: "row"
  },
  text1: {
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(255,255,255,1)",
    paddingRight: 24,
    paddingTop: 24,
    paddingBottom: 24
  },
  button: {
    alignSelf: "flex-end",
    marginBottom: 14
  },
  buttonText: {
    color: "#4CAF50",
    fontSize: 14
  }
});

export default MaterialToast4;
