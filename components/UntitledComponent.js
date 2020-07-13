import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function UntitledComponent(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.dateTime1}>Date, time</Text>
      <Text style={styles.abcPngSize}>
        {props.abcPngSize || "abc.png\nSize"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  dateTime1: {
    top: 255,
    left: 64,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 17
  },
  abcPngSize: {
    fontSize: 13,
    color: "rgba(0,0,0,1)",
    paddingLeft: 8,
    paddingRight: 12
  }
});

export default UntitledComponent;
