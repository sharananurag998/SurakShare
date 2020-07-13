import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function MaterialCardWithImageAndTitle(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.cardBody}>
        <Image
          source={require("../assets/images/SAVE_20180906_2411124.jpg")}
          style={styles.cardItemImagePlace}
        ></Image>
        <View style={styles.bodyContent}>
          <Text style={styles.adarshANair}>ADARSH A NAIR</Text>
          <Text style={styles.transferHistory}>Transfer History</Text>
        </View>
      </View>
      <View style={styles.actionBody}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden"
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    width: 357,
    top: -1,
    height: 112
  },
  cardItemImagePlace: {
    backgroundColor: "#ccc",
    height: 139,
    width: 139,
    margin: 16,
    borderRadius: 100
  },
  bodyContent: {
    padding: 16,
    paddingTop: 24,
    flex: 1
  },
  adarshANair: {
    fontSize: 22,
    color: "rgba(255,255,255,1)",
    paddingBottom: 12
  },
  transferHistory: {
    fontSize: 14,
    color: "rgba(255,255,255,1)",
    lineHeight: 16,
    opacity: 0.5
  },
  actionBody: {
    padding: 8,
    flexDirection: "row"
  }
});

export default MaterialCardWithImageAndTitle;
