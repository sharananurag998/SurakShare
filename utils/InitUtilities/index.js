import { ethers } from 'ethers';
import { Buckets } from '@textile/hub';
import { Libp2pCryptoIdentity } from '@textile/threads-core';
import SyncStorage from 'sync-storage';

import * as FileShare from '../../build/contracts/FileShare.json';
import { USER_API_KEY, USER_API_SECRET, CONTRACT_ADDRESS } from 'react-native-dotenv';

export function setUpContract(walletOrProvider) {
	const contractAbi = FileShare.abi;
	const contractAddress = CONTRACT_ADDRESS; // 0xB16fB80E40fe7E570E489Fa10076A3975F3e6CA6 [Deployed on ropsten]
	const fileShareContract = new ethers.Contract(contractAddress, contractAbi, walletOrProvider);
	console.log('[DEBUG] FileShare Contract: ', fileShareContract);
	console.log('[DEBUG] FileShare Contract address: ', fileShareContract.address);

	return fileShareContract;
}

const generateIdentity = async () => {
	// let idStr = await SyncStorage.get('IDENTITY');
	// if (idStr) {
	// return await Libp2pCryptoIdentity.fromString(idStr);
	return await Libp2pCryptoIdentity.fromString(
		'bbaareygqfzma2sgdu2nmynqky7jrnb6nodt65rkdqcuhibuf4mnnlpx45gklpzknnzyzse7tspkepfv7ubrw3kcb4umrgt57ewxzeue2c46qlffx4vgw44mzcpzzhvchs272ay3nvba6kgitj67sll4skcnbopif'
	);
	// } else {
	// 	const id = await Libp2pCryptoIdentity.fromRandom();
	// 	const id = await Libp2pCryptoIdentity.fromRandom();
	// 	idStr = id.toString();
	// 	console.log('id string: ', idStr);
	// 	await SyncStorage.set('IDENTITY', idStr);
	// 	return id;
	// }
};

export const generateBuckets = async () => {
	const info = {
		key: USER_API_KEY,
		secret: USER_API_SECRET,
	};
	// console.log('[DEBUG] info: ', info);

	const id = await generateIdentity();
	// const identity = id.toString();
	// console.log('[DEBUG] identity: ', identity);

	const buckets = await Buckets.withKeyInfo(info);
	await buckets.getToken(id);
	console.log('[DEBUG] buckets: ', buckets);

	return buckets;
};

export const getOrInitBucket = async (buckets, _threadID) => {
	const root = await buckets.open('userFiles', 'buckets', true, _threadID);
	console.log('Bucket root: ', root);
	if (!root) {
		throw new Error('Error opening bucket');
	}
	const bucketKey = root.key;
	const threadID = root.thread;
	console.log('[DEBUG] bucketKey: ', bucketKey);
	console.log('[DEBUG] threadID: ', threadID);

	return { bucketKey, threadID };
};

export const generateBucketKey = async (buckets) => {
	const root = await buckets.open('userFiles', 'buckets', true);
	console.log('SENDER Bucket root: ', root);
	// console.log('SENDER Bucket threadID: ', threadID);
	if (!root) {
		throw new Error('Error opening bucket');
	}
	const bucketKey = root.key;
	const threadID = root.thread;
	console.log('[DEBUG] bucketKey: ', bucketKey);
	console.log('[DEBUG] threadID: ', threadID);

	return { bucketKey, threadID };
};

export const deleteBucket = async (buckets, bucketKey) => {
	await buckets.remove(bucketKey);
};

export const deleteFromBucket = async (buckets, bucketKey, path, root = null) => {
	await buckets.removePath(bucketKey, path, root);
};
