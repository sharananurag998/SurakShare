import { ethers } from 'ethers';
import { Buckets } from '@textile/hub';
import { Libp2pCryptoIdentity } from '@textile/threads-core';
import SyncStorage from 'sync-storage';

import * as FileShare from '../../build/contracts/FileShare.json';
import { USER_API_KEY, USER_API_SECRET, CONTRACT_ADDRESS } from 'react-native-dotenv';

export function setUpContract(walletOrProvider) {
	const contractAbi = FileShare.abi;
	const contractAddress = CONTRACT_ADDRESS; // 0xDA72196E315E7522228DdDE776021eDD52DAD279 [Deployed on ropsten]
	const fileShareContract = new ethers.Contract(contractAddress, contractAbi, walletOrProvider);
	console.log('[DEBUG] FileShare Contract: ', fileShareContract);
	console.log('[DEBUG] FileShare Contract address: ', fileShareContract.address);

	return fileShareContract;
}

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

export const generateBucketKey = async (buckets) => {
	const isEncrypted = true;
	const root = await buckets.open('userFiles', undefined, isEncrypted);
	if (!root) {
		throw new Error('Error opening bucket');
	}
	const bucketKey = root.key;
	console.log('[DEBUG] bucketKey: ', bucketKey);

	return bucketKey;
};

export const deleteBucket = async (buckets, bucketKey) => {
	await buckets.remove(bucketKey);
};

export const deleteFromBucket = async (buckets, bucketKey, path, root = null) => {
	await buckets.removePath(bucketKey, path, root);
};

const generateIdentity = async () => {
	let idStr = await SyncStorage.get('IDENTITY');
	if (idStr) {
		return await Libp2pCryptoIdentity.fromString(idStr);
	} else {
		const id = await Libp2pCryptoIdentity.fromRandom();
		idStr = id.toString();
		await SyncStorage.set('IDENTITY', idStr);
		return id;
	}
};
