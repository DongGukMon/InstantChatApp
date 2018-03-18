import React, {Component} from 'react';
import {View, StyleSheet, TextInput,Text} from 'react-native';
import {Icon} from 'react-native-elements';
import firebase from '../firebase';

export default class ChatBox extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        const {message} = this.props;
        return (
            <View style={styles.container}>
                {
                    message.length!==0 &&
                    <View style={styles.container} >
                        <View
                            style={{width:250,backgroundColor:'white',alignItems:'center',padding:10,borderRadius:5,}}>
                            <Text>
                                {message}
                            </Text>
                        </View>

                        <View
                            transform={[{rotate: '45deg'}]}
                            style={{width:25,height:25,borderRightWidth:25,borderTopWidth:25,borderRightColor:'white',borderTopColor:'#ffffff00',top:-16}} />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end'
    },
});