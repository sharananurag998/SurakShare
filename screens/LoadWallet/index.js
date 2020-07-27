import { View } from 'react-native';

export default function LoadWallet() {
	const [mnemonicList, setMnemonicList] = useState([]);
	const [enteredWord, setEnteredWord] = useState('');

	return (
		<View>
			<View style={[styles.mnemonicsContainer, styles.selected]}>
				{mnemonicList.map((mnemonicWord, index) => (
					<View key={index} style={styles.mnemonic}>
						<Text style={styles.text}>{mnemonicWord}</Text>
					</View>
				))}
			</View>
		</View>
	);
}
