import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function MaterialChipWithImage4(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.chipText}>123.pdf{"\n"}Size</Text>
      <Image
        source={require("../assets/images/aniketh1.jpg")}
        style={styles.leftImage}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(230,230,230)",
    borderRadius: 50,
    flexDirection: "row"
  },
  chipText: {
    fontSize: 13,
    color: "rgba(0,0,0,0.87)",
    paddingLeft: 8,
    paddingRight: 12
  },
  leftImage: {
    height: 32,
    width: 32,
    backgroundColor: "#CCC",
    borderRadius: 16
  }
});

export default MaterialChipWithImage4;
