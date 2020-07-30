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

class SendFilesOffline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileURI: '',
        };
        getConnectionInfo().then(info => console.log('getConnectionInfo', info));
    }

    pickFile = async() => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
        this.setState({fileURI: res.uri});
        this.setState({fileName: res.name});
    }

    sendFile = async() =>{
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
              return sendFile(this.state.fileURI)
                  .then((metaInfo) => alert('File sent successfully'))
                  .catch(err => alert('Error while file sending'));
          })
          .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.selectFileButton} onpress={()=>{pickFile()}}>Select File</Button>
                {this.state.fileName != '' &&
                    <>
                        <Text style={styles.fileName}>Selected File: {this.state.fileName}</Text>
                        <Button onPress={()=>{sendFile()}}>Send File</Button>
                    </>
                }
                
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
    },
    fileName:{
        margin: 10,
        textAlign: 'center'
    }
})

export default SendFilesOffline;