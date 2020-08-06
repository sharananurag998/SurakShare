import { ethers } from 'ethers';
import { Buckets } from '@textile/hub';
import { Libp2pCryptoIdentity } from '@textile/threads-core';

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

export const generateIdentity = async (idStr = null) => {
	if (idStr) {
		return await Libp2pCryptoIdentity.fromString(idStr);
	} else {
		const id = await Libp2pCryptoIdentity.fromRandom();
		idStr = id.toString();
		console.log('[DEBUG] ID NOT FOUND');
		console.log('new id string: ', idStr);
		return id;
	}
};

export const generateBuckets = async (id) => {
	const info = {
		key: USER_API_KEY,
		// secret: USER_API_SECRET,
	};

	const buckets = await Buckets.withKeyInfo(info);
	await buckets.getToken(id);
	console.log('[DEBUG] buckets: ', buckets);

	return buckets;
};

export const generateBucketKey = async (buckets) => {
	const root = await buckets.open('userFiles', 'buckets', true);
	console.log('SENDER Bucket root: ', root);
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
