import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export const firebaseConfig = {
	apiKey: "AIzaSyDq8M4P8rEEiufPpP3Tf2h2ij4T-7cYTWs",
	authDomain: "bunkers-7dede.firebaseapp.com",
	projectId: "bunkers-7dede",
	storageBucket: "bunkers-7dede.appspot.com",
	messagingSenderId: "18764842495",
	appId: "1:18764842495:web:be75517238fdac732d93ca",
	measurementId: "G-TNL3FZ9MKJ",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}
