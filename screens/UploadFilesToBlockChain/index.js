import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import SyncStorage from 'sync-storage';
import { Button, ActivityIndicator, Text, Title, Headline, Caption, Paragraph, Dialog, Portal, TextInput, Divider } from 'react-native-paper';
import { ethers } from 'ethers';
import QRCode from 'react-native-qrcode-svg';

import { generateBuckets, generateBucketKey, generateIdentity, deleteBucket, setUpContract } from '../../utils/InitUtilities';
import { TEST_PRIVATE_KEY, INFURA_PROJECT_ID } from 'react-native-dotenv';

export default class UploadFilesToBlockChain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buckets: null,
			bucketKey: null,
			id: null,
			wallet: null,
			isLoading: true,
			files: null,
			fileShareContract: null,
			statusMessage: 'Generating contract to communicate to blockchain',
		};
	}

	async componentDidMount() {
		try {
			// const wallet = SyncStorage.get('wallet');
			const provider = new ethers.providers.InfuraProvider('ropsten', INFURA_PROJECT_ID);
			const wallet = new ethers.Wallet(TEST_PRIVATE_KEY, provider);

			const { files } = this.props.route.params; 

			// textile.io buckets for IPFS
			const id = await generateIdentity()
			const buckets = await generateBuckets(id);
			const bucketKey = await generateBucketKey(buckets);

			const links = await buckets.links(bucketKey);
			console.log('[DEBUG] links: ', links);

			if (!buckets || !bucketKey) {
				Alert.alert('Session expired, please reset your bucket[IPFS] with the key');
				console.error('No bucket client or root key');
				return;
			}

			/*
			 *	 Set up the FileShare contract and store threadID
			 */
			const fileShareContract = setUpContract(wallet);

			const contractTransaction = await fileShareContract.functions.clearStoredHashes();
			console.log('[DEBUG] Cleared stored hashes [tx]: ', contractTransaction);

			this.setState({ isLoading: false, buckets, bucketKey, id, wallet, files, fileShareContract }, () => {
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

		const overrides = {
			gasLimit: 4000000,
		};
		const transaction = await this.state.fileShareContract.functions.setThreadID(this.state.id.toString(), overrides);
		console.log('[DEBUG] id transaction: ', transaction);

		const { files } = this.state;

		for (const file of files) {
			this.setState({ isLoading: true, statusMessage: 'Reading file from device: ' + file.name });

			const uri = file.uri;
			const content = await RNFS.readFile(uri, 'base64');

			const _file = {
				path: '/' + file.name,
				content: Buffer.from(content),
			};

			try {
				this.setState({ isLoading: true, statusMessage: 'Generating IPFS Hash' });
				const filePath = file.name;
				const pushResult = await this.state.buckets.pushPath(this.state.bucketKey, filePath, _file);
				console.log('[DEBUG] path: ', pushResult.path);
				console.log('[DEBUG] ipfs address: ', pushResult.root);

				const storeFileTransaction = await this.state.fileShareContract.functions.storeHash(filePath);
				console.log('[DEBUG] store file transaction result: ', storeFileTransaction);

			} catch (err) {
				console.error(err);
			}
		}

		this.setState({ isLoading: false, isDone: true, statusMessage: 'Successfully stored IPFS Hashes on the blockchain' }, async () => {});
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
									this.setState({ isDone: false }, async () => {
										this.setState({ statusMessage: 'Clearing hashes stored on the blockchain' });
										// await this.state.fileShareContract.functions.clearStoredHashes().catch((err) => {
										// 	console.log('[DEBUG] err: ', err);
										// });

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
