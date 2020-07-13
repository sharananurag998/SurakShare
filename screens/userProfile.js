import { globalStyles } from '../styles/global';
import React, { Component } from "react";
import {StyleSheet, View, ScrollView, TouchableOpacity, Text, StatusBar} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Svg, { Ellipse } from "react-native-svg";
import FeatherIcon from "react-native-vector-icons/Feather";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";


export default function Home() {
    return(
<View style={styles.container}>
  <View style={styles.rect5}>
    <View style={styles.ellipseStackRow}>
      <View style={styles.ellipseStack}>
        <Svg viewBox="0 0 89.43 91.7" style={styles.ellipse}>
          <Ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            cx={45}
            cy={46}
            rx={45}
            ry={46}
            fill="rgba(230, 230, 230,1)"
          ></Ellipse>
        </Svg>
        <FeatherIcon name="plus-circle" style={styles.icon6}></FeatherIcon>
      </View>
      <View style={styles.UserColumn}>
        <Text style={styles.Name}>Adarsh Nair</Text>
        <Text style={styles.username}>adarshnair210</Text>
      </View>
      <SimpleLineIconsIcon
        name="pencil"
        style={styles.icon3}
      ></SimpleLineIconsIcon>
    </View>
  </View>
  <View style={styles.scrollAreaStack}>
  <ScrollView horizontal="false">
    <View style={styles.rect}>
      <Text style={styles.emailId}>Email ID</Text>
      <Text style={styles.loremIpsum}>adarshnair210@gmail.com</Text>
    </View>
    <TouchableOpacity style={styles.button}>
      <View style={styles.changePasswordRow}>
        <Text style={styles.changePassword}>Change Password</Text>
        <EntypoIcon
          name="chevron-small-right"
          style={styles.icon}
        ></EntypoIcon>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button2}>
      <View style={styles.groupsRow}>
        <Text style={styles.groups}>Groups</Text>
        <FontAwesomeIcon
          name="group"
          style={styles.icon4}
        ></FontAwesomeIcon>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button3}>
      <View style={styles.recentDevicesRow}>
        <Text style={styles.recentDevices}>Recent Devices</Text>
        <MaterialCommunityIconsIcon
          name="monitor-cellphone"
          style={styles.icon5}
        ></MaterialCommunityIconsIcon>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button4}>
      <View style={styles.logOutRow}>
        <Text style={styles.logOut}>Log Out</Text>
          <IoniconsIcon name="ios-exit" style={styles.icon2}/>
      </View>
    </TouchableOpacity>
    </ScrollView>
  </View>
</View>
    ); 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(124,25,202,1)",
    borderWidth: 0,
    borderColor: "#000000"
  },
  scrollArea: {
    top: 0,
    left: 0,
    width: 360,
    height: 504,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    opacity: 0
  },
  scrollArea_contentContainerStyle: {
    height: 504,
    width: 360
  },
  button4: {
    width: 322,
    height: 78,
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 21,
    flexDirection: "row",
    marginTop: 411,
    marginLeft: 19
  },
  logOut: {
    color: "#121212",
    fontSize: 18,
    marginTop: 12
  },
  icon2: {
    color: "rgba(19,18,18,1)",
    fontSize: 40,
    height: 44,
    width: 32,
    marginLeft: 172
  },
  logOutRow: {
    height: 44,
    flexDirection: "row",
    flex: 1,
    marginRight: 20,
    marginLeft: 30,
    marginTop: 17
  },
  rect: {
    top: 20,
    width: 322,
    height: 78,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 21,
    left: 19
  },
  emailId: {
    color: "#121212",
    fontSize: 18,
    marginTop: 18,
    marginLeft: 27
  },
  loremIpsum: {
    color: "#121212",
    fontSize: 16,
    marginTop: 6,
    marginLeft: 27
  },
  button: {
    top: 122,
    width: 322,
    height: 78,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 21,
    left: 19,
    flexDirection: "row"
  },
  changePassword: {
    color: "#121212",
    fontSize: 18,
    marginTop: 11
  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    height: 44,
    width: 40,
    marginLeft: 85
  },
  changePasswordRow: {
    height: 44,
    flexDirection: "row",
    flex: 1,
    marginRight: 16,
    marginLeft: 27,
    marginTop: 16
  },
  button2: {
    top: 216,
    width: 322,
    height: 78,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 21,
    left: 19,
    flexDirection: "row"
  },
  groups: {
    color: "#121212",
    fontSize: 18,
    marginTop: 11
  },
  icon4: {
    color: "rgba(9,8,8,1)",
    fontSize: 32,
    height: 32,
    width: 34,
    marginLeft: 172
  },
  groupsRow: {
    height: 32,
    flexDirection: "row",
    flex: 1,
    marginRight: 22,
    marginLeft: 33,
    marginTop: 18
  },
  button3: {
    top: 311,
    width: 322,
    height: 78,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 21,
    left: 19,
    flexDirection: "row"
  },
  recentDevices: {
    color: "#121212",
    fontSize: 18,
    marginTop: 12
  },
  icon5: {
    color: "rgba(26,25,25,1)",
    fontSize: 30,
    height: 33,
    width: 30,
    marginLeft: 111
  },
  recentDevicesRow: {
    height: 33,
    flexDirection: "row",
    flex: 1,
    marginRight: 21,
    marginLeft: 27,
    marginTop: 17
  },
  scrollAreaStack: {
    width: 360,
    height: 504,
    marginTop: 5
  },
  rect5: {
    width: 342,
    height: 155,
    backgroundColor: "rgba(255,255,255,0.35)",
    transform: [
      {
        rotate: "0.19deg"
      }
    ],
    borderWidth: 8,
    borderColor: "rgba(0,0,0,0.35)",
    borderRadius: 21,
    marginTop: 10,
    marginLeft: 9
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 89,
    height: 92,
    position: "absolute"
  },
  icon6: {
    top: 12,
    left: 12,
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 67,
    height: 67,
    width: 67
  },
  ellipseStack: {
    width: 89,
    height: 92,
    marginTop: 14
  },
  Name: {
    color: "#121212",
    fontSize: 26
  },
  username: {
    color: "#121212",
    marginTop: 19
  },
  UserColumn: {
    width: 145,
    marginLeft: 23,
    marginTop: 22,
    marginBottom: 19
  },
  icon3: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    opacity: 0.71,
    height: 28,
    width: 25,
    marginLeft: 27
  },
  ellipseStackRow: {
    height: 106,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 19,
    marginRight: 14
  }
});