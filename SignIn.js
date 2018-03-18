import React,{Component} from 'react';
import {Image, TextInput, View, Text, Alert, ScrollView, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

import Spinner      from 'react-native-loading-spinner-overlay';
import {Actions}    from 'react-native-router-flux';
import firebase     from './firebase';

import API          from './API'

const {height,width} = Dimensions.get('window')
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginType: 'none',
            showSpinner: false,
        }
    }

    componentDidMount(){
    }

    render() {
        const loginView=(
            <View style={styles.loginContainer}>

                <TouchableOpacity
                    style={{width:200,height:80,backgroundColor:'grey'}}
                    onClick={() =>{this.login_social('google')}}
                />
            </View>
        )

        return (
            <ScrollView>
                <View style={styles.logoContainer}>
                </View>
                {loginView}
                <Spinner visible={this.state.showSpinner}/>
            </ScrollView>
        )
    }

    login_callback(isCancel){
        if(isCancel)
            return this.setState({showSpinner:false});
        else
            return this.setState({showSpinner:false},Actions.main());
    }

    login_social(type){
        this.setState({loginType:type,showSpinner:true});
        API.login(type, (isCancel)=>this.login_callback(isCancel))
    }
}

const styles = StyleSheet.create({
    logoContainer : {
        marginTop:70,
        alignItems:'center',
        justifyContent:'center',
    },
    loginContainer : {
        paddingVertical:40,
        justifyContent:'center',
        alignItems:'center',
    },
    inputContainer : {
        paddingLeft:35,
        width:width*.8,
        right:10,
    },
    iconStyle : {
        width: 20,
        height: 20,
        alignSelf: 'center',
        left: 15
    },
    inputBox:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'white',
        borderRadius:30,
        margin:4
    },
    signUpContainer:{
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:15
    },
    iconGoogle:{
        width:20,
        height:20
    },
    emailButton:{
        margin:10,width: width * .8,borderColor:'#FFACA9',borderWidth:0.5,borderRadius:0,height:50, elevation:1.5
    },
    facebookButton:{
        margin:10,width: width * .8,borderColor:'#3e80c2',borderWidth:0.5,borderRadius:0,height:50, elevation:1.5
    },
    googleButton:{
        margin:10,width: width * .8,borderColor:'#c8c8c8',borderWidth:0.5,borderRadius:0,height:50, elevation:1.5
    },
    logo:{
        height:100,
        width:340
    }
});



export default SignIn;