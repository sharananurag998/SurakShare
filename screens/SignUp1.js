import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text
} from "react-native";

import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialButtonSuccess from "../components/MaterialButtonSuccess";
import MaterialButtonDanger1 from "../components/MaterialButtonDanger1";

function SignUp1(props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect2}
          imageStyle={styles.rect2_imageStyle}
          source={require("../assets/images/Gradient_OBnqoPE.png")}
        >
          <MaterialCommunityIconsIcon
            name="account-circle"
            style={styles.icon8}
          ></MaterialCommunityIconsIcon>
          <View style={styles.icon9Row}>
            <MaterialCommunityIconsIcon
              name="circle-edit-outline"
              style={styles.icon9}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.username}>username</Text>
          </View>
          <MaterialButtonSuccess style={styles.send}></MaterialButtonSuccess>
          <MaterialButtonDanger1 style={styles.receive}></MaterialButtonDanger1>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(144,19,254,1)"
  },
  background: {
    flex: 1
  },
  rect2: {
    flex: 1
  },
  rect2_imageStyle: {},
  icon8: {
    color: "rgba(128,128,128,1)",
    fontSize: 105,
    height: 114,
    width: 105,
    marginTop: 81,
    marginLeft: 122
  },
  icon9: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 43,
    width: 40
  },
  username: {
    fontFamily: "roboto-regular",
    color: "rgba(247,232,232,1)",
    fontSize: 35,
    marginLeft: 12
  },
  icon9Row: {
    height: 43,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 45,
    marginRight: 108
  },
  send: {
    height: 46,
    width: 128,
    marginTop: 95,
    marginLeft: 110
  },
  receive: {
    height: 43,
    width: 128,
    marginTop: 62,
    marginLeft: 110
  }
});

export default SignUp1;
