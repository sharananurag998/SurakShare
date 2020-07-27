import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { ethers } from 'ethers';
import { Button, ActivityIndicator, Text, Headline, Caption, Paragraph, Dialog, Portal, TextInput, Snackbar } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import RNFS from 'react-native-fs';

import { INFURA_PROJECT_ID } from 'react-native-dotenv';
import { setUpContract, generateBuckets, generateBucketKey, deleteBucket, deleteFromBucket } from '../../utils/InitUtilities';

export default class ReceiveFiles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buckets: null,
			bucketKey: null,
			walletOrProvider: null,
			fileShareContract: null,
			sender: null,
			isLoading: false,
			isVisibleWalletPrompt: false,
			statusMessage: 'Generating contract to communicate to blockchain',
			isVisibleQRScanner: false,
			isDone: false,
			isVisibleSnackbar: false,
		};
	}

	init = async () => {
		try {
			this.setState({ isVisibleWalletPrompt: false, isLoading: true });

			const provider = new ethers.providers.InfuraProvider('ropsten', INFURA_PROJECT_ID);
			const fileShareContract = setUpContract(provider);

			// textile.io buckets for IPFS
			const buckets = await generateBuckets();
			const bucketKey = await generateBucketKey(buckets);
			// const buckets = 'Yes';
			// const bucketKey = 'Yes';

			if (!buckets || !bucketKey) {
				Alert.alert('Session expired, please reset your bucket[IPFS] with the key');
				console.error('No bucket client or root key');
				return;
			}

			// create a new ThreadID for user
			await buckets.links(bucketKey);

			this.setState({ isLoading: false, buckets, bucketKey, fileShareContract, walletOrProvider: provider }, () => {
				console.log('[DEBUG] STATUS, READY?: ', !this.state.isLoading);
			});
		} catch (err) {
			Alert.alert('Unexpected error occured', err.message);
			console.error(err);
		}
	};

	componentDidMount = async () => {
		try {
			// const walletOrProvider = SyncStorage.get('wallet');
			const walletOrProvider = null;

			if (!walletOrProvider) {
				this.setState({ isVisibleWalletPrompt: true });
			} else {
				this.init();
			}
		} catch (err) {
			Alert.alert('Unexpected error occured', err.message);
			console.error(err);
		}
	};

	receiveFiles = async () => {
		/*
		 *		Pull files from IPFS
		 */
		try {
			if (!this.state.sender) {
				Alert.alert('Invalid public key', "Please correctly enter the sender's address or use the scanner[recommended]");
				return;
			}

			this.setState({ isLoading: true, statusMessage: 'pulling files from IPFS and writing onto device' });
			const ipfsFilePathList = await this.state.fileShareContract.receiveHash(this.state.sender);
			console.log('[DEBUG] ipfsFilePathList: ', ipfsFilePathList);

			for (const ipfsFilePath of ipfsFilePathList) {
				const pullResult = await this.state.buckets.pullIpfsPath(ipfsFilePath);
				console.log('[DEBUG] pullResult: ', pullResult);
				const { value } = await pullResult.next();
				console.log('[DEBUG] value: ', value);

				const finalValue = Array.prototype.slice.call(value);
				console.log('[DEBUG] finalValue: ', finalValue);
				// let buffer = '';
				// for (var i = 0; i < value.length; i++) {
				// 	buffer += String.fromCharCode(value[i]);
				// }
				// console.log('[DEBUG] buffer: ', buffer);
				// // [or];
				// const decoder = new TextDecoder();
				// const tbuffer = decoder.decode(value);
				// console.log('[DEBUG] TextDecoder buffer: ', tbuffer);

				this.setState({ statusMessage: 'Writing files..' });
				const path = RNFS.ExternalDirectoryPath + `/${ipfsFilePath.slice(6)}-${new Date().toDateString()}`;

				await RNFS.writeFile(path, finalValue, 'ascii').then((success) => {
					console.log('wrote files successfully');
				});
			}
			this.setState({ isLoading: false });
		} catch (err) {
			Alert.alert('Unexpected error occured', err.message);
			console.error(err);
		}
	};

	qrScanHandler = (event) => {
		try {
			const sender = ethers.utils.getAddress(event.data);
			this.setState({ sender, isVisibleQRScanner: false, isVisibleSnackbar: true }, () => {
				this.receiveFiles();
			});
		} catch (err) {
			Alert.alert('Invalid public key', err.message);
			console.error(err);
		}
	};

	render() {
		return (
			<View style={styles.contatiner}>
				<Portal>
					<Dialog visible={this.state.isLoading}>
						<Dialog.Content style={{ flexDirection: 'row' }}>
							<ActivityIndicator animating={this.state.isLoading} />
							<Paragraph style={styles.paragraph}>Loading please wait.</Paragraph>
						</Dialog.Content>
						<Dialog.Content style={{ justifyContent: 'center', alignContent: 'center' }}>
							<Paragraph style={styles.paragraph}>{this.state.statusMessage}</Paragraph>
						</Dialog.Content>
					</Dialog>
				</Portal>
				<Portal>
					<Dialog visible={this.state.isVisibleWalletPrompt}>
						<Dialog.Content style={{ flexDirection: 'row' }}>
							<Headline style={styles.paragraph}>No wallet detected</Headline>
						</Dialog.Content>
						<Dialog.Content style={{ justifyContent: 'center', alignContent: 'center' }}>
							<Paragraph style={styles.paragraph}>Would you like to load a wallet or create a new one?</Paragraph>
						</Dialog.Content>
						<Dialog.Content style={{ justifyContent: 'center', alignContent: 'center' }}>
							<Paragraph style={styles.paragraph}>You can also choose to continue without a wallet and use a provider</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button contentStyle={[styles.button, { color: '#ccc' }]} labelStyle={{ fontSize: 10 }} onPress={this.init}>
								Continue w/ provider
							</Button>
							<Button
								contentStyle={styles.button}
								mode='contained'
								onPress={() => {
									this.setState({ isVisibleWalletPrompt: false }, () => {
										this.props.navigation.navigate('SecureFileShare', { screen: 'WalletOverview' });
									});
								}}>
								Get wallet
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
				{this.state.isVisibleQRScanner && (
					<QRCodeScanner
						onRead={this.qrScanHandler}
						flashMode={RNCamera.Constants.FlashMode.torch}
						fadeIn={true}
						topContent={<Headline>Scan sender's QR Code</Headline>}
						topViewStyle={{ marginBottom: '5%' }}
						bottomContent={
							<Button onPress={() => this.setState({ isVisibleQRScanner: false })} contentStyle={[styles.button, { color: '#ccc' }]}>
								<Text>cancel</Text>
							</Button>
						}
						bottomViewStyle={{ marginTop: '5%' }}
					/>
				)}
				{!this.state.isVisibleQRScanner && (
					<>
						<View style={styles.inputSenderAddress}>
							<View style={{ flex: 1 }}>
								<Icon
									name='ethereum'
									type='material-community'
									iconStyle={{ alignSelf: 'center' }}
									color='#bbb'
									// color='rgba(93,161,172,0.96)'
									size={300}
								/>
							</View>
							<Snackbar
								style={{ alignSelf: 'flex-start', margin: '9%' }}
								visible={this.state.isVisibleSnackbar}
								onDismiss={() => this.setState({ isVisibleSnackbar: false })}>
								scanned public key successfully!
							</Snackbar>
							<Headline style={{ fontSize: 19, marginBottom: '9%' }}>Paste the sender's public key string</Headline>
							<TextInput
								mode='outlined'
								label="Enter sender's address"
								style={styles.textInput}
								value={this.state.sender}
								placeholder='eg. 0x24cf347dbc59d31c1358c8e5cf5e45b822ab85b79cb32a9f3d98184779a9efc2'
								onChangeText={(input) => this.setState({ sender: input })}
							/>
							<Button
								onPress={() => this.setState({ isVisibleQRScanner: true })}
								loading={this.state.isLoading}
								disabled={this.state.isLoading}
								contentStyle={[styles.button, { color: 'rgba(93,161,172,0.96)', marginTop: '9%' }]}
								labelStyle={{ fontSize: 12 }}>
								<Text>or Scan a QR Code</Text>
							</Button>
						</View>
						<View style={styles.buttonContainer}>
							<Button
								onPress={() => console.log('cancel presed')}
								loading={this.state.isLoading}
								disabled={this.state.isLoading}
								contentStyle={[styles.button, { backgroundColor: '#ccc' }]}
								mode='contained'>
								<Text>cancel</Text>
							</Button>
							<Button
								onPress={this.receiveFiles}
								loading={this.state.isLoading}
								disabled={this.state.isLoading && this.state.sender}
								contentStyle={styles.button}
								mode='contained'>
								<Text>Receive</Text>
							</Button>
						</View>
					</>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	contatiner: {
		flex: 1,
	},
	inputSenderAddress: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
		width: '90%',
		margin: '5%',
		backgroundColor: '#eee',
		elevation: 15,
	},
	buttonContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
		margin: 5,
	},
	textInput: {
		width: '80%',
	},
	paragraph: {
		marginLeft: 20,
	},
	button: {
		padding: 'auto',
		margin: 'auto',
		height: 60,
		width: 170,
	},
	center: {
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
});
