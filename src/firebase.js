import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyBjcA5TT4_TundpDcQCtQi6DxGxmxEhmcg",
	authDomain: "yo-chat-5b0b7.firebaseapp.com",
	databaseURL: "https://yo-chat-5b0b7-default-rtdb.firebaseio.com",
	projectId: "yo-chat-5b0b7",
	storageBucket: "yo-chat-5b0b7.appspot.com",
	messagingSenderId: "406027006790",
	appId: "1:406027006790:web:8a50ae31b81139af922b47",
	measurementId: "G-LX4QWPES6K",
});

const db = firebaseApp.database();

export { db };
