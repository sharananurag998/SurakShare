import { StyleSheet, StatusBar, Platform } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "android"?StatusBar.currentHeight:0, 
    },
});