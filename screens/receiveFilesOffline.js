import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import {
  initialize,
  startDiscoveringPeers,
  stopDiscoveringPeers,
  unsubscribeFromPeersUpdates,
  unsubscribeFromThisDeviceChanged,
  unsubscribeFromConnectionInfoUpdates,
  subscribeOnConnectionInfoUpdates,
  subscribeOnThisDeviceChanged,
  subscribeOnPeersUpdates,
  connect,
  cancelConnect,
  createGroup,
  removeGroup,
  getAvailablePeers,
  sendFile,
  receiveFile,
  getConnectionInfo,
  getGroupInfo,
  receiveMessage,
  sendMessage,
} from 'react-native-wifi-p2p';
import { PermissionsAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

class ReceiveFilesOffline extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onReceiveFile = async() => {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
              'title': 'Access to read',
              'message': 'READ_EXTERNAL_STORAGE'
          }
        )
          .then(granted => {
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  console.log("You can use the storage")
              } else {
                  console.log("Storage permission denied")
              }
          })
          .then(() => {
              return PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                  {
                      'title': 'Access to write',
                      'message': 'WRITE_EXTERNAL_STORAGE'
                  }
              )
          })
          .then(() => {
              return receiveFile('/storage/emulated/0/SurakShare/', 'ReceivedFile')
                  .then(() => alert('File received successfully'))
                  .catch(err => alert(`Error while file receiving ${err}`))
          })
          .catch(err => console.log(err));
    };
    

    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.selectFileButton} onpress={()=>{onReceiveFile}}>Receive Files</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectFileButton:{
        width: 30,
        margin: 10
    }
})

export default ReceiveFilesOffline;