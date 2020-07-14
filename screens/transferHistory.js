import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { ListItem } from 'react-native-elements';

import senderImage from'../assets/images/aniketh1.jpg';
import receiverImage from'../assets/images/aniketh1.jpg';

function TransferHistory(props) {

  const transfers=[
    {
      from:"Adarsh",
      to:"Anurag",
      date:"10-07-2020",
      filename:"file.jpg"
    },
    {
      from:"Aniketh",
      to:"Anurag",
      date:"13-07-2020",
      filename:"file2.jpg"
    },
  ]

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
      title={item.from}
      leftAvatar={{ source: senderImage }}
      bottomDivider
      rightAvatar={{source: receiverImage}}
      rightTitle={item.to}
      subtitle={item.filename}
      rightSubtitle={item.date}
      rightSubtitleStyle={styles.date}
    />
  )
  

  return (
    <View>
      <View style={styles.topRow}>
      <Text style={styles.from}>From</Text>
      <Text style={styles.to}>To</Text>
    </View>
    <FlatList
      keyExtractor={keyExtractor}
      data={transfers}
      renderItem={renderItem}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    borderWidth: 0,
    borderColor: "#000000"
  },
  date:{
    fontSize:12
  },
  topRow:{
    flexDirection:"row",
    backgroundColor:"#45046a"
  },
  from:{
    flex:1,
    fontSize:20,
    textAlign:"center",
    backgroundColor:"#5c2a9d",
    borderColor:"#45046a",
    borderWidth: 2,
    borderRadius:10,
    padding:10,
    color:"#F8F8FF"
  },
  to:{
    flex:1,
    textAlign:"center",
    fontSize:20,
    backgroundColor:"#5c2a9d",
    borderColor:"#45046a",
    borderWidth: 2,
    padding:10,
    color:"#F8F8FF",
    borderRadius:10,
  }
});
export default TransferHistory;
