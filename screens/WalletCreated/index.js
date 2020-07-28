import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { ethers } from 'ethers';
import SyncStorage from 'sync-storage';
import { Headline, Portal, Button, Text, Paragraph, Chip, Dialog, Divider, Snackbar } from 'react-native-paper';
import Clipboard from '@react-native-community/clipboard';

import { INFURA_PROJECT_ID } from 'react-native-dotenv';

export default class WalletCreated extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mnemonics: this.props.route.params.mnemonics,
			PROVIDER: new ethers.providers.InfuraProvider('ropsten', INFURA_PROJECT_ID),
			// PROVIDER: new ethers.providers.JsonRpcProvider('http://localhost:9545'),
			wallet: null,
			isVisibleSnackbar: false,
			isVisiblePortal: false,
			isDone: false,
		};
	}

	generateWalletFromMnemonics = () => {
		let { mnemonics } = this.state;
		// console.log('[DEBUG] mnemonics: ', this.props.route.params.mnemonics);

		if (!(mnemonics instanceof Array) && typeof mnemonics !== 'string') throw new Error('invalid mnemonic');
		else if (mnemonics instanceof Array) mnemonics = mnemonics.join(' ');

		try {
			const wallet = new ethers.Wallet.fromMnemonic(mnemonics).connect(this.state.PROVIDER);
			this.setState({ wallet });
			SyncStorage.set('wallet', wallet);
			SyncStorage.set('provider', this.state.PROVIDER);
			console.log('[DEBUG] wallet (local): ', wallet);
			console.log('[DEBUG] wallet in storage: ', SyncStorage.get('wallet'));
			this.setState({ isVisiblePortal: true });
		} catch (err) {
			alert('Error Occured: ' + JSON.stringify(err));
			throw err;
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<Portal>
					<Dialog visible={this.state.isVisiblePortal}>
						<Dialog.Content style={{ flexDirection: 'row' }}>
							<Headline style={styles.paragraph}>Almost there!</Headline>
						</Dialog.Content>
						<Dialog.Content style={{ flexDirection: 'row' }}>
							<Paragraph style={styles.paragraph}>
								You'll need ether to make transactions, you can choose to purchase ether with real money or request ether for free on
								Ropsten testnet's faucet
							</Paragraph>
							<Divider />
						</Dialog.Content>
						<Dialog.Content style={{ justifyContent: 'center', alignContent: 'center' }}>
							<Paragraph style={styles.paragraph}>
								please follow the link to make a request for free tesetnet ether if you wish to send files and make transactions to
								the blockchain
							</Paragraph>
							<Divider />
						</Dialog.Content>
						<Dialog.Content style={{ justifyContent: 'center', alignContent: 'center' }}>
							<Paragraph style={styles.paragraph}>Optionally you can skip this step if you choose to ONLY receive files</Paragraph>
							<Divider />
						</Dialog.Content>
						<Dialog.Content style={{ justifyContent: 'center', alignContent: 'center' }}>
							<Chip
								icon='ethereum'
								mode='flat'
								style={{ alignSelf: 'center' }}
								onPress={() => {
									if (this.state.wallet) {
										this.setState({ isVisibleSnackbar: true });
										Clipboard.setString(this.state.wallet.address);
									}
								}}>
								{this.state.wallet
									? this.state.wallet.address.slice(0, 4) + '...' + this.state.wallet.address.slice(-4)
									: 'Wallet not created'}
							</Chip>
							<Paragraph style={[styles.paragraph, { alignSelf: 'center' }]}>copy to clipboard</Paragraph>
							<Divider />
							<Snackbar
								wrapperStyle={{ margin: 75, marginLeft: 50, width: 165 }}
								duration={75}
								visible={this.state.isVisibleSnackbar}
								onDismiss={() => this.setState({ isVisibleSnackbar: false })}>
								Copied to clipboard
							</Snackbar>
						</Dialog.Content>
						<Dialog.Actions style={{ justifyContent: 'space-around' }}>
							<Button
								contentStyle={styles.promptButton}
								mode='contained'
								disabled={SyncStorage.get('navigateBackTo') === 'SelectFiles'}
								onPress={() => {
									this.setState({ isVisiblePortal: false });
									const navigateBackTo = SyncStorage.get('navigateBackTo');
									this.props.navigation.navigate(navigateBackTo, { methodOfSharing: 'Share on BlockChain' });
								}}>
								{this.state.isDone ? 'Done' : 'Skip'}
							</Button>
							<Button
								contentStyle={styles.promptButton}
								mode='contained'
								onPress={async () => {
									this.setState({ isDone: true });
									await Linking.openURL('https://faucet.ropsten.be/');
								}}>
								Request ether
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
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
							<View style={styles.rect2}>
								<Text style={styles.title}>Generate Wallet</Text>
								<Text style={styles.textBlock}>SurakShare let's you share files on the blockchain through IPFS.</Text>
								<Text style={styles.textBlock}>Final Step</Text>
								<Text style={styles.textBlock}>Click on the button below to generate your wallet</Text>
							</View>
							<TouchableOpacity style={styles.button} onPress={this.generateWalletFromMnemonics}>
								<Text style={styles.text}>Generate Wallet</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(56,107,122,1)',
	},
	promptButton: {
		padding: 'auto',
		margin: 'auto',
		height: 60,
		width: 170,
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
		top: 40,
		height: 350,
		backgroundColor: 'rgba(93,161,172,0.96)',
		borderRadius: 5,
		opacity: 0.79,
		borderWidth: 5,
		borderColor: 'rgba(81,79,79,1)',
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
