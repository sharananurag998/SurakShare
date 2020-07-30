

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Text
} from 'react-native';
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

import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';

export default class App extends PureComponent {
  state = {
    devices: [],
    addressToConnect: ''
  };

  async componentDidMount() {
      try {
          await initialize();
          // since it's required in Android >= 6.0
          const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                  'title': 'Access to wi-fi P2P mode',
                  'message': 'ACCESS_FINE_LOCATION'
              }
          );

          console.log(granted === PermissionsAndroid.RESULTS.GRANTED ? "You can use the p2p mode" : "Permission denied: p2p mode will not work");

          subscribeOnPeersUpdates(this.handleNewPeers);
          subscribeOnConnectionInfoUpdates(this.handleNewInfo);
          subscribeOnThisDeviceChanged(this.handleThisDeviceChanged);

          startDiscoveringPeers()
    .then(() => console.log('Starting of discovering was successful'))
    .catch(err => console.error(`Something is gone wrong. Maybe your WiFi is disabled? Error details: ${err}`));
        //   console.log('startDiscoveringPeers status: ', status);
      } catch (e) {
          console.error(e);
      }
  }

  componentWillUnmount() {
    unsubscribeFromConnectionInfoUpdates(this.handleNewInfo);
    unsubscribeFromPeersUpdates(this.handleNewPeers);
    unsubscribeFromThisDeviceChanged(this.handleThisDeviceChanged)
  }

  handleNewInfo = (info) => {
    console.log('OnConnectionInfoUpdated', info);
  };

  handleNewPeers = ({ devices }) => {
    console.log('OnPeersUpdated', devices);
    this.setState({ devices: devices });
  };

  handleThisDeviceChanged = (groupInfo) => {
      console.log('THIS_DEVICE_CHANGED_ACTION', groupInfo);
  };

  connectToDevice = (deviceAddress) => {
      console.log('Connect to: ', deviceAddress);
      connect(deviceAddress)
          .then(() => alert('Successfully connected', `Successfully connected to device: ${deviceAddress}`, [{text:'Send Files', onPress: ()=>this.props.navigation.navigate("SendFilesOffline")}, {text:'Receive Files', onPress: ()=>this.props.navigation.navigate("ReceiveFilesOffline")}], { cancelable: false }))
          .catch(err => alert(`Something gone wrong. Details: ${err}`));
  };

  onCancelConnect = () => {
      cancelConnect()
          .then(() => console.log('cancelConnect', 'Connection successfully canceled'))
          .catch(err => console.error('cancelConnect', 'Something gone wrong. Details: ', err));
  };

  onCreateGroup = () => {
      createGroup()
          .then(() => console.log('Group created successfully!'))
          .catch(err => console.error('Something gone wrong. Details: ', err));
  };

  onRemoveGroup = () => {
      removeGroup()
          .then(() => console.log('Currently you don\'t belong to group!'))
          .catch(err => console.error('Something gone wrong. Details: ', err));
  };

  onStopInvestigation = () => {
      stopDiscoveringPeers()
          .then(() => console.log('Stopping of discovering was successful'))
          .catch(err => console.error(`Something is gone wrong. Maybe your WiFi is disabled? Error details`, err));
  };

  onStartInvestigate = () => {
      startDiscoveringPeers()
          .then(status => console.log('startDiscoveringPeers', `Status of discovering peers: ${status}`))
          .catch(err => console.error(`Something is gone wrong. Maybe your WiFi is disabled? Error details: ${err}`));
  };

  onGetAvailableDevices = () => {
      getAvailablePeers()
          .then(peers => console.log(peers));
  };

  onGetConnectionInfo = () => {
    getConnectionInfo()
        .then(info => console.log('getConnectionInfo', info));
  };

  onGetGroupInfo = () => {
      getGroupInfo()
        .then(info => console.log('getGroupInfo', info));
  };


  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <Text>Select a device from the list: -</Text>
        <Dialog
            visible={this.state.visible}
            dialogTitle={<DialogTitle title="Connect to device" />}
            onTouchOutside={() => {
              this.setState({ visible: false });
            }}
            footer={
              <DialogFooter>
                <DialogButton
                  text="CANCEL"
                  onPress={() => {this.setState({ visible: false });}}
                />
                <DialogButton
                  text="OK"
                  onPress={() => {connectToDevice(this.state.addressToConnect)}}
                />
              </DialogFooter>
            }
        >
            <DialogContent>
              <Text>Do you want to connect to {this.state.addressToConnect}?</Text>
            </DialogContent>
        </Dialog>
        <FlatList

          data={this.state.devices}

          width='100%'

          extraData={this.state.devices}

          keyExtractor={(index) => index.toString()}

          ItemSeparatorComponent={this.FlatListItemSeparator}

          renderItem={({ item }) => <Text style={styles.item} onPress={()=>{ this.setState({ visible: true, addressToConnect: item.deviceAddress});}}> {item.deviceAddress} </Text>}
        />
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});