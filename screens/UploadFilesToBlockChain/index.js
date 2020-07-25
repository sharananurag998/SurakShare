import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import SyncStorage from 'sync-storage';
import {
	Button,
	ActivityIndicator,
	Text,
	Title,
	Headline,
	Caption,
	Paragraph,
	Dialog,
	Portal,
	TextInput,
	Surface,
	DataTable,
} from 'react-native-paper';
import { ethers } from 'ethers';

import { generateBuckets, generateBucketKey, deleteBucket, deleteFromBucket } from './bucketUtils';
import * as FileShare from '../../build/contracts/FileShare.json';
import { TEST_PRIVATE_KEY, CONTRACT_ADDRESS } from 'react-native-dotenv';

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
		};
	}

	async componentDidMount() {
		try {
			// const wallet = SyncStorage.get('wallet');
			const provider = SyncStorage.get('provider');
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

			const contractAbi = FileShare.abi;
			const contractAddress = CONTRACT_ADDRESS; // 0xDA72196E315E7522228DdDE776021eDD52DAD279 [Deployed on ropsten]
			const fileShareContract = new ethers.Contract(contractAddress, contractAbi, wallet);
			console.log('[DEBUG] FileShare Contract: ', fileShareContract);
			console.log('[DEBUG] FileShare Contract address: ', fileShareContract.address);
			// console.log('[DEBUG] FileShare Contract transaction hash: ', fileShareContract.deployTransaction.hash);

			// textile.io buckets for IPFS
			const buckets = await generateBuckets();
			const bucketKey = await generateBucketKey(buckets);
			// const buckets = 'Yes';
			// const bucketKey = 'Yes';
			this.setState({ buckets, bucketKey, wallet, files, fileShareContract }, () => {
				console.log('[DEBUG] STATUS, READY?: ', !this.state.isLoading);
			});

			// create a new ThreadID for user
			await this.getBucketLinks();

			this.setState({ isLoading: false });
		} catch (err) {
			Alert.alert('Unexpected error occured', err.message);
			console.error(err);
		}
	}

	getBucketLinks = async () => {
		if (!this.state.buckets || !this.state.bucketKey) {
			console.error('No bucket client or root key');
			return;
		}

		const links = await this.state.buckets.links(this.state.bucketKey);
		this.setState({
			...links,
		});
	};

	uploadFiles = async () => {
		try {
			if (!this.state.buckets || !this.state.bucketKey) {
				return;
			}
		} catch (err) {
			Alert.alert('Session expired, please reset your bucket[IPFS] with the key');
			console.error('No bucket client or root key');
		}

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

				const ipfsFileHash = pushResult.root;
				const contractTransaction = await this.state.fileShareContract.functions.storeHash(ipfsFileHash, {});
				console.log('[DEBUG] transaction result: ', contractTransaction);
				/*
            Pull files from IPFS 
        */
				// const pullResult = await this.state.buckets.pullIpfsPath(ipfsFilePath);
				// console.log('[DEBUG] pullResult: ', pullResult);

				// const { value } = await pullResult.next();
				// console.log('[DEBUG] value: ', value);

				// let buffer = '';
				// for (var i = 0; i < value.length; i++) {
				// 	buffer += String.fromCharCode(value[i]);
				// }
				// console.log('[DEBUG] buffer: ', buffer);

				// [or]
				// const decoder = new TextDecoder();
				// const buffer = decoder.decode(value);
				// console.log('[DEBUG] buffer: ', buffer);
			} catch (err) {
				console.error(err);
			}
		}

		this.setState({ isLoading: false, statusMessage: null });
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
					console.log('[DEBUG] Cleared stored hashes: ', contractTransaction);
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
							<Paragraph style={styles.paragraph}>Loading please wait.</Paragraph>
						</Dialog.Content>
						<Dialog.Content>
							<Paragraph style={styles.paragraph}>{this.state.statusMessage}</Paragraph>
						</Dialog.Content>
					</Dialog>
				</Portal>
				<View style={styles.fileList}>
					<View style={{ padding: '5%' }}>
						<Headline>Selected files</Headline>
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
					<Headline style={{ fontSize: 19 }}>Send files to</Headline>
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
});
