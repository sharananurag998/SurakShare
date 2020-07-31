import { globalStyles } from '../styles/global';
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import SyncStorage from 'sync-storage';
import { Avatar, Button, Text, Card, Paragraph, Title, Divider, Snackbar, TextInput, IconButton } from 'react-native-paper';

const LeftContent = (props) => <Avatar.Image {...props} size={125} source={require('../assets/images/camylla-battani-zSCoQkrLMOE-unsplash.jpg')} />;

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: SyncStorage.get('name') || 'John',
			email: SyncStorage.get('email') || 'email not provided',
			wallet: SyncStorage.get('wallet'),
			visible: false,
		};
	}

	render() {
		return (
			<View style={{ backgroundColor: '#fff', flex: 1 }}>
				<Card style={{ flex: 1 }}>
					<Card.Cover style={{ opacity: 0.35 }} source={require('../assets/images/camylla-battani-zSCoQkrLMOE-unsplash.jpg')} />
					<Card.Title title={this.state.name} subtitle='Bangalore, IN' left={LeftContent} leftStyle={{ width: '35%' }} />
					<Card.Content style={{ marginVertical: '10%', flex: 1 }}>
						<Title style={{ fontSize: 22 }}>Profile Settings</Title>
					</Card.Content>
				</Card>
				<View style={{ flex: 1 }}>
					<Divider />
					<View style={{ alignItems: 'center', flexDirection: 'row' }}>
						<IconButton icon='email' color={'#bbb'} size={30} onPress={() => console.log('Pressed')} />
						{/* <Paragraph style={{ fontSize: 16, width: '35%' }}>{this.state.email}</Paragraph> */}
						<TextInput
							style={{ backgroundColor: '#fff', width: '90%' }}
							value={this.state.email}
							onChangeText={(email) => {
								this.setState({ email, visible: true });
							}}
						/>
					</View>
					<View style={{ alignItems: 'center', flexDirection: 'row' }}>
						<IconButton icon='emoticon-outline' color={'#bbb'} size={30} onPress={() => console.log('Pressed')} />
						<TextInput
							style={{ backgroundColor: '#fff', width: '90%' }}
							value={this.state.name}
							onChangeText={(name) => {
								this.setState({ name, visible: true });
							}}
						/>
					</View>
					<View style={{ alignItems: 'center', flexDirection: 'row' }}>
						<IconButton icon='shield-account' color={'#bbb'} size={30} onPress={() => console.log('Pressed')} />
						<TextInput
							style={{ backgroundColor: '#fff', width: '90%' }}
							onFocus={() => {
								this.props.navigation.navigate('ChangePassword');
							}}
							value={'password'}
						/>
					</View>
					<View style={{ alignItems: 'center', flexDirection: 'row' }}>
						<IconButton icon='ethereum' color={'#bbb'} size={30} onPress={() => console.log('Pressed')} />
						<Button disabled={!this.state.wallet}>
							{this.state.wallet ? 'public key: ' + this.state.wallet.address : 'wallet not created'}
						</Button>
						<Button
							onPress={() => {
								SyncStorage.set('navigateBackTo', 'Home');
								this.props.navigation.navigate('SecureFileShare', { screen: 'WalletOverview' });
							}}
							disabled={this.state.wallet}
							contentStyle={styles.button}
							mode='contained'>
							<Text>get wallet</Text>
						</Button>
					</View>
				</View>
				{/* <View style={{ marginHorizontal: '15%' }}>
					<Snackbar visible={this.state.visible} duration={100} onDismiss={this.setState({ visible: false })}>
						Changes saved successfully
					</Snackbar>
				</View> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({});
