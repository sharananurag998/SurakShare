import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Alert } from 'react-native';
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
				<View style={styles.headerContainer}>
					<Image
						source={require('../../assets/images/eberhard-grossgasteiger-xC7Ho08RYF4-unsplash.jpg')}
						resizeMode='contain'
						style={styles.image}></Image>
					<View style={styles.card}>
						<Text style={styles.title}>Confirm Passphrase</Text>
					</View>
				</View>
				<View style={[styles.mnemonicsContainer, styles.selected]}>
					{this.state.selected.map((mnemonicWord, index) => (
						<View key={index} style={styles.mnemonic}>
							<Text style={styles.text}>{mnemonicWord}</Text>
						</View>
					))}
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.feedback}>Select the words in the order of sequence as displayed before</Text>
				</View>
				<View style={[styles.mnemonicsContainer, styles.selectable]}>
					{this.state.selectable.map((mnemonicWord, index) => (
						<TouchableOpacity key={index} style={styles.mnemonic} onPress={() => this.selectMnemonic(mnemonicWord)}>
							<Text style={styles.text}>{mnemonicWord}</Text>
						</TouchableOpacity>
					))}
				</View>
				<TouchableOpacity disabled={this.state.isDisabled} style={styles.button} onPress={this.isValidSequence}>
					<Text style={styles.text}>Confirm</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: 450,
		transform: [
			{
				rotate: '180deg',
			},
		],
	},
	card: {
		top: -250,
		width: '80%',
		height: 100,
		backgroundColor: 'rgba(93,161,172,0.75)',
		borderRadius: 15,
		borderWidth: 5,
		borderColor: 'rgba(81,79,79,0.50)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 30,
		color: 'white',
	},
	mnemonicsContainer: {
		top: 40,
		justifyContent: 'center',
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	mnemonic: {
		backgroundColor: 'rgba(93,161,172,0.96)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		height: 50,
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
		elevation: 15,
		backgroundColor: 'rgba(93,161,172,1)',
		borderRadius: 5,
		justifyContent: 'center',
		top: 60,
		height: 60,
		borderRadius: 100,
		marginBottom: 117,
		marginLeft: 31,
		marginRight: 30,
	},
	text: {
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
	textContainer: {
		top: 25,
	},
	selected: {
		top: 0,
	},
	feedback: {
		top: 0,
		textAlign: 'center',
		fontSize: 26,
	},
	selectable: {
		flex: 1,
		top: 50,
	},
});
