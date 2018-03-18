import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Dimensions,KeyboardAvoidingView} from 'react-native';
import {Icon} from 'react-native-elements';
import ChatBar from './component/ChatBar';
import ChatBox from './component/ChatBox';
import Character from './component/Character';
import firebase from './firebase';

const {width, height} = Dimensions.get('window');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            outMessage:'',
            emotionState:'good'
        };
        this.now = 0;

        this.ref = `users/uid1/message`;
    };

    fetchEmotion(text){
        fetch('https://us-central1-instant-chat-app.cloudfunctions.net/emotionAnalysis',{
            'method':'post',
            'Content-Type':'text/plain',
            'body':JSON.stringify(text)
        })
            .then((res)=>{return res.json()})
            .then((res)=>{return this.setState({emotionState:res})})
    };

    getting_data() {
        firebase.database().ref(this.ref).on('value', (snapshot) => {
            const message = snapshot.val();
            if(message.length==0) return;
            this.fetchEmotion(message);
            this.setState({message});
            this.now = Date.now();
            setTimeout(() => this.remove_data(), 5000)
        });
    };

    remove_data() {
        if(this.now+5000>Date.now()) return;
        this.setState({'message':''});
        return firebase.database().ref(this.ref).set('');
    };

    _displayChatBox = (chatText) => {
        return chatText;
    };

    componentDidMount() {
        this.getting_data();
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'pink'}}>
                <KeyboardAvoidingView behavior="padding" style={{height:height*.6,}}>
                    <ChatBox message={this.state.message}/>
                    <Character state={this.state.emotionState}/>
                </KeyboardAvoidingView>
                <ChatBar />
            </View>
        );
    }

};
