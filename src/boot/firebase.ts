import { useUserStore } from '@/stores/user';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
    browserSessionPersistence,
    getAuth,
    onAuthStateChanged,
    setPersistence,
} from 'firebase/auth';
import 'firebase/firestore'; // eslint-disable-line
import { boot } from 'quasar/wrappers';
import { User } from 'firebase/auth';

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
    const { setUser, loginAnonymous, resetState } = useUserStore();

    onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
            setUser();
        } else {
            resetState();
            await loginAnonymous();
        }
    });
});
