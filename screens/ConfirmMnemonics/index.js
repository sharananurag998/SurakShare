import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, Text, Title, Divider, Caption } from 'react-native-paper';
import _ from 'lodash';

export default class ConfirmMnemonics extends Component {
	constructor(props) {
		super(props);
		this.state = { isDisabled: true, selectable: [], selected: [] };
	}

	componentDidMount = () => {
		const { mnemonics } = this.props.route.params;
		this.setState({ selectable: _.shuffle(mnemonics), selected: [] });
	};

	isValidSequence = () => {
		const { mnemonics } = this.props.route.params;

		console.log('sequence received[debug]: ', this.state.selected);
		console.log('sequence expected[debug]: ', mnemonics);
		if (_.isEqual(this.state.selected, mnemonics)) {
			return (
				<TouchableOpacity style={styles.button} onPress={this.props.navigation.navigate('WalletCreated', { mnemonics })}>
					<Text style={styles.text}>Reveal</Text>
				</TouchableOpacity>
			);
		} else {
			console.error('Wrong Passphrase. Please make sure you have saved the passphrase before continuing');
			Alert.alert('Wrong Passphrase.', 'Please make sure you have saved the passphrase before continuing', [
				{
					text: 'OK',
					onPress: () => {
						console.log('OK Pressed');
						this.props.navigation.goBack();
					},
				},
			]);
		}
	};

	selectMnemonic = (mnemonicWord) => {
		this.setState(
			(state) => {
				return {
					selectable: state.selectable.filter((word) => word !== mnemonicWord),
					selected: state.selected.concat(mnemonicWord),
				};
			},
			(state) => {
				this.setState({
					isDisabled: this.state.selected.length === 12 ? false : true,
				});
			}
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={{ flex: 1, marginTop: 30 }}>
					<Title style={{ textAlign: 'center' }}>Verify your mnemonic</Title>
					<Caption style={{ textAlign: 'center', fontSize: 16 }}>Choose each word in the correct order.</Caption>
				</View>
				<View style={[styles.mnemonicsContainer, { backgroundColor: '#e3e3e3' }]}>
					<Divider />
					{this.state.selected.map((mnemonicWord, index) => (
						<View key={index} style={styles.mnemonic}>
							<Text style={styles.text}>{mnemonicWord}</Text>
						</View>
					))}
					<Divider />
				</View>
				<View style={styles.mnemonicsContainer}>
					<Divider />
					{this.state.selectable.map((mnemonicWord, index) => (
						<TouchableOpacity key={index} style={styles.mnemonic} onPress={() => this.selectMnemonic(mnemonicWord)}>
							<Text style={styles.text}>{mnemonicWord}</Text>
						</TouchableOpacity>
					))}
					<Divider />
				</View>
				<View style={{ flex: 1, marginVertical: 5 }}>
					<Divider />
					<Button disabled={this.state.isDisabled} style={styles.button} onPress={this.isValidSequence}>
						<Text style={[styles.text, { fontSize: 22 }]}>Confirm</Text>
					</Button>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
	},
	mnemonicsContainer: {
		flex: 3,
		justifyContent: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		margin: 20,
	},
	mnemonic: {
		backgroundColor: 'rgba(93,161,172,0.96)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		height: 36,
		margin: 6,
		padding: 15,
	},
	button: {
		shadowColor: '#000',
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 50,
		height: 65,
		elevation: 15,
		backgroundColor: 'rgba(93,161,172,1)',
		justifyContent: 'center',
		borderRadius: 100,
		marginHorizontal: 30,
	},
	text: {
		color: 'white',
		fontSize: 18,
		alignSelf: 'center',
	},
});
