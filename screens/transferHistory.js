import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialChipWithImage3 from "../components/MaterialChipWithImage3";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialChipWithImage4 from "../components/MaterialChipWithImage4";
import MaterialChipWithImage5 from "../components/MaterialChipWithImage5";
import MaterialButtonDanger from "../components/MaterialButtonDanger";
import MaterialCardWithImageAndTitle from "../components/MaterialCardWithImageAndTitle";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

function Untitled(props) {
  return (
    <View style={styles.container}>
      <View style={styles.materialChipWithImage3Stack}>
        <MaterialChipWithImage3
          style={styles.materialChipWithImage3}
        ></MaterialChipWithImage3>
        <Text style={styles.dateTime2}>Date, time</Text>
        <IoniconsIcon name="ios-document" style={styles.icon2}></IoniconsIcon>
      </View>
      <View style={styles.materialChipWithImage4Stack}>
        <MaterialChipWithImage4
          style={styles.materialChipWithImage4}
        ></MaterialChipWithImage4>
        <Text style={styles.dateTime1}>Date, time</Text>
        <IoniconsIcon name="ios-document" style={styles.icon3}></IoniconsIcon>
      </View>
      <View style={styles.materialChipWithImage5Stack}>
        <MaterialChipWithImage5
          style={styles.materialChipWithImage5}
        ></MaterialChipWithImage5>
        <Text style={styles.dateTime3}>Date, time</Text>
        <IoniconsIcon name="ios-document" style={styles.icon4}></IoniconsIcon>
      </View>
      <MaterialButtonDanger
        style={styles.materialButtonDanger}
      ></MaterialButtonDanger>
      <MaterialCardWithImageAndTitle
        style={styles.materialCardWithImageAndTitle}
      ></MaterialCardWithImageAndTitle>
      <View style={styles.materialChipWithImage52Stack}>
        <MaterialChipWithImage5
          style={styles.materialChipWithImage52}
        ></MaterialChipWithImage5>
        <Text style={styles.dateTime4}>Date,Time</Text>
        <FontAwesomeIcon
          name="file-image-o"
          style={styles.icon5}
        ></FontAwesomeIcon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(189,16,224,1)"
  },
  materialChipWithImage3: {
    width: 330,
    height: 70,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 6,
    borderColor: "rgba(126,211,33,1)"
  },
  dateTime2: {
    top: 25,
    left: 190,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 17
  },
  icon2: {
    top: 13,
    left: 58,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40
  },
  materialChipWithImage3Stack: {
    width: 330,
    height: 70,
    marginTop: 323,
    marginLeft: 30
  },
  materialChipWithImage4: {
    width: 330,
    height: 70,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 6,
    borderColor: "rgba(208,2,27,1)"
  },
  dateTime1: {
    top: 25,
    left: 190,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 17
  },
  icon3: {
    top: 14,
    left: 60,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40
  },
  materialChipWithImage4Stack: {
    width: 330,
    height: 70,
    marginTop: 25,
    marginLeft: 30
  },
  materialChipWithImage5: {
    width: 339,
    height: 70,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 6,
    borderColor: "rgba(126,211,33,1)"
  },
  dateTime3: {
    top: 25,
    left: 64,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 17
  },
  icon4: {
    top: 13,
    left: 239,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40
  },
  materialChipWithImage5Stack: {
    width: 339,
    height: 70,
    marginTop: 31
  },
  materialButtonDanger: {
    height: 83,
    width: 232,
    borderRadius: 100,
    overflow: "visible",
    marginTop: 38,
    marginLeft: 64
  },
  materialCardWithImageAndTitle: {
    height: 181,
    width: 359,
    borderBottomRightRadius: 26,
    borderBottomLeftRadius: 26,
    backgroundColor: "rgba(131,38,152,1)",
    marginTop: -686
  },
  materialChipWithImage52: {
    width: 339,
    height: 70,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 6,
    borderColor: "rgba(126,211,33,1)"
  },
  dateTime4: {
    top: 25,
    left: 63,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 17
  },
  icon5: {
    top: 15,
    left: 228,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40
  },
  materialChipWithImage52Stack: {
    width: 339,
    height: 70,
    marginTop: 24
  }
});

export default Untitled;
