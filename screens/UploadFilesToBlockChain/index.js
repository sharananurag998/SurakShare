import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Button, Text } from 'galio-framework';
import RNFS from 'react-native-fs';

import { generateBuckets, generateBucketKey } from './bucketUtils';

export default class UploadFilesToBlockChain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buckets: null,
            bucketKey: null,
            isDisabled: true,
        };
    }

    async componentDidMount() {
        try {
            const buckets = await generateBuckets();
            const bucketKey = await generateBucketKey(buckets);
            this.setState({ buckets, bucketKey, isDisabled: false }, () => {
                console.log('[DEBUG] state: ', !this.state.isDisabled);
            });
        } catch (err) {
            console.error(err);
        }
    }

    uploadFiles = async () => {
        const { files } = this.props.route.params;
        // console.log('[DEBUG] files[0]: ', files[0]);

        for (const file of files) {
            console.log('[DEBUG] file: ', file);

            const uri = file.uri;
            const content = await RNFS.readFile(uri, 'base64');
            // console.log('[DEBUG] content: ', content);

            const _file = {
                path: uri,
                content: Buffer.from(content),
            };
            // console.log('[DEBUG] file: ', file);

            try {
                const ipfsResult = await this.state.buckets.pushPath(this.state.bucketKey, `userFile:${file.id}`, _file);
                console.log('[DEBUG] path: ', `userFile:${file.id}`, ipfsResult.path);
                console.log('[DEBUG] ipfs address: ', `userFile:${file.id}`, ipfsResult.root);
            } catch (err) {
                console.error(err);
            }
        }
    };

    render() {
        return (
            <Block middle>
                <Button onPress={this.uploadFiles} disabled={this.state.isDisabled} style={{ alignSelf: 'center' }}>
                    <Text>Testing Stuff</Text>
                </Button>
                <Text style={{ alignSelf: 'center' }}>Uploading files to the blockchain....</Text>
            </Block>
        );
    }
}

const styles = StyleSheet.create({});
