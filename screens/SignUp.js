import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

import { CommonActions } from '@react-navigation/native';

import SyncStorage from 'sync-storage';

function SignUp(props) {

  const storeData = (name, email, password) => {
    try {
      SyncStorage.set('name', name);
      SyncStorage.set('email', email);
      SyncStorage.set('password', password);
      SyncStorage.set('isLoggedIn', "true");
    } catch (e) {
        alert("Can't save user");
    }
  }

  var name, email, password = "";

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.background}>
          <View style={styles.text3Column}>
            <Text style={styles.text3}>CREATE ACCOUNT</Text>
            <View style={styles.iconSpace}></View>
            <View style={styles.form}>
              <View style={styles.nameColumn}>
                <View style={styles.name}>
                  <EvilIconsIcon
                    name="user"
                    style={styles.icon5}
                  ></EvilIconsIcon>
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={false}
                    style={styles.nameInput}
                    onChangeText={(text) => name=text}
                  ></TextInput>
                </View>
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
                    onChangeText={(text) => email=text}
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
                  onChangeText={(text) => password=text}
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={styles.text3ColumnFiller}></View>
          <View style={styles.buttonColumn}>
            <TouchableOpacity
              onPress={()=>{
                if(name=="" || email == "" ||password==""){
                  alert("Please enter all details")
                }
                else{
                  storeData(name,email, password);
                  props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        { name: 'SurakShare' },
                      ],
                    })
                  );
                }
              }}
              style={styles.button}
            >
              <Text style={styles.text2}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.text4}>Terms &amp; Conditions</Text>
          </View>
        {/* </ImageBackground> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#788eec"
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
  iconSpace:{
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
    height: 35,
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
    marginTop: 27
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
    backgroundColor: "rgba(247,247,247,0)",
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

export default SignUp;
