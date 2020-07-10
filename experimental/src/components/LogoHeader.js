import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function LogoHeader(props) {
  return (
    <View style={[styles.root, props.style]}>
      <Text style={styles.text5}>bx</Text>
      <View style={styles.rect8}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  text5: {
    top: 0,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 36,
    left: 1
  },
  rect8: {
    top: 38,
    left: 0,
    backgroundColor: "rgba(5,5,5,1)",
    position: "absolute",
    right: 0,
    bottom: 1
  }
});

export default LogoHeader;
