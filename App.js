import React, {Component} from 'react';
import {Alert, BackHandler, Image, TouchableOpacity, View, AppState, ToastAndroid, StyleSheet,Platform,Dimensions} from 'react-native';

const {width,hegiht} = Dimensions.get('window')

//modules
import {
    Actions,
    Reducer,
    Scene,
    Router
}                        from 'react-native-router-flux';
import firebase         from './firebase';

//screens

import Main          from './Main';
// import SignIn       from './SignIn';

//services
import API              from './API';

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            onLoading : false,
            authState : false,
        }
        this.backPressedTime = 0
    }

    componentWillMount(){
        // API.getAuth()
        //     .then( (data) => {
        //         if(data.result){
        //             console.log('GET AUTH:',data)
        //             this.setState({authState:true, onLoading:false})
        //         } else{
        //             console.log('NO AUTH:',data)
        //             this.setState({authState:false, onLoading:false})
        //         }
        //     })
    }

    componentDidMount(prevProps,prevState){
    }

    componentWillUnmount() {
    }
    render(){
        if(this.state.onLoading){
            return(<View/>)
        }

        return(
            <Router
                navigationBarStyle={styles.navBar}
                titleStyle={styles.title}
                sceneStyle={{backgroundColor:'#fff', flex:1}}
                createReducer={(params)=>this.reducerCreate(params)}
                backAndroidHandler={()=>this.onBackHandler()} >

                <Scene key='root'>

                    {/* Sign */}
                    {/*<Scene*/}
                        {/*key='signin'*/}
                        {/*component={SignIn}*/}
                        {/*hideNavBar={true}*/}
                        {/*sceneStyle ={{marginTop:0}}*/}
                        {/*initial={!this.state.authState}*/}
                        {/*panHandlers={null} // this prop handling gesture*/}
                    {/*/>*/}

                    {/* Main */}
                    <Scene
                        key='main'
                        component={Main}
                        sceneStyle = {styles.scene}
                        getTitle={(props)=>props.title}
                        hideNavBar={true}
                        panHandlers={null} // this prop handling gesture
                        initial={true}
                    />

                </Scene>
            </Router>
        )
    }

    backButton(){
        return (
            <TouchableOpacity
                onPress={()=>Actions.pop()}>
                <Text>뒤로</Text>
            </TouchableOpacity>
        )
    }

    // !FIXME
    onBackHandler() {
        console.log('BackHandler:currentScene:',Actions.currentScene);
        if(Actions.currentScene === 'signin' || Actions.currentScene === 'main'){
            if(Date.now() > this.backPressedTime+2000){
                this.backPressedTime=Date.now();
                ToastAndroid.show('뒤로 버튼을 한번 더 누르면 종료됩니다.', ToastAndroid.SHORT);
                return true; //remain in app
            }else{
                return BackHandler.exitApp();
            }
        } else {
            try {
                Actions.pop();
                return true;
            } catch (e) {
                console.log('onBackHandler:pop failed -maybe at root?');
                return false;
            }
        }
    }

    reducerCreate(params) {
        const defaultReducer = Reducer(params);
        return (state, action) => {
            console.log('state',state)
            console.log('action',action)
            // console.log('reducer:',state,action);
            // if (action.scene)
            //     console.log('ACTION:', [action.routeName, action.scene.type]);
            // if (action.scene && action.scene.sceneKey === 'tabview' &&
            //     (action.scene.type === 'REACT_NATIVE_ROUTER_FLUX_PUSH' || action.scene.type === 'REACT_NATIVE_ROUTER_FLUX_REFRESH')) {
            //     console.log('catch back to main');
            // }
            // this.sceneKey = action.scene ? action.scene.sceneKey : '';
            return defaultReducer(state, action);
        }
    }
}



export default App;


const styles = StyleSheet.create({
    navBar:{
        backgroundColor : '#fff',
        height:50,
        borderBottomWidth:1,
        borderColor:'#ccc',
        elevation:0
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    scene: {
        backgroundColor:'#fff'
    },
    sceneNav: {
        flex :1,
        marginTop : (Platform.OS === 'ios') ? 64 : 54,
        backgroundColor:'#fff'
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
        color:'#444',
        alignSelf:'center'
    },
    backButton: {
        tintColor: '#444', width: 25, height: 25,marginLeft:15
    }
});

console.ignoredYellowBox = ['setting-detail a timer'];