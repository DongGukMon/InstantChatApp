import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Dimensions,
    Keyboard,
} from 'react-native';

import {Icon} from 'react-native-elements';
import firebase from '../firebase';


const { width, height } = Dimensions.get('window');
export default class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marginBottom: 0,
            sendHeight: 24,
            text: '',
        };
        this.ref = `users/uid1/message`;
    }
    componentDidMount() {
        this.keyboardShowListener = Keyboard.addListener('keyboardDidShow', (e) =>
            this.keyboardDidMount(e)
        );
        this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', () =>
            this.setState({ marginBottom: 0 })
        );
    }

    componentWillUnmount() {
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    }

    keyboardDidMount(e) {
        this.setState({ marginBottom: e.endCoordinates.height });
    }
    input_data(textData) {
        return firebase.database().ref(this.ref).set(textData)
    }

    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width,
                    position: 'absolute',
                    bottom: this.state.marginBottom,
                }}>
                <TextInput
                    style={{
                        paddingHorizontal: 10,
                        paddingTop:10,
                        paddingVertical: 10,
                        flex: 8.5,
                        fontSize: 18,
                        backgroundColor: 'white',
                    }}
                    maxHeight={72}
                    multiline={true}
                    underlineColorAndroid={'white'}
                    autoFocus={false}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    onLayout={(ev) => {
                        this.setState({ sendHeight: ev.nativeEvent.layout.height });
                    }}
                />
                <TouchableOpacity
                    style={{
                        flex: 1.5,
                        backgroundColor: 'skyblue',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: this.state.sendHeight,
                    }}
                    onPress={() => {
                        this.input_data(this.state.text);
                        Keyboard.dismiss();
                        this.setState({text: ''});
                    }
                    }>
                    <Icon
                        name='ios-send'
                        type="ionicon"
                        color='#00aced' />
                </TouchableOpacity>
            </View>
        );
    }
}
