import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ScrollView, View, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Block, Button, Text } from 'galio-framework';

export default function SelectFiles({ navigation, route }) {
    const [files, setFiles] = useState([]);
    const [isVisibleAdd, setIsVisibleAdd] = useState(true);
    const [isVisibleMain, setIsVisibleMain] = useState(false);

    const addFiles = async () => {
        let fileId = 0;

        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            });
            for (const file of results) {
                fileId += 1;
                file.id = fileId;

                //Printing the log realted to the file
                console.log('file : ' + JSON.stringify(file));
                console.log('URI : ' + file.uri);
                console.log('Type : ' + file.type);
                console.log('File Name : ' + file.name);
                console.log('File Size : ' + file.size);
                console.log('File ID : ' + file.id);
                setFiles((files) => [...files, file]);
            }
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from multiple doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const removeFile = (item) => {
        console.log('Deleting item: ', item);
        setFiles(files.filter((file) => file !== item));
    };

    useEffect(() => {
        files.length === 0 ? (setIsVisibleAdd(true), setIsVisibleMain(false)) : (setIsVisibleAdd(false), setIsVisibleMain(true));
        return () => {
            setIsVisibleAdd(false);
            setIsVisibleMain(false);
        };
    });

    const renderFileItem = ({ item }) => {
        return (
            <Block style={styles.itemBlock}>
                <Block style={{ flexDirection: 'row' }}>
                    <Block>
                        <Text>{item.name}</Text>
                        <Text muted>{item.size + 'KB \u2027 ' + item.type}</Text>
                    </Block>
                    <Button
                        onPress={() => removeFile(item)}
                        onlyIcon
                        icon='remove'
                        iconFamily='FontAwesome'
                        iconSize={20}
                        color='#aaa'
                        iconColor='#fff'
                        style={{
                            width: 20,
                            height: 20,
                            marginLeft: 'auto',
                        }}
                    />
                </Block>
            </Block>
        );
    };

    const AddFileButton = (props) => {
        return (
            <Button
                onPress={addFiles}
                onlyIcon
                icon='add'
                iconFamily='ionicons'
                iconSize={props.size - 10}
                color='rgba(93,161,172,0.96)'
                iconColor='#fff'
                style={{
                    width: props.size,
                    height: props.size,
                    marginRight: '5%',
                }}
            />
        );
    };

    const AddFilesModal = () => {
        return (
            <Block middle={true} flex={1} style={{ marginBottom: '25%' }}>
                <AddFileButton size={65} />
                <Text h4 style={{ marginBottom: 10 }}>
                    Add your files
                </Text>
                <Text muted>{route.params.methodOfSharing}</Text>
            </Block>
        );
    };

    const FooterPromptComponent = () => {
        return (
            <Block style={styles.footerContainer}>
                <Button style={styles.actionPrompt} color='#ccc' onPress={() => setFiles([])}>
                    Start Over
                </Button>
                <Button
                    style={styles.actionPrompt}
                    color='rgba(93,161,172,0.96)'
                    onPress={() => navigation.navigate('UploadFilesToBlockChain', { files })}>
                    Next
                </Button>
            </Block>
        );
    };

    return (
        <View style={{ backgroundColor: '', flex: 1 }}>
            {isVisibleMain && (
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-between',
                    }}>
                    <View style={styles.container}>
                        <View style={styles.blockAddMore}>
                            <AddFileButton size={45} />
                            <View style={styles.textBlock}>
                                <Text style={{ fontWeight: '700', fontSize: 25 }}>Add more files</Text>
                                <Text muted>{route.params.methodOfSharing}</Text>
                            </View>
                        </View>
                        <FlatList data={files} renderItem={renderFileItem} keyExtractor={(file) => file.uri} />
                    </View>
                    <FooterPromptComponent />
                </ScrollView>
            )}
            {isVisibleAdd && <AddFilesModal />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: '5%',
        marginVertical: '10%',
        backgroundColor: '#eee',
        elevation: 15,
    },
    blockAddMore: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '90%',
        padding: '5%',
        paddingLeft: 0,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },
    textBlock: {
        justifyContent: 'center',
    },
    itemBlock: {
        flex: 1,
        alignSelf: 'center',
        width: '90%',
        paddingVertical: '5%',
        marginBottom: '5%',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
    },
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: '5%',
        justifyContent: 'center',
    },
    actionPrompt: {
        height: 60,
        alignSelf: 'flex-end',
    },
});
