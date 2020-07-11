import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Center } from "@builderx/utils";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

function ScrollViewEntry(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text2}>
        SpaceX goes to Mars: To setup establishment by 2040
      </Text>
      <View style={styles.rect2}>
        <Center vertical>
          <IoniconsIcon name="ios-globe" style={styles.icon}></IoniconsIcon>
        </Center>
        <Center vertical>
          <Text style={styles.text3}>SPACE.com</Text>
        </Center>
        <Center vertical>
          <EvilIconsIcon name="clock" style={styles.icon2}></EvilIconsIcon>
        </Center>
        <Center vertical>
          <Text style={styles.text4}>Oct 5, 2019</Text>
        </Center>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text2: {
    top: 9,
    left: "6.12%",
    width: "88.79%",
    height: 56,
    color: "#121212",
    position: "absolute",
    fontSize: 16,
    lineHeight: 20
  },
  rect2: {
    top: "60.77%",
    left: "6.14%",
    width: "76.16%",
    position: "absolute",
    bottom: 19
  },
  icon: {
    left: 0,
    position: "absolute",
    color: "grey",
    fontSize: 18
  },
  text3: {
    left: "11.31%",
    color: "#121212",
    position: "absolute",
    fontSize: 14
  },
  icon2: {
    left: "52.59%",
    position: "absolute",
    color: "grey",
    fontSize: 18
  },
  text4: {
    left: "65.23%",
    height: 14,
    color: "#121212",
    position: "absolute",
    fontSize: 14
  }
});

export default ScrollViewEntry;
