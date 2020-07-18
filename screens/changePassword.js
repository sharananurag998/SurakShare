import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import CupertinoButtonDanger from "../components/CupertinoButtonDanger";
import CupertinoButtonLight from "../components/CupertinoButtonLight";
import CupertinoButtonWhiteTextColor from "../components/CupertinoButtonWhiteTextColor";
import Svg, { Ellipse } from "react-native-svg";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

function changePassword(props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder=""
        keyboardType="default"
        defaultValue=""
        textBreakStrategy="simple"
        keyboardAppearance="default"
        secureTextEntry={true}
        maxLength={16}
        placeholderTextColor="rgba(0,0,0,1)"
        clearButtonMode="while-editing"
        style={styles.textInput}
      ></TextInput>
      <Text style={styles.currentPassword}>Current Password*</Text>
      <Text style={styles.newPassword}>New Password*</Text>
      <TextInput
        placeholder=""
        secureTextEntry={true}
        maxLength={16}
        placeholderTextColor="rgba(0,0,0,1)"
        style={styles.textInput2}
      ></TextInput>
      <Text style={styles.cofirmPassword}>Confirm Password*</Text>
      <TextInput
        placeholder=""
        secureTextEntry={true}
        maxLength={16}
        placeholderTextColor="rgba(0,0,0,1)"
        style={styles.placeholder}
      ></TextInput>
      <View style={styles.cupertinoButtonDangerRow}>
        <CupertinoButtonDanger
          style={styles.cupertinoButtonDanger}
        ></CupertinoButtonDanger>
        <TouchableOpacity onPress={()=>{props.navigation.goBack()}}>
        <CupertinoButtonLight
          style={styles.cupertinoButtonLight}
        ></CupertinoButtonLight></TouchableOpacity>
      </View>
      <View style={styles.cupertinoButtonWhiteTextColorRow}>
        <CupertinoButtonWhiteTextColor
          style={styles.cupertinoButtonWhiteTextColor}
        ></CupertinoButtonWhiteTextColor>
        <View style={styles.text3Stack}>
          <Text style={styles.text3}>
            Your password must contain 8+ charcters
          </Text>
          <Svg viewBox="0 0 1 3.66" style={styles.ellipse}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(230, 230, 230,1)"
              cx={1}
              cy={2}
              rx={1}
              ry={2}
            ></Ellipse>
          </Svg>
        </View>
      </View>
      <Text style={styles.changePassword}>Change Password</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(241,206,245,1)",
    borderWidth: 1,
    borderColor: "#000000",
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    width: 265,
    backgroundColor: "rgba(255,255,255,1)",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 100,
    letterSpacing: 5,
    marginTop: 224,
    marginLeft: 21,
  },
  currentPassword: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 31,
    width: 278,
    fontSize: 20,
    marginTop: -80,
    marginLeft: 29,
  },
  newPassword: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 34,
    width: 260,
    fontSize: 20,
    marginTop: 68,
    marginLeft: 29,
  },
  textInput2: {
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    height: 41,
    width: 265,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#fff",
    fontSize: 20,
    letterSpacing: 5,
    marginLeft: 21,
  },
  cofirmPassword: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 32,
    width: 218,
    fontSize: 20,
    marginTop: 33,
    marginLeft: 29,
  },
  placeholder: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    width: 265,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 100,
    letterSpacing: 5,
    fontSize: 20,
    marginTop: 5,
    marginLeft: 21,
  },
  cupertinoButtonDanger: {
    height: 44,
    width: 149,
  },
  cupertinoButtonLight: {
    height: 32,
    width: 100,
    backgroundColor: "rgba(155,155,155,1)",
    marginLeft: 13,
    marginTop: 12,
  },
  cupertinoButtonDangerRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 60,
    marginLeft: 24,
    marginRight: 74,
  },
  cupertinoButtonWhiteTextColor: {
    height: 24,
    width: 18,
  },
  text3: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(208,2,27,1)",
    height: 19,
    width: 230,
    transform: [
      {
        rotate: "0.49deg",
      },
    ],
    fontSize: 12,
  },
  ellipse: {
    top: 6,
    left: 6,
    width: 1,
    height: 4,
    position: "absolute",
  },
  text3Stack: {
    width: 230,
    height: 19,
    marginLeft: 9,
    marginTop: 7,
  },
  cupertinoButtonWhiteTextColorRow: {
    height: 26,
    flexDirection: "row",
    marginTop: -209,
    marginLeft: 26,
    marginRight: 77,
  },
  changePassword: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 63,
    width: 259,
    fontSize: 30,
    marginTop: -300,
    marginLeft: 49,
  },
});

export default changePassword;
