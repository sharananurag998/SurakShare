import { globalStyles } from "../styles/global";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Svg, { Ellipse } from "react-native-svg";
import FeatherIcon from "react-native-vector-icons/Feather";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

export default function Home() {
  return (
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
      <ScrollView horizontal="false">
        <View style={styles.rect}>
          <Text style={styles.emailId}>Email ID</Text>
          <Text style={styles.loremIpsum}>adarshnair210@gmail.com</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.pops.navigation.navigate("Change Password")}
        >
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
            <IoniconsIcon name="ios-exit" style={styles.icon2} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbeeff",
    borderWidth: 0,
    borderColor: "#000000",
  },
  button4: {
    width: 322,
    height: 78,
    backgroundColor: "rgba(124,25,202,0.3)",
    borderWidth: 4,
    borderColor: "rgba(124,25,202,0.7)",
    borderStyle: "solid",
    borderRadius: 21,
    flexDirection: "row",
    marginTop: 415,
    alignSelf: "center",
  },
  logOut: {
    color: "#5b0a91",
    fontSize: 18,
  },
  icon2: {
    color: "rgba(19,18,18,1)",
    fontSize: 40,
    height: 44,
    width: 32,
    marginLeft: 172,
  },
  logOutRow: {
    height: 44,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  rect: {
    marginTop: 15,
    width: 322,
    height: 78,
    position: "absolute",
    backgroundColor: "rgba(124,25,202,0.3)",
    borderWidth: 4,
    shadowColor: "rgba(124,25,202,1)",
    shadowRadius: 10,
    shadowOpacity: 1,
    borderColor: "rgba(124,25,202,0.7)",
    borderStyle: "solid",
    borderRadius: 21,
    alignSelf: "center",
  },
  emailId: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 27,
    color: "#5b0a91",
    fontSize: 18,
  },
  loremIpsum: {
    color: "#5b0a91",
    fontSize: 16,
    marginTop: 6,
    marginLeft: 27,
  },
  button: {
    top: 115,
    width: 322,
    height: 78,
    position: "absolute",
    backgroundColor: "rgba(124,25,202,0.3)",
    borderWidth: 4,
    borderColor: "rgba(124,25,202,0.7)",
    borderStyle: "solid",
    borderRadius: 21,
    alignSelf: "center",
    flexDirection: "row",
  },
  changePassword: {
    color: "#5b0a91",
    fontSize: 18,
  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    height: 44,
    width: 40,
    marginLeft: 85,
  },
  changePasswordRow: {
    height: 44,
    flexDirection: "row",
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    top: 215,
    width: 322,
    height: 78,
    position: "absolute",
    backgroundColor: "rgba(124,25,202,0.3)",
    borderWidth: 4,
    borderColor: "rgba(124,25,202,0.7)",
    borderStyle: "solid",
    borderRadius: 21,
    alignSelf: "center",
    flexDirection: "row",
  },
  groups: {
    color: "#5b0a91",
    fontSize: 18,
  },
  icon4: {
    color: "rgba(9,8,8,1)",
    fontSize: 32,
    height: 32,
    width: 34,
    marginLeft: 172,
  },
  groupsRow: {
    height: 32,
    flexDirection: "row",
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button3: {
    top: 315,
    width: 322,
    height: 78,
    position: "absolute",
    backgroundColor: "rgba(124,25,202,0.3)",
    borderWidth: 4,
    borderColor: "rgba(124,25,202,0.7)",
    borderStyle: "solid",
    borderRadius: 21,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  recentDevices: {
    color: "#5b0a91",
    fontSize: 18,
  },
  icon5: {
    color: "rgba(26,25,25,1)",
    fontSize: 30,
    height: 33,
    width: 30,
    marginLeft: 111,
  },
  recentDevicesRow: {
    height: 33,
    flexDirection: "row",
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollAreaStack: {
    width: 360,
    height: 504,
    marginTop: 5,
  },
  rect5: {
    width: 342,
    height: 155,
    backgroundColor: "rgba(124,25,202,0.7)",
    borderWidth: 8,
    borderColor: "rgba(124,25,202,1)",
    borderRadius: 21,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 89,
    height: 92,
    position: "absolute",
  },
  icon6: {
    top: 12,
    left: 12,
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 67,
    height: 67,
    width: 67,
  },
  ellipseStack: {
    width: 89,
    height: 92,
  },
  Name: {
    color: "#FFF",
    fontSize: 26,
  },
  username: {
    color: "#FFF",
    marginTop: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  UserColumn: {
    width: 145,
    marginLeft: 23,
    marginTop: 22,
    marginBottom: 19,
  },
  icon3: {
    color: "white",
    fontSize: 25,
    opacity: 0.71,
    height: 28,
    width: 25,
    marginLeft: 10,
  },
  ellipseStackRow: {
    height: 106,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
