import { defineStore } from 'pinia';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User,
} from 'firebase/auth';
import { getAuth, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { User as Account } from '@/shared/model';
import { v4 as uuidv4 } from 'uuid';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    serverTimestamp,
    setDoc,
    Timestamp,
    where,
} from 'firebase/firestore';
import { Device } from '@capacitor/device';

export interface userStore {
    isAuthenticated: boolean;
    userId?: string;
    email: string | null;
    displayName?: string;
    isAnonymous: boolean;
    userData?: Account;
}

export const useUserStore = defineStore('user', () => {
    const auth = getAuth();
    const db = getFirestore();

    const state = ref<userStore>({
        isAuthenticated: false,
        isAnonymous: false,
        email: null,
    });

    /**
     * Sets the user store state to the given user's information.
     * @param {Account} user The user to set the state to. If not provided, the state is reset.
     */
    const setUser = (user?: Account) => {
        if (!user) {
            return;
        }
        state.value.isAuthenticated = !user.isAnonymous;
        state.value.userId = user.uid;
        state.value.email = state.value.userData?.email || user.email || '';
        state.value.displayName =
            state.value.userData?.displayName ||
            user.displayName ||
            'Anonymous';
        state.value.isAnonymous = user.isAnonymous;
        state.value.userData = user;
    };

    /**
     * Logs out the current user by signing them out of the authentication service,
     * resets the user state to its initial state, and signs in anonymously.
     */
    const logout = async () => {
        try {
            await signOut(auth);
            resetState();
            await signInOrCreateDeviceID();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    /**
     * Registers a new user with email and password.
     *
     * @param email - The email address for the new user.
     * @param password - The password for the new user.
     */
    const register = async (email: string, password: string) => {
        try {
            const currentUser = auth.currentUser;
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const newUser = result.user;

            //
            if (currentUser?.isAnonymous && newUser) {
                await currentUser.delete();
            }

            setUser();
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    /**
     * Logs in an existing user with email and password.
     *
     * @param email - The email address for the existing user.
     * @param password - The password for the existing user.
     */
    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setUser();
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    /**
     * Signs in the user by device ID or creates a new anonymous user account if no user is found.
     *
     * This function retrieves the device ID and queries the Firestore database for any user associated with that device ID.
     * If a user exists, the user data is set in the state. If no user is found, a new anonymous user account is created
     * with a unique user ID and the current device ID, and this new account is stored in the Firestore database.
     */
    async function signInOrCreateDeviceID() {
        const deviceId = await Device.getId();
        const q = query(
            collection(db, 'users'),
            where('deviceId', '==', deviceId.identifier)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length) {
            setUser(querySnapshot.docs[0].data() as Account);
            console.log('User found by deviceId:', state.value.userData);
        } else {
            const uid = uuidv4();
            const userRef = doc(db, 'users', uid);
            const defaultUser: Account = {
                uid: uid,
                deleted: false,
                isAnonymous: true,
                deviceId: deviceId.identifier,
                create_at: serverTimestamp() as Timestamp,
            };
            await setDoc(
                userRef,
                {
                    ...defaultUser,
                },
                { merge: true }
            );
            setUser(defaultUser);
            console.log('New user created by deviceId:', defaultUser);
        }
    }

    /**
     * Logs in the given user or creates a new anonymous user account if the given user is null.
     *
     * This function first tries to log in the given user by querying the Firestore database for the user data.
     * If the user data exists, the user data is set in the state. If no user data is found, a new anonymous user account
     * is created with a unique user ID and the current device ID, and this new account is stored in the Firestore database.
     *
     * @param user - The user to log in, or null to create a new anonymous user account.
     */
    async function loginOrCreateUser(user: User | null) {
        const deviceId = await Device.getId();
        if (user) {
            const userId = user?.uid;
            const userRef = doc(db, 'users', userId || '');
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                setUser(userDoc.data() as Account);
                console.log('User logged in:', state.value.userData);
            } else {
                const uid = uuidv4();
                const userRef = doc(db, 'users', uid);
                const defaultUser: Account = {
                    uid: uid,
                    deleted: false,
                    isAnonymous: true,
                    deviceId: deviceId.identifier,
                    create_at: serverTimestamp() as Timestamp,
                };
                await setDoc(
                    userRef,
                    {
                        ...defaultUser,
                    },
                    { merge: true }
                );
                setUser(defaultUser);
                console.log('New user created by user:', defaultUser);
            }
            return;
        }
        signInOrCreateDeviceID();
    }

    /**
     * Resets the state of the user store to its initial state.
     */
    const resetState = () => {
        state.value = {
            isAuthenticated: false,
            isAnonymous: false,
            email: null,
        };
    };

    return {
        state,
        resetState,
        logout,
        loginOrCreateUser,
        setUser,
        register,
        login,
    };
});
