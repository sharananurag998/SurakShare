import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class VeifyMnemonic extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Confirm Mnemonic</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Text>PP Soft</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
