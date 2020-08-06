import React, { Component } from 'react';
import { StyleSheet, View, Alert, PermissionsAndroid } from 'react-native';
import { ethers } from 'ethers';
import { Button, ActivityIndicator, Text, Headline, Paragraph, Dialog, Portal, TextInput, Snackbar } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import RNFS from 'react-native-fs';
import SyncStorage from 'sync-storage';
// import * as base64 from 'byte-base64';

import { INFURA_PROJECT_ID } from 'react-native-dotenv';
import { generateBuckets, generateBucketKey, deleteFromBucket, deleteBucket, setUpContract, generateIdentity } from '../../utils/InitUtilities';

export default class ReceiveFiles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buckets: null,
			bucketKey: null,
			threadID: null,
			walletOrProvider: null,
			fileShareContract: null,
			sender: null,
			isLoading: false,
			isVisibleWalletPrompt: false,
			statusMessage: 'Generating contract to communicate to blockchain',
			isVisibleQRScanner: false,
			isDone: false,
			isVisibleSnackbar: false,
			bucket: null,
		};
	}

	init = async () => {
		try {
			if (!this.state.sender) {
				Alert.alert('Invalid public key', "Please correctly enter the sender's address or use the scanner[recommended]");
				this.setState({ isVisibleQRScanner: true });
				throw new Error('Invalid public key');
			}
			
			if (!this.state.walletOrProvider) {
				Alert.alert('Wallet not found', "Please load or create a valid wallet or use a provider instead");
				this.setState({ isVisibleWalletPrompt: true });
				throw new Error('Wallet not found');
			}

			this.setState({ isVisibleWalletPrompt: false, isLoading: true, statusMessage: 'Generating buckets to pull files from IPFS' });

			const fileShareContract = setUpContract(this.state.walletOrProvider);
			const idStr = await fileShareContract.getThreadID(this.state.sender);
			if (!idStr) {
				Alert.alert('ID not found', "Sender's Lip2p ID is required to receive files");
				throw new Error('Lip2p ID from sender not found');
			}

			// textile.io buckets for IPFS
			const id = await generateIdentity(idStr);
			const buckets = await generateBuckets(id);
			const bucketKey = await generateBucketKey(buckets);

			this.setState({ isLoading: false, buckets, bucketKey, fileShareContract }, () => {
				console.log('[DEBUG] STATUS, READY?: ', !this.state.isLoading);
			});
		} catch (err) {
			Alert.alert('Error encountered', err.message);
			console.error(err);
		}
	};

	componentDidMount = async () => {
		try {
			this.setState({ isVisibleQRScanner: true });
		} catch (err) {
			Alert.alert('Unexpected error occured', err.message);
			console.error(err);
		}
	};

	requestFileWritePermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
				title: 'File write permission',
				message: 'File write permission.',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			});
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('write file permission granted');
			} else {
				console.log('permissions denied');
			}
		} catch (err) {
			console.warn(err);
		}
	};

	receiveFiles = async () => {
		/*
		 *		Pull files from IPFS
		 */
		try {
			if (!this.state.sender) {
				Alert.alert('Invalid public key', "Please correctly enter the sender's address or use the scanner[recommended]");
				this.setState({ isVisibleQRScanner: true });
				return;
			}

			if (!this.state.walletOrProvider) {
				this.setState({ isVisibleWalletPrompt: true });
				return;
			}

			if (!this.state.fileShareContract) {
				return;
			}

			await this.requestFileWritePermission();

			this.setState({ isLoading: true, statusMessage: 'pulling files from IPFS and writing onto device' });
			const fileList = await this.state.fileShareContract.receiveHash(this.state.sender);

			console.log('[DEBUG] fileList: ', fileList);

			for (const filePath of fileList) {
				const pullResult = this.state.buckets.pullPath(this.state.bucketKey, filePath);
				console.log('[DEBUG] pullResult: ', pullResult);

				const chunks = [];
				const iterator = pullResult[Symbol.asyncIterator]();
				while (chunks.length < Infinity) {
					const { value, done } = await iterator.next();
					if (done) break;
					chunks.push(value);
					console.log('[DEBUG] value: ', value);
				}
				console.log('[DEBUG] chunks: ', chunks);
				const combined = Uint8Array.from(Array.prototype.concat(...chunks.map((a) => Array.from(a))));
				console.log('[DEBUG] combined: ', combined);

				buffer = Buffer.from(combined);
				console.log('[DEBUG] buffer: ', buffer.toString());

				this.setState({ statusMessage: 'Writing files..' });
				const path = RNFS.ExternalDirectoryPath + `/${new Date().toDateString()}-${filePath}`;

				await RNFS.writeFile(path, buffer.toString(), 'base64').then((success) => {
					Alert.alert('Wrote files successfully', `File Path: ${path}`, [
						{
							text: 'Done',
							onPress: () => this.props.navigation.navigate('Home'),
						},
					]);
					console.log('wrote files successfully');
					this.setState({ isLoading: false });
				});

				await deleteFromBucket(this.state.buckets, this.state.bucketKey, filePath);
				console.log('[DEBUG] deleted from bucket: ', filePath);
			}
			// await deleteBucket(this.state.buckets, this.state.bucketKey);
			// console.log('[DEBUG] buckets deleted ');

		} catch (err) {
			Alert.alert('Unexpected error occured', err.message);
			console.error(err);
		}
	};

	qrScanHandler = (event) => {
		try {
			const sender = ethers.utils.getAddress(event.data);
			this.setState({ sender, isVisibleQRScanner: false, isVisibleSnackbar: true }, () => {
				const wallet = SyncStorage.get('wallet');
				if (wallet) {
					this.setState({ walletOrProvider: wallet }, () => {
						this.init();
					});
				} else {
					this.setState({ isVisibleWalletPrompt: true });
				}
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
							<Button
								contentStyle={[styles.button, { color: '#ccc' }]}
								labelStyle={{ fontSize: 10 }}
								onPress={() => {
									const provider = new ethers.providers.InfuraProvider('ropsten', INFURA_PROJECT_ID);
									this.setState({ walletOrProvider: provider }, () => {
										this.init();
									});
								}}>
								Continue w/ provider
							</Button>
							<Button
								contentStyle={styles.button}
								mode='contained'
								onPress={() => {
									this.setState({ isVisibleWalletPrompt: false }, () => {
										SyncStorage.set('navigateBackTo', 'ReceiveFiles');
										this.props.navigation.navigate('SecureFileShare', {
											screen: 'WalletOverview',
										});
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
								onPress={() => this.props.navigation.navigate('Home')}
								loading={this.state.isLoading}
								disabled={this.state.isLoading}
								contentStyle={[styles.button, { backgroundColor: '#ccc' }]}
								mode='contained'>
								<Text>{this.state.isDone ? 'Done' : 'Cancel'}</Text>
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
