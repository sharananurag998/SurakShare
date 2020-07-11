import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import LogoHeader from "./LogoHeader";
import FeatherIcon from "react-native-vector-icons/Feather";

function HeaderX(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.group}>
        <MaterialIconsIcon
          name="dehaze"
          style={styles.icon}
        ></MaterialIconsIcon>
        <LogoHeader style={styles.logoHeader}></LogoHeader>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          onPress={() => console.log("Navigate to Settings")}
          style={styles.button}
        >
          <FeatherIcon
            name={props.icon2Name || "settings"}
            style={styles.icon2}
          ></FeatherIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(31,178,204,1)"
  },
  group: {
    height: 55,
    backgroundColor: "rgba(146,23,255,1)"
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    width: 18,
    height: 25,
    marginTop: 15,
    marginLeft: 10
  },
  logoHeader: {
    width: 168,
    height: 44,
    marginTop: -9
  },
  button: {
    width: 25,
    height: 25,
    alignSelf: "flex-end",
    marginTop: 9,
    marginRight: 10
  },
  icon2: {
    color: "rgba(250,250,250,1)",
    fontSize: 25
  }
});

export default HeaderX;
