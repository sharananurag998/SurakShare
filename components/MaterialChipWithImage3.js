import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function MaterialChipWithImage3(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.batDocSize}>bat.doc{"\n"}Size</Text>
      <Image
        source={require("../assets/images/aniketh.jpg")}
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
  batDocSize: {
    fontSize: 13,
    color: "rgba(0,0,0,0.87)",
    paddingLeft: 8,
    paddingRight: 12,
    textAlign: "left"
  },
  leftImage: {
    height: 32,
    width: 32,
    backgroundColor: "#CCC",
    borderRadius: 16
  }
});

export default MaterialChipWithImage3;
