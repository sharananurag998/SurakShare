import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Paragraph, Button, Text, TextInput, Caption, Headline } from 'react-native-paper';
import { ethers } from 'ethers';
import SyncStorage from 'sync-storage';

import { INFURA_PROJECT_ID } from 'react-native-dotenv';

export default function LoadWallet({ navigation, route }) {
	const [mnemonicList, setMnemonicList] = useState([]);
	const [mnemonicInput, setMnemonicInput] = useState('');
	const [isLoadButtonDisabled, setIsLoadButtonDisabled] = useState(true);

	const resetHandler = () => {
		setMnemonicList([]);
		setMnemonicInput('');
	};

	const loadWalletHandler = () => {
		if (mnemonicList.length === 12) {
			try {
				let mnemonics;
				if (!(mnemonicList instanceof Array) && typeof mnemonicList !== 'string') throw new Error('invalid mnemonic');
				else if (mnemonicList instanceof Array) mnemonics = mnemonicList.join(' ');
				console.log('[DEBUG] mnemonics: ', mnemonics);

				const provider = new ethers.providers.InfuraProvider('ropsten', INFURA_PROJECT_ID);
				const wallet = new ethers.Wallet.fromMnemonic(mnemonics).connect(provider);
				console.log('[DEBUG] wallet: ', wallet);

				SyncStorage.set('wallet', wallet);

				Alert.alert('wallet loaded successfully');
				const navigateBackTo = SyncStorage.get('navigateBackTo');
				navigation.navigate(navigateBackTo, { methodOfSharing: 'Share on BlockChain' });
			} catch (err) {
				Alert.alert('Invalid mnemonic phrase', 'Please try again with valid mnemonic phrase');
				console.error(err);
			}
		}
	};

	const addMnemonicHandler = () => {
		if (mnemonicInput !== '' && mnemonicInput.split(' ').length === 1 && mnemonicList.length < 12) {
			setMnemonicList((list) => [...list, mnemonicInput]);
			setMnemonicInput('');
		}
	};

	useEffect(() => {
		if (mnemonicList.length === 12) {
			setIsLoadButtonDisabled(false);
		}
	}, [mnemonicList, isLoadButtonDisabled]);

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.mnemonicsContainer}>
				<Paragraph style={{ width: '100%', textAlign: 'center', marginBottom: '7%', fontSize: 20 }}>The mnemonic phrase</Paragraph>
				{mnemonicList.map((mnemonicWord, index) => (
					<Button key={index} style={styles.mnemonic}>
						<Text style={styles.mnemonicText}>{mnemonicWord}</Text>
					</Button>
				))}
			</View>
			<View style={styles.inputMnemonic}>
				<Caption style={{ fontSize: 18, textAlign: 'center' }}>Enter your BIP39 mnemonic phrase in the correct order</Caption>
				<TextInput
					mode='outlined'
					label='Enter mnemonic'
					style={{ width: '80%', marginBottom: '5%' }}
					value={mnemonicInput}
					onChangeText={(mnemonicInput) => setMnemonicInput(mnemonicInput)}
				/>
				<Button onPress={addMnemonicHandler} contentStyle={styles.button} labelStyle={{ color: 'rgba(93,161,172,0.96)' }}>
					<Text>Enter</Text>
				</Button>
			</View>
			<View style={styles.buttonContainer}>
				<Button onPress={resetHandler} contentStyle={styles.button} labelStyle={{ color: 'rgba(93,161,172,0.96)' }}>
					reset
				</Button>
				<Button onPress={loadWalletHandler} disabled={isLoadButtonDisabled} contentStyle={styles.button} mode='contained'>
					Load wallet
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mnemonicsContainer: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '90%',
		margin: '5%',
		backgroundColor: '#eee',
		paddingTop: '7%',
		elevation: 15,
	},
	mnemonic: {
		backgroundColor: 'rgba(93,161,172,0.96)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		height: 38,
		margin: 6,
	},
	inputMnemonic: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		width: '90%',
		margin: '5%',
		backgroundColor: '#eee',
		elevation: 15,
	},
	button: {
		padding: 'auto',
		margin: 'auto',
		height: 60,
		width: 170,
	},
	buttonContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
		margin: 5,
	},
	mnemonicText: {
		fontFamily: 'roboto-regular',
		color: 'rgba(255,255,255,1)',
		fontSize: 18,
		alignSelf: 'center',
		shadowColor: 'rgba(0,0,0,1)',
		shadowOffset: {
			width: 10,
			height: 10,
		},
		elevation: 5,
		shadowOpacity: 1,
		shadowRadius: 0,
	},
});
