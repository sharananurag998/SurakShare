import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native";

function Login(props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect}
          imageStyle={styles.rect_imageStyle}
          source={require("../assets/images/Gradient_kZLqDAT.png")}
        >
          <View style={styles.logoColumn}>
            <View style={styles.logo}>
              <Text style={styles.surakShare}>SurakShare</Text>
              <View style={styles.surakShareFiller}></View>
              <View style={styles.rect7}></View>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignUp")}
              style={styles.button3}
            >
              <View style={styles.buttonFiller}></View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Channels")}
                style={styles.button}
              >
                <Text style={styles.text2}>Get Started</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View style={styles.logoColumnFiller}></View>
          <View style={styles.footerTexts}>
            <View style={styles.needHelpFiller}></View>
            <Text style={styles.needHelp}>Need Help?</Text>
          </View>
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
  rect: {
    flex: 1
  },
  rect_imageStyle: {},
  logo: {
    width: 102,
    height: 111,
    alignSelf: "center"
  },
  surakShare: {
    color: "rgba(255,255,255,1)",
    fontSize: 60,
    marginTop: 15,
    alignSelf: "center"
  },
  surakShareFiller: {
    flex: 1
  },
  rect7: {
    height: 7,
    backgroundColor: "rgba(144,19,254,1)",
    marginBottom: 9,
    marginLeft: -65,
    marginRight: -67
  },
  button3: {
    height: 59,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 50,
    opacity: 0.87,
    marginTop: 170
  },
  buttonFiller: {
    flex: 1
  },
  button: {
    height: 59,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    justifyContent: "center"
  },
  text2: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  logoColumn: {
    marginTop: 130,
    marginLeft: 41,
    marginRight: 41
  },
  logoColumnFiller: {
    flex: 1
  },
  footerTexts: {
    height: 14,
    flexDirection: "row",
    marginBottom: 41,
    marginLeft: 143,
    marginRight: 144
  },
  needHelpFiller: {
    flex: 1,
    flexDirection: "row"
  },
  needHelp: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "flex-end",
    marginRight: -1
  }
});

export default Login;
