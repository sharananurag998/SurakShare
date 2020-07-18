import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

function CupertinoButtonWhiteTextColor(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Icon name="question" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 23
  }
});

export default CupertinoButtonWhiteTextColor;
