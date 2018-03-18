import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Dimensions,KeyboardAvoidingView,AsyncStorage,TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import ChatBar from './component/ChatBar';
import ChatBox from './component/ChatBox';
import Character from './component/Character';
import firebase from './firebase';

const {width, height} = Dimensions.get('window');

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded:'false',
            message: '',
            outMessage:'',
            emotionState:'good',
            chatPartner:'',
            uid:'uid1',
            pageState:'main'//main, setName
        };
        this.now = 0;
    };

    componentDidMount(){
        this.getChatPartner();
        this.getting_data();
    }

    getUid(){
        AsyncStorage.getItem('uid',(v)=>{
            if(v==null || v.length==0){
                this.setState({
                    isLoaded:true,
                    pageState:'setName'
                })
            }
            else {
                this.setState({
                    isLoaded: true,
                    uid: JSON.parse(v)
                }, ()=>{
                })
            }
        })
    }

    fetchEmotion(text){
        fetch('https://us-central1-instant-chat-app.cloudfunctions.net/emotionAnalysis',{
            'method':'post',
            'Content-Type':'text/plain',
            'body':JSON.stringify(text)
        })
            .then((res)=>{return res.json()})
            .then((res)=>{return this.setState({emotionState:res})})
    };
    removeRef(){
        firebase.database().ref(`users/${this.state.uid}/chatPartner`).once('value',(snap)=>{
            firebase.database().ref(`users/${snap.val()}/message`).off();
        })
    }

    getting_data() {
        firebase.database().ref(`users/${this.state.uid}/chatPartner`).once('value',(snap)=>{
            firebase.database().ref(`users/${snap.val()}/message`).on('value', (snapshot) => {
                const message = snapshot.val();
                if(message==null || message.length==0) return;
                this.fetchEmotion(message);
                this.setState({message});
                this.now = Date.now();
                setTimeout(() => this.remove_data(), 5000)
            });
        })
    };

    getChatPartner(){
    }

    remove_data() {
        if(this.now+5000>Date.now()) return;
        this.setState({'message':''});
        return firebase.database().ref(`users/${this.state.chatPartner}/message`).set('');
    };

    render() {
        return (
            <View style={{flex:1,backgroundColor:'pink'}}>
                <TouchableOpacity
                    style={{width:width,height:80,zIndex:999,position:'absolute'}}
                    onPress={()=> {
                        alert(this.state.uid)
                        this.removeRef(this.state.uid);
                        if (this.state.uid == 'uid1') {
                            this.setState({uid: 'uid2'},()=>{
                                this.getting_data()
                            })
                        }
                        else {
                            this.setState({uid: 'uid1'},()=>{
                                this.getting_data()
                            })
                        }
                    }} />
                <KeyboardAvoidingView behavior="padding" style={{height:height*.6,}}>
                    <ChatBox message={this.state.message}/>
                    <Character state={this.state.emotionState}/>
                </KeyboardAvoidingView>
                <ChatBar uid={this.state.uid}/>
            </View>
        );
    }

};
