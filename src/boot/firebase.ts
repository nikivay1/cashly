import { useUserStore } from '@/stores/user';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
    browserSessionPersistence,
    getAuth,
    setPersistence,
} from 'firebase/auth';
import 'firebase/firestore'; // eslint-disable-line
import { boot } from 'quasar/wrappers';

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
};

export default boot(() => {
    initializeApp(firebaseConfig);
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence);
    const { loginOrCreateUser } = useUserStore();

    loginOrCreateUser(auth.currentUser);
});
