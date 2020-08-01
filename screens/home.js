import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, ImageBackground, StatusBar } from 'react-native';
import SyncStorage from 'sync-storage';
import { Text, Headline, Card, Paragraph, Title, Subheading, Button, Divider, Avatar } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default function Home({ navigation, route }) {
	const LeftContent = (props) => <Avatar.Icon {...props} style={{ backgroundColor: '#fff' }} size={75} icon={props.iconName} />;

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='rgba(93,161,172,0.96)' barStyle={'default'} />
			<ImageBackground
				source={require('../assets/images/toa-heftiba-FV3GConVSss-unsplash.jpg')}
				imageStyle={{ resizeMode: 'cover', opacity: 0.35 }}
				style={styles.backgroundImage}>
				<Headline style={{ lineHeight: 40, fontWeight: '700', fontSize: 32, textShadowColor: '#ccc', textShadowRadius: 5, flexWrap: 'wrap' }}>
					Welcome, {SyncStorage.get('name') || 'John'}
				</Headline>
				<Divider style={{ marginVertical: 5 }} />
				<Subheading style={{ lineHeight: 25, fontSize: 18 }}>Share documents, images, apps with your friends quickly and securely</Subheading>
			</ImageBackground>
			<View style={styles.bodyComponent}>
				<ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
					<View style={styles.listItem}>
						<Card elevation={15} style={styles.card}>
							<Card.Cover source={require('../assets/images/maxim-ilyahov-0aRycsfH57A-unsplash.jpg')} />
							<Card.Title title='Share files' subtitle='secure sharing' right={LeftContent} iconName='ethereum' />
							<Card.Content>
								<Title>Secure file sharing</Title>
								<Paragraph>
									Seamlessly and securely share files on the blockchain with the help of IPFS and the decentralised web
								</Paragraph>
							</Card.Content>
							<Card.Actions style={styles.actionContainer}>
								<Button
									onPress={() => {
										if (!SyncStorage.get('wallet')) {
											SyncStorage.set('navigateBackTo', 'SelectFiles');
											navigation.navigate('SecureFileShare', { screen: 'WalletOverview' });
										} else {
											navigation.navigate('SecureFileShare', {
												screen: 'SelectFiles',
												params: { methodOfSharing: 'Share files on blockchain' },
											});
										}
									}}
									icon='ethereum'
									mode='contained'
									color='rgba(93,161,172,0.96)'
									style={styles.button}>
									<Text style={{ color: '#fff' }}>SEND FILES SECURELY</Text>
								</Button>
							</Card.Actions>
						</Card>
					</View>
					<View style={styles.listItem}>
						<Card elevation={15} style={styles.card}>
							<Card.Cover source={require('../assets/images/paul-hanaoka-HbyYFFokvm0-unsplash.jpg')} />
							<Card.Title title='Receive files' subtitle='secure sharing' right={LeftContent} iconName='get-app' />
							<Card.Content>
								<Title>Secure file sharing</Title>
								<Paragraph>
									Make use of a provider or a signer such as a wallet to make transaction and retrieve files from IPFS using
									textile.io buckets
								</Paragraph>
							</Card.Content>
							<Card.Actions style={styles.actionContainer}>
								<Button
									onPress={() => navigation.navigate('ReceiveFiles', { methodOfSharing: 'Share files on BlockChain' })}
									icon='download'
									mode='contained'
									color='rgba(93,161,172,0.96)'
									style={styles.button}>
									<Text style={{ color: '#fff' }}>Receive files securely</Text>
								</Button>
							</Card.Actions>
						</Card>
					</View>
					<View style={styles.listItem}>
						<Card elevation={15} style={styles.card}>
							<Card.Cover source={require('../assets/images/luis-villasmil-4V8uMZx8FYA-unsplash.jpg')} />
							<Card.Title title='Wifi p2p sharing' subtitle='offline sharing' right={LeftContent} iconName='share-variant' />
							<Card.Content>
								<Title>p2p by wifi direct</Title>
								<Paragraph>
									quick and convenient way of sharing files directly with peers, SurakShare also provides a simpler solution to file
									sharing.
								</Paragraph>
							</Card.Content>
							<Card.Actions style={styles.actionContainer}>
								<Button
									onPress={() =>
										navigation.navigate('SecureFileShare', {
											screen: 'SelectFiles',
											params: { methodOfSharing: 'Share files P2P via Wifi' },
										})
									}
									icon='share'
									mode='contained'
									color='rgba(93,161,172,0.96)'
									style={styles.button}>
									<Text style={{ color: '#fff' }}>WiFi p2p sharing</Text>
								</Button>
							</Card.Actions>
						</Card>
					</View>
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
	},

	backgroundImage: {
		flex: 2,
		backgroundColor: '#fff',
		padding: 40,
		paddingTop: 60,
	},
	bodyComponent: {
		flex: 5,
		height: '100%',
	},
	listItem: {
		elevation: 25,
		height: '100%',
		width: width - 40,
	},
	actionContainer: {
		justifyContent: 'center',
		padding: 30,
	},
	button: {
		borderRadius: 50,
		scaleX: 1.2,
		scaleY: 1.4,
	},
	card: {
		marginHorizontal: 20,
	},
});
