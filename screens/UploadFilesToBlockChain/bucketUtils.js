import { Buckets } from '@textile/hub';
import { Libp2pCryptoIdentity } from '@textile/threads-core';
import SyncStorage from 'sync-storage';

import { USER_API_KEY, USER_API_SECRET } from 'react-native-dotenv';

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
    // console.log('[DEBUG] buckets: ', buckets);

    return buckets;
};

export const generateBucketKey = async (buckets) => {
    const root = await buckets.open('files');
    if (!root) {
        throw new Error('Error opening bucket');
    }
    const bucketKey = root.key;
    // console.log('[DEBUG] bucketKey: ', bucketKey);

    return bucketKey;
};
