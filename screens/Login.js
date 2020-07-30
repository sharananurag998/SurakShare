import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

function Login(props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.background}>
      <LinearGradient
          colors={["#A88BEB", "#F8CEEC"]}

          start={[0.1, 0.1]}
          style={styles.linearGradient}
        >
          <View style={styles.imageColumn}>
            <ImageBackground
              source={require("../assets/images/LogoMakr_0bZCza.png")}
              resizeMode="contain"
              style={styles.image}
              imageStyle={styles.image_imageStyle}
            >
            </ImageBackground>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignUp")}
              style={styles.button3}
            >
              <Text style={styles.text2}>Sign Up</Text>

            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => props.navigation.navigate("LoginForm")}
              style={styles.loginButton}
            >
              <Text style={styles.text2}>Log In</Text>

            </TouchableOpacity>
          </View>
          <View style={styles.imageColumnFiller}></View>
          <View style={styles.footerTexts}>
            <View style={styles.needHelpFiller}></View>
            <Text style={styles.needHelp}>Need Help?</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    flex: 1
  },
  rect: {
    flex: 1
  },
  rect_imageStyle: {},
  image: {
    width: 311,
    height: 182
  },
  image_imageStyle: {},
  sharingSecured: {
    fontFamily: "roboto-regular",
    color: "rgba(23,173,234,1)",
    marginTop: 113,
    marginLeft: 191
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
    backgroundColor: "rgba(31,178,204,1)",
    marginTop: 136,
    marginLeft: 17,
    marginRight: 16,
    justifyContent: "center"
  },
  loginButton: {
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
    backgroundColor: "rgba(31,178,204,1)",
    marginTop: 16,
    marginLeft: 17,
    marginRight: 16,
    justifyContent: "center"
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
  imageColumn: {
    marginTop: 142,
    marginLeft: 24,
    marginRight: 25
  },
  imageColumnFiller: {
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
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Login;
