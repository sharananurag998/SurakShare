import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from 'react-native-linear-gradient';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import SyncStorage from 'sync-storage';

function LoginForm(props) {
  var entered_email = "";
  var entered_pass = "";
  const verifyCredentials = (email, password) => {
    try {
      const storedemail = SyncStorage.get('email');
      const storedpass = SyncStorage.get('password');
      if(email == storedemail && password == storedpass)
        SyncStorage.set('isLoggedIn', "true");
      else{
        alert(`Invalid username or password : ${storedemail}`);
      }
    } catch (e) {
        alert("Invalid username or password");
    }
  }

  return (
    
    <View style={styles.background}>
    <ImageBackground
      style={styles.rect2}
      imageStyle={styles.rect2_imageStyle}
      source={require("../assets/images/Gradient_OBnqoPE.png")}
    >
      <View style={styles.text3Column}>
        <Text style={styles.text3}>LOGIN</Text>
        
        <View style={styles.form}>
            <View style={styles.email}>
              <EvilIconsIcon
                name="envelope"
                style={styles.icon6}
              ></EvilIconsIcon>
              <TextInput
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,1)"
                secureTextEntry={false}
                style={styles.emailInput}
                onChangeText={(text) => {
                  email=text;
                  entered_email = text;
                }}
              ></TextInput>
            </View>
          </View>
          <View style={styles.nameColumnFiller}></View>
          <View style={styles.password}>
            <EvilIconsIcon name="lock" style={styles.icon7}></EvilIconsIcon>
            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,1)"
              secureTextEntry={true}
              style={styles.passwordInput}
              onChangeText={(text) => 
                {
                  password=text;
                  entered_pass=text;
                }}
            ></TextInput>
          </View>
        </View>
      <View style={styles.text3ColumnFiller}></View>
      <View style={styles.buttonColumn}>
        <TouchableOpacity
          style={styles.button}
          onPress = {()=>{
            verifyCredentials(entered_email, entered_pass);
          }}
        >
          <Text style={styles.text2}>Continue</Text>
        </TouchableOpacity>
        <Text style={styles.text4}>Terms &amp; Conditions</Text>
      </View>
    </ImageBackground>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent: "center",
      // alignItems: "center",
      backgroundColor: "#F5FCFF", 
    },
    input: {
      margin: 15,
      height: 40,
      color:"white",
      borderColor: "white",
      borderWidth: 1
    },
    submitButton: {
      backgroundColor: "rgb(91, 10, 145)",
      padding: 10,
      margin: 15,
      alignItems: "center",
      height: 40
    },
    submitButtonText: {
      color: "white"
    },
    linearGradient: {
      width: '100%',
      height: '100%',
      opacity: 0.95,
      justifyContent: 'center',
    },
    background: {
      flex: 1
    },
    rect2: {
      flex: 1
    },
    rect2_imageStyle: {},
    text3: {
      color: "rgba(255,255,255,1)",
      fontSize: 24,
      alignSelf: "center"
    },
    icon8: {
      color: "rgba(128,128,128,1)",
      fontSize: 105,
      height: 114,
      width: 105,
      marginTop: 28,
      marginLeft: 87
    },
    form: {
      height: 230,
      borderRadius: 70,
      marginTop: 36
    },
    name: {
      height: 59,
      backgroundColor: "rgba(255,255,255,0.25)",
      borderRadius: 5,
      flexDirection: "row"
    },
    icon5: {
      color: "rgba(255,255,255,1)",
      fontSize: 33,
      width: 33,
      height: 33,
      marginLeft: 15,
      alignSelf: "center"
    },
    nameInput: {
      height: 30,
      color: "rgba(255,255,255,1)",
      fontSize: 14,
      flex: 1,
      marginRight: 17,
      marginLeft: 13,
      marginTop: 14
    },
    email: {
      height: 59,
      backgroundColor: "rgba(255,255,255,0.25)",
      borderRadius: 5,
      flexDirection: "row",
      marginTop: 120
    },
    icon6: {
      color: "rgba(255,255,255,1)",
      fontSize: 33,
      marginLeft: 15,
      alignSelf: "center"
    },
    emailInput: {
      height: 35,
      color: "rgba(255,255,255,1)",
      flex: 1,
      marginRight: 17,
      marginLeft: 13,
      marginTop: 14
    },
    nameColumn: {},
    nameColumnFiller: {
      flex: 1
    },
    password: {
      height: 59,
      backgroundColor: "rgba(255,255,255,0.25)",
      borderRadius: 5,
      flexDirection: "row"
    },
    icon7: {
      color: "rgba(255,255,255,1)",
      fontSize: 33,
      marginLeft: 15,
      marginTop: 13
    },
    passwordInput: {
      height: 35,
      color: "rgba(255,255,255,1)",
      flex: 1,
      marginRight: 17,
      marginLeft: 13,
      marginTop: 14
    },
    text3Column: {
      marginTop: 90,
      marginLeft: 41,
      marginRight: 41
    },
    text3ColumnFiller: {
      flex: 1
    },
    button: {
      height: 55,
      backgroundColor: "rgb(91, 10, 145)",
      borderRadius: 100,
      borderColor: "rgba(255,255,255,1)",
      borderWidth: 1,
      justifyContent: "center",
      marginBottom: 55
    },
    text2: {
      width: 66,
      color: "rgba(255,255,255,1)",
      alignSelf: "center"
    },
    text4: {
      color: "rgba(255,255,255,0.5)",
      alignSelf: "center"
    },
    buttonColumn: {
      marginBottom: 31,
      marginLeft: 41,
      marginRight: 41
    }
  });

  export default LoginForm; 