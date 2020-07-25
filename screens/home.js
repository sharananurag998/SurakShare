import React from 'react';
import { Text, View, StatusBar, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import TouchableScale from 'react-native-touchable-scale';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { ListItem, Badge } from 'react-native-elements';

export default function Home(props) {
	const transfers = [
		{
			from: 'Adarsh',
			to: 'Anurag',
			date: '12-10-2020',
			filename: 'file.jpg',
		},
		{
			from: 'Aniketh',
			to: 'Anurag',
			date: '12-10-2020',
			filename: 'file.jpg',
		},
		{
			from: 'Aniketh',
			to: 'Anurag',
			date: '12-10-2020',
			filename: 'file.jpg',
		},
	];

	const shortTransfers = transfers.slice(0, 2);

	const keyExtractor = (item, index) => index.toString();

	const renderItem = ({ item }) => (
		<ListItem
			title={item.from}
			bottomDivider
			rightTitle={item.to}
			subtitle={item.filename}
			rightSubtitle={item.date}
			rightSubtitleStyle={styles.date}
			style={styles.list}
		/>
	);
	return (
		<View style={globalStyles.container}>
			<StatusBar style='auto' backgroundColor='#5b0a91' />

			<View style={styles.ButtonContainer}>
				<View style={styles.ButtonRow}>
					<TouchableScale
						onPress={() =>
							props.navigation.navigate('SecureFileShare', {
								screen: 'SelectFiles',
								params: { methodOfSharing: 'Share files P2P via Wifi' },
							})
						}>
						<View style={styles.SendButton}>
							<Text style={styles.ButtonText}>Send Files</Text>
							<MaterialIcons name='send' color='white' size={40} style={styles.icon} />
						</View>
					</TouchableScale>
				</View>
				<View style={styles.ButtonRow}>
					<TouchableScale>
						<View style={styles.ReceiveButton}>
							<Text style={styles.ButtonText}>Receive Files</Text>
							<MaterialIcons name='file-download' color='white' size={40} style={styles.icon} />
						</View>
					</TouchableScale>
				</View>
				<View style={styles.ButtonRow}>
					<TouchableScale onPress={() => props.navigation.navigate('SecureFileShare', { screen: 'WalletOverview' })}>
						<View style={styles.PrivateButton}>
							<Text style={styles.ButtonText}>Secure Sharing</Text>
							<Entypo name='network' color='white' size={40} style={styles.icon} />
						</View>
					</TouchableScale>
				</View>
				<View style={styles.RecentItemsContainer}>
					<Text style={{ alignSelf: 'center', fontSize: 20, color: 'black', margin: 10 }}>Recently Shared</Text>
					<FlatList keyExtractor={keyExtractor} data={shortTransfers} renderItem={renderItem} />
					<View style={{ alignSelf: 'center', marginTop: -90, marginBottom: 10, backgroundColor: '#5b0a91', height: 40, borderRadius: 20 }}>
						<TouchableOpacity onPress={() => props.navigation.navigate('TransferHistory')}>
							<Text style={{ color: 'white', padding: 10 }}>View More</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	ButtonContainer: {
		position: 'absolute',
		top: 25,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		maxHeight: '70%',
	},
	SendButton: {
		height: 80,
		// borderWidth:4,
		// borderColor:"#005221",
		backgroundColor: '#20C203',
		fontSize: 40,
		flexDirection: 'row',
		alignContent: 'center',
		alignSelf: 'center',
		width: '80%',
		borderRadius: 45,
	},
	ReceiveButton: {
		height: 80,
		color: 'white',
		backgroundColor: '#0B6FA4',
		fontSize: 40,
		flexDirection: 'row',
		borderRadius: 45,
		alignContent: 'center',
		alignSelf: 'center',
		width: '80%',
		//borderWidth:4,
		//borderColor:"#1c2e4a",
	},
	PrivateButton: {
		height: 80,
		color: 'white',
		backgroundColor: '#C40B0B',
		fontSize: 40,
		flexDirection: 'row',
		borderRadius: 45,
		alignContent: 'center',
		alignSelf: 'center',
		width: '80%',
		//borderWidth:4,
		//borderColor:"#7C0A02",
	},
	ButtonRow: {
		margin: 10,
		width: 370,
		paddingBottom: 10,
	},
	ButtonText: {
		fontSize: 25,
		color: 'white',
		justifyContent: 'center',
		marginLeft: '10%',
		marginTop: '8%',
	},
	icon: {
		position: 'absolute',
		right: '10%',
		top: '30%',
		paddingTop: '8%',
	},
	RecentItemsContainer: {
		margin: 10,
		marginTop: 35,
		borderRadius: 10,
		width: '90%',
		height: '70%',
		backgroundColor: '#f3ccff',
	},
	list: {
		marginTop: 10,
		marginLeft: 7,
		marginRight: 7,
	},
});
