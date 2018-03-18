import RNF from "firebase";

const firebase = RNF.initializeApp({
    apiKey: "AIzaSyAQYt1H_nd7uka1RiGJzhqWPBbigX2BWMQ",
    authDomain: "instant-chat-app.firebaseapp.com",
    databaseURL: "https://instant-chat-app.firebaseio.com",
    projectId: "instant-chat-app",
    storageBucket: "instant-chat-app.appspot.com",
    messagingSenderId: "631633552840"
});
export default firebase;