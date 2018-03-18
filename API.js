import { AsyncStorage ,Alert,ToastAndroid } from 'react-native'
import firebase from './firebase'

class API {
    //************ Auth API
    async getAuth(){
        // authState string - facebook/kakao/email/null
        // return obj - {result,authType}
        try {
            return await AsyncStorage.getItem('@Session:authType')
                .then((authState)=>{
                    if (authState != null)
                        return {
                            result: true,
                            authType: authState
                        }
                    else
                        return {
                            result: false,
                            authType: null,
                        }
                })
        }
        catch(err){
            console.log("Get auth failed:",err)
        }
    }

    login(type,callback,data){
        switch(type){
            case'fake' :
                return this._fake_Login(callback);


            default :
                break;
        }
    }

    logout(type,callback){
        switch(type){

            case'fake' :
                this._email_Logout();
                break;

            default :
                break;
        }
        callback();
    }

    _fake_Login(name){
        callback();
        const user = {
            uid : Date.now(),
            name : name
        }
        setUserData(user,'fake')
    }

    setUserData(currentUser,authType){
        const result = currentUser;
        console.log('login result',result);
        AsyncStorage.setItem('@Session:authType',authType);
        AsyncStorage.setItem('@Session:userConfig',JSON.stringify(userConfig));
        console.log("SET USER CONFIG");
        return firebase.database().ref(`users/${result.uid}`).update({
            authType:authType,
            userName:userConfig.name
        })
    }

    getUid(){
        return firebase.auth().currentUser.uid
    }
}

export default new API();