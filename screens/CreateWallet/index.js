import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';

export default class CreateWallet extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.ellipseStack}>
					<Svg viewBox='0 0 705.44 582.3' style={styles.ellipse}>
						<Ellipse stroke='rgba(0,0,0,0.29)' strokeWidth={6} fill='rgba(230, 230, 230,1)' cx={353} cy={291} rx={350} ry={288}></Ellipse>
					</Svg>
					<Image
						source={require('../../assets/images/nick-adams-yTWq8n3-4k0-unsplash.jpg')}
						resizeMode='contain'
						style={styles.image}></Image>
					<View style={styles.rect}>
						<View style={styles.endWrapperFiller}></View>
						<View style={styles.textColumn}>
							<View style={styles.rect2}>
								<Text style={styles.title}>Manual Backup </Text>
								<Text style={styles.textBlock}>If you lose your wallet, you will need the Recovery Phrase.</Text>
								<Text style={styles.textBlock}>
									Write these twelve words down and save them, think of it as the password for your wallet
								</Text>
								<Text style={styles.textBlock}>Never share these with anyone else.</Text>
							</View>
							<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('RevealMnemonic')}>
								<Text style={styles.text}>Manual Backup</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(56,107,122,1)',
	},
	ellipse: {
		left: 11,
		width: 750,
		height: 590,
		position: 'absolute',
		transform: [
			{
				rotate: '-2.02deg',
			},
		],
		top: -20,
	},
	image: {
		top: 173,
		left: 0,
		width: 580,
		height: 679,
		position: 'absolute',
		transform: [
			{
				rotate: '342.38deg',
			},
		],
	},
	rect: {
		top: 0,
		width: '50%',
		height: 600,
		position: 'absolute',
		backgroundColor: 'rgba(230,230,230,0.28)',
		borderWidth: 17,
		borderColor: 'rgba(0,0,0,0.28)',
		left: 60,
	},
	endWrapperFiller: {
		flex: 1,
	},
	button: {
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
	rect2: {
		paddingHorizontal: 10,
		paddingVertical: 20,
		top: 40,
		backgroundColor: 'rgba(93,161,172,0.96)',
		borderRadius: 5,
		opacity: 0.79,
		borderWidth: 5,
		borderColor: 'rgba(81,79,79,1)',
		alignItems: 'center',
	},
	textColumn: {
		marginBottom: 64,
		marginLeft: 34,
		marginRight: 34,
	},
	title: {
		fontSize: 30,
		marginBottom: 40,
		marginTop: 10,
		color: 'white',
	},
	textBlock: {
		lineHeight: 25,
		fontSize: 20,
		textAlign: 'center',
		color: 'white',
	},
	ellipseStack: {
		width: 716,
		height: 852,
		marginTop: 92,
		marginLeft: -30,
	},
	group1: {
		height: 55,
		backgroundColor: 'rgba(42,121,134,1)',
		width: 360,
		flexDirection: 'row',
		marginTop: -920,
	},
	icon1: {
		color: 'rgba(255,255,255,1)',
		fontSize: 25,
		width: 18,
		height: 25,
		marginTop: 9,
	},
	logoHeader1: {
		width: 41,
		height: 44,
		marginLeft: 132,
	},
	icon1Row: {
		height: 44,
		flexDirection: 'row',
		marginLeft: 10,
		marginTop: 6,
	},
	icon1RowFiller: {
		flex: 1,
		flexDirection: 'row',
	},
	button1: {
		width: 25,
		height: 25,
		marginRight: 10,
		marginTop: 15,
	},
	icon2: {
		color: 'rgba(250,250,250,1)',
		fontSize: 25,
	},
});
