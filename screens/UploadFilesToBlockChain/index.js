import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import SyncStorage from 'sync-storage';
import { Button, ActivityIndicator, Text, Title, Headline, Caption, Paragraph, Dialog, Portal, TextInput, Divider } from 'react-native-paper';
import { ethers } from 'ethers';
import QRCode from 'react-native-qrcode-svg';

import { generateBuckets, generateBucketKey, deleteBucket, setUpContract } from '../../utils/InitUtilities';
import { TEST_PRIVATE_KEY } from 'react-native-dotenv';

export default class UploadFilesToBlockChain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buckets: null,
			bucketKey: null,
			wallet: null,
			isLoading: true,
			files: null,
			fileShareContract: null,
			statusMessage: 'Generating contract to communicate to blockchain',
			isDone: false,
		};
	}

	async componentDidMount() {
		try {
			// const wallet = SyncStorage.get('wallet');
			const provider = new ethers.providers.InfuraProvider('ropsten', INFURA_PROJECT_ID);
			const wallet = new ethers.Wallet(TEST_PRIVATE_KEY, provider);

			const { files } = this.props.route.params;

			/*
			 *	 Set up the FileShare contract
			 */
			// const contractAddress = FileShare.networks['5777'].address;	// local development environment

			// const contractByteCode = FileShare.bytecode;
			// const contractAbi = FileShare.abi;
			// console.log('[DEBUG] Contract Abi: ', contractAbi);
			// const factory = new ethers.ContractFactory(contractAbi, contractByteCode, wallet);
			// const fileShareContract = await factory.deploy();
			// await fileShareContract.deployed(); // deploy on ropsten
			// console.log('[DEBUG] FileShare Contract transaction hash: ', fileShareContract.deployTransaction.hash);

			const fileShareContract = setUpContract(wallet);

			// textile.io buckets for IPFS
			const buckets = await generateBuckets();
			const bucketKey = await generateBucketKey(buckets);

			if (!buckets || !bucketKey) {
				Alert.alert('Session expired, please reset your bucket[IPFS] with the key');
				console.error('No bucket client or root key');
				return;
			}

			// create a new ThreadID for user
			await buckets.links(bucketKey);

			this.setState({ isLoading: false, buckets, bucketKey, wallet, files, fileShareContract }, () => {
				console.log('[DEBUG] STATUS, READY?: ', !this.state.isLoading);
			});
		} catch (err) {
			Alert.alert('Unexpected error occured', err.message);
			console.error(err);
		}
	}

	uploadFiles = async () => {
		try {
			if (!this.state.buckets || !this.state.bucketKey) {
				return;
			}
		} catch (err) {
			Alert.alert('Session expired, please reset your bucket[IPFS] with the key');
			console.error('No bucket client or root key');
		}

		await this.state.fileShareContract.clearStoredHashes().catch((err) => {
			console.log('[DEBUG] err: ', err);
		});

		const { files } = this.state;

		for (const file of files) {
			// console.log('[DEBUG] file: ', file);
			this.setState({ isLoading: true, statusMessage: 'Reading file from device: ' + file.name });

			const uri = file.uri;
			const content = await RNFS.readFile(uri, 'base64');
			// console.log('[DEBUG] content: ', content);

			const _file = {
				path: '/' + file.name,
				content: Buffer.from(content),
			};
			// console.log('[DEBUG] file: ', _file);

			try {
				this.setState({ isLoading: true, statusMessage: 'Generating IPFS Hash' });
				const filePath = file.name;
				const pushResult = await this.state.buckets.pushPath(this.state.bucketKey, filePath, _file);
				console.log('[DEBUG] path: ', pushResult.path);
				console.log('[DEBUG] ipfs address: ', pushResult.root);

				const overrides = {
					// gasLimit: 9500000,
				};
				const ipfsFileHash = pushResult.root;
				const contractTransaction = await this.state.fileShareContract.functions.storeHash(ipfsFileHash, overrides);
				console.log('[DEBUG] transaction result: ', contractTransaction);
			} catch (err) {
				console.error(err);
			}
		}

		this.setState({ isLoading: false, isDone: true, statusMessage: 'Successfully stored IPFS Hashes on the blockchain' });
	};

	destroy = async () => {
		Alert.alert('Are you sure?', 'This action cannot be undone. The bucket/IPFS hashes and all associated data will be permanently deleted.', [
			{
				text: 'No',
				onPress: () => {
					console.log('Cancel Pressed');
					this.props.navigation.goBack();
				},
				style: 'cancel',
			},
			{
				text: "Yes, I'm sure",
				onPress: async () => {
					await deleteBucket(this.state.buckets, this.state.bucketKey);
					const contractTransaction = await this.state.fileShareContract.functions.clearStoredHashes();
					console.log('[DEBUG] Cleared stored hashes [tx]: ', contractTransaction);
				},
			},
		]);
	};

	renderFileItem = ({ item }) => {
		return (
			<View style={styles.itemBlock}>
				<View style={{ flexDirection: 'row' }}>
					<View>
						<Text>{item.name}</Text>
						<Text muted>{item.size + 'KB \u2027 ' + item.type}</Text>
					</View>
				</View>
			</View>
		);
	};

	render() {
		return (
			<View style={styles.contatiner}>
				<Portal>
					<Dialog visible={this.state.isLoading}>
						<Dialog.Content style={{ flexDirection: 'row' }}>
							<ActivityIndicator animating={this.state.isLoading} />
							<Paragraph style={styles.paragraph}>Loading, please wait.</Paragraph>
						</Dialog.Content>
						<Dialog.Content style={{ justifyContent: 'center', alignContent: 'center' }}>
							<Paragraph style={styles.paragraph}>{this.state.statusMessage}</Paragraph>
						</Dialog.Content>
					</Dialog>
				</Portal>
				<View style={styles.fileList}>
					<View style={{ padding: '5%' }}>
						<Divider style={{ marginBottom: 5 }} />
						<Headline>Selected files</Headline>
						<Divider style={{ marginTop: 5 }} />
					</View>
					<FlatList
						data={this.state.files}
						renderItem={this.renderFileItem}
						keyExtractor={(file, index) => file.uri + index}
						bounces={true}
						ListHeaderComponent={this.listHeader}
					/>
				</View>
				<View style={styles.sendFilePrompt}>
					<Headline style={{ fontSize: 19 }}>[optional] Send files to</Headline>
					<TextInput
						mode='outlined'
						label='address of the receiver'
						style={styles.textInput}
						value={this.state.receiver}
						onChangeText={(rec) => this.setState({ receiver: rec })}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						onPress={this.destroy}
						loading={this.state.isLoading}
						disabled={this.state.isLoading}
						contentStyle={[styles.button, { backgroundColor: '#ccc' }]}
						mode='contained'>
						<Text>cancel</Text>
					</Button>
					<Button
						onPress={this.uploadFiles}
						loading={this.state.isLoading}
						disabled={this.state.isLoading}
						contentStyle={styles.button}
						mode='contained'>
						<Text>send</Text>
					</Button>
				</View>
				<Portal>
					<Dialog visible={this.state.isDone} style={styles.center}>
						<Dialog.Content>
							<Headline style={{ textAlign: 'center' }}>Please share your public address with the receiver</Headline>
							<Divider style={{ marginTop: 5 }} />
						</Dialog.Content>
						<Dialog.Content>
							<QRCode value={this.state.wallet ? this.state.wallet.address : 'INVALID_WALLET_ADDRESS'} size={250} />
						</Dialog.Content>
						<Dialog.Content>
							<Divider />
							<Caption>QRScan of your public address</Caption>
							<Divider />
						</Dialog.Content>
						<Dialog.Content>
							<Divider />
							<Paragraph style={{ textAlign: 'center' }}>{this.state.statusMessage}</Paragraph>
							<Divider />
						</Dialog.Content>
						<Dialog.Actions>
							<Button
								contentStyle={styles.button}
								mode='contained'
								onPress={() => {
									this.setState({ isDone: false }, () => {
										this.props.navigation.navigate('Home');
									});
								}}>
								Done
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	contatiner: {
		flex: 1,
	},
	fileList: {
		flex: 4,
		alignSelf: 'center',
		width: '90%',
		marginTop: '5%',
		backgroundColor: '#eee',
		elevation: 15,
	},
	sendFilePrompt: {
		flex: 2,
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
	itemBlock: {
		alignSelf: 'center',
		width: '90%',
		paddingVertical: '5%',
		marginBottom: '5%',
		borderBottomWidth: 2,
		borderBottomColor: '#ddd',
	},
	center: {
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
});
