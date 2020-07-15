import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import ethers from 'ethers';
import { color } from 'react-native-reanimated';
const { HDNode, providers, utils, Wallet } = ethers;

export default class RevealMnemonic extends Component {
    state = { mnemonics: null };

    renderMnemonic = (mnemonicWord, index) => {
        return (
            <View style={styles.mnemonic} key={index}>
                <Text style={{ color: 'white', fontSize: 17.5 }}>{mnemonicWord}</Text>
            </View>
        );
    };

    onPressRender = () => {
        const { mnemonics } = this.state;

        return mnemonics ? (
            <View style={styles.mnemonicsContainer}>{mnemonics.map(this.renderMnemonic)}</View>
        ) : (
            <TouchableOpacity style={styles.button} onPress={this.onPressReveal}>
                <Text style={styles.text}>Reveal</Text>
            </TouchableOpacity>
        );
    };

    onPressReveal = () => {
        const mnemonics = HDNode.entropyToMnemonic(utils.randomBytes(16)).split(' ');
        this.setState({ mnemonics });
    };

    onPressProceed = () => {
        const { mnemonics } = this.state;

        this.props.navigation.navigate('ConfirmMnemonics', { mnemonics });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.ellipseStack}>
                    <Svg viewBox='0 0 705.44 582.3' style={styles.ellipse}>
                        <Ellipse stroke='rgba(0,0,0,0.29)' strokeWidth={6} fill='rgba(230, 230, 230,1)' cx={353} cy={291} rx={350} ry={288}></Ellipse>
                    </Svg>
                    <Image
                        source={require('../../assets/images/nick-adams-yTWq8n3-4k0-unsplash.jpg')}
                        resizeMode='contain'
                        style={styles.image}></Image>
                    <View style={styles.rect}>
                        <View style={styles.endWrapperFiller}></View>
                        <View style={styles.textColumn}>
                            {this.state.mnemonics ? null : (
                                <View style={styles.rect2}>
                                    <Text style={styles.title}>Reveal Mnemonic</Text>
                                    <Text style={styles.textBlock}>Click on the button Reveal the mnemonics</Text>
                                </View>
                            )}
                            {this.onPressRender()}
                            <View>
                                {this.state.mnemonics ? (
                                    <TouchableOpacity style={styles.button} onPress={this.onPressProceed}>
                                        <Text style={styles.text}>Continue</Text>
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mnemonicsContainer: {
        top: 40,
        justifyContent: 'center',
        width: '100%',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    mnemonic: {
        backgroundColor: 'rgba(93,161,172,0.96)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 50,
        margin: 6,
        padding: 15,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(56,107,122,1)',
    },
    ellipse: {
        left: 11,
        width: 750,
        height: 590,
        position: 'absolute',
        transform: [
            {
                rotate: '-2.02deg',
            },
        ],
        top: -20,
    },
    image: {
        top: 173,
        left: 0,
        width: 580,
        height: 679,
        position: 'absolute',
        transform: [
            {
                rotate: '342.38deg',
            },
        ],
    },
    rect: {
        top: 0,
        width: '50%',
        height: 600,
        position: 'absolute',
        backgroundColor: 'rgba(230,230,230,0.28)',
        borderWidth: 17,
        borderColor: 'rgba(0,0,0,0.28)',
        left: 60,
    },
    endWrapperFiller: {
        flex: 1,
    },
    button: {
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 50,
        elevation: 15,
        backgroundColor: 'rgba(93,161,172,1)',
        borderRadius: 5,
        justifyContent: 'center',
        top: 60,
        height: 60,
        borderRadius: 100,
        marginBottom: 117,
        marginLeft: 31,
        marginRight: 30,
    },
    text: {
        fontFamily: 'roboto-regular',
        color: 'rgba(255,255,255,1)',
        fontSize: 18,
        alignSelf: 'center',
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        elevation: 5,
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    rect2: {
        top: -100,
        height: 'auto',
        backgroundColor: 'rgba(93,161,172,0.96)',
        borderRadius: 5,
        opacity: 0.79,
        borderWidth: 5,
        borderColor: 'rgba(81,79,79,0.75)',
        alignItems: 'center',
    },
    textColumn: {
        marginBottom: 64,
        marginLeft: 34,
        marginRight: 34,
    },
    title: {
        fontSize: 30,
        marginBottom: 40,
        marginTop: 10,
        color: 'white',
    },
    textBlock: {
        marginBottom: 10,
        lineHeight: 25,
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    ellipseStack: {
        width: 716,
        height: 852,
        marginTop: 92,
        marginLeft: -30,
    },
    group1: {
        height: 55,
        backgroundColor: 'rgba(42,121,134,1)',
        width: 360,
        flexDirection: 'row',
        marginTop: -920,
    },
    icon1: {
        color: 'rgba(255,255,255,1)',
        fontSize: 25,
        width: 18,
        height: 25,
        marginTop: 9,
    },
    logoHeader1: {
        width: 41,
        height: 44,
        marginLeft: 132,
    },
    icon1Row: {
        height: 44,
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 6,
    },
    icon1RowFiller: {
        flex: 1,
        flexDirection: 'row',
    },
    button1: {
        width: 25,
        height: 25,
        marginRight: 10,
        marginTop: 15,
    },
    icon2: {
        color: 'rgba(250,250,250,1)',
        fontSize: 25,
    },
});
