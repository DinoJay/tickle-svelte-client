import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_PROJECT_ID + 'firebaseapp.com',
	databaseURL: 'https://' + import.meta.env.VITE_DATABASE_NAME + 'firebaseio.com',
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_PROJECT_ID + '.appspot.com',
	messagingSenderId: import.meta.env.VITE_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID
};

const initializeFirebase = () => {
	if (getApps().length === 0) {
		return initializeApp(firebaseConfig);
	} else {
		return getApp();
	}
};

const app = initializeFirebase();
const auth = getAuth(app);
let db = getFirestore(app);

export { app, auth, db };
