import React, { useState, Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Block, Button, Text } from 'galio-framework';
import SyncStorage from 'sync-storage';

export default function UploadFilesToBlockChain({ navigation, route }) {
    return (
        <View styles={styles.container}>
            <Text>Uploading files to the blockchain....</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
