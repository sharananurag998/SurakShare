import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import UntitledComponent from "./UntitledComponent";

function MaterialChipWithImage2(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require("../assets/images/SAVE_20180906_2411121.jpg")}
        style={styles.leftImage}
      ></Image>
      <UntitledComponent style={styles.untitledComponent}></UntitledComponent>
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
  untitledComponent: {
    height: 33,
    width: 59
  }
});

export default MaterialChipWithImage2;
