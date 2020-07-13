import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function MaterialChipWithImage5(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require("../assets/images/SAVE_20180906_2411122.jpg")}
        style={styles.leftImage}
      ></Image>
      <Text style={styles.abcDocSize}>abc.doc{"\n"}Size</Text>
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
  leftImage: {
    height: 32,
    width: 32,
    backgroundColor: "#CCC",
    borderRadius: 16
  },
  abcDocSize: {
    fontSize: 13,
    color: "rgba(0,0,0,0.87)",
    paddingLeft: 8,
    paddingRight: 12,
    textAlign: "left"
  }
});

export default MaterialChipWithImage5;
