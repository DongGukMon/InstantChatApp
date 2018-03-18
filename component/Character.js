import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Text, Image} from 'react-native';

import fucking from '../gif/fucking.gif';
import good from '../gif/good.gif';
import happy from '../gif/happy.gif';

export default class Character extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {state} = this.props
        const character = state=='happy' ? happy : state=='good' ? good : fucking;
        return (
            <View style={styles.container}>
                <Image
                    style={{width: 260, height: 260,top:-40}}
                    source={(character)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',

    },
});