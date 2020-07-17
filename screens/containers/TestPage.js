import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

import WorkThrough from './WorkThrough';
import {icons} from '../../icons';
import SyncStorage from 'sync-storage';

const flowData = {
    bgColor: "#788eec", 
    fgColor: "white", 
    screens:
    [
        {icon: "share.png", title: "Quick and Secure File Sharing", description: "Share documents, images, apps with your friends quickly and securely."},
        {icon: "ethereum.png", title: "Blockchain Based File Sharing", description: "Share confidential files securely using the Blockchain-based Online File Sharing option. "},
        {icon: "hotspot.png", title: "WiFi P2P Support", description: "You can also use the Offline File Sharing feature to send large files using WiFi P2P."},
    ]
}

export default class TestPage extends Component {

    _onWorkFlowFinished = () => {
        this.props.navigation.navigate('AfterTestPage');
    }
    render() {
        return (
            <View style={styles.container}>
                <WorkThrough
                    iconpackage = {icons}
                    data={flowData}
                    onFinished = {this._onWorkFlowFinished}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    }
});
