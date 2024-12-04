import { defineStore } from 'pinia';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User,
    UserCredential,
} from 'firebase/auth';
import { getAuth, signInAnonymously, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { User as Account } from '@/shared/model';
import {
    doc,
    getDoc,
    getFirestore,
    serverTimestamp,
    setDoc,
    Timestamp,
} from 'firebase/firestore';

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
     * Sets the user state to the given user.
     *
     * @param user - The user to set the state to.
     */
    const setUser = () => {
        const user = auth.currentUser as User;
        if (!user) {
            return;
        }
        if (user.uid) {
            const userRef = doc(db, 'users', user.uid);
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    state.value.userData = docSnap.data() as Account;
                }
            });
        }

        state.value.isAuthenticated = !user.isAnonymous;
        state.value.userId = user.uid;
        state.value.email = state.value.userData?.email || user.email;
        state.value.displayName =
            state.value.userData?.displayName ||
            user.displayName ||
            'Anonymous';
        state.value.isAnonymous = user.isAnonymous;
    };

    /**
     * Logs out the current user by signing them out of the authentication service,
     * resets the user state to its initial state, and signs in anonymously.
     */
    const logout = async () => {
        try {
            await signOut(auth);
            resetState();
            await signInAnonymously(auth);
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
     * Logs in a user anonymously using Firebase authentication, creates a user
     * document in Firestore with default values for an anonymous user, and updates
     * the user state.
     *
     * If successful, sets the user state with the newly created anonymous user.
     * In case of an error, logs the error to the console.
     */
    const loginAnonymous = async () => {
        try {
            const result: UserCredential = await signInAnonymously(auth);
            const userRef = doc(db, 'users', result.user.uid);
            const defaultUser: Account = {
                uid: result.user.uid,
                deleted: false,
                isAnonymous: true,
                create_at: serverTimestamp() as Timestamp,
            };
            await setDoc(
                userRef,
                {
                    ...defaultUser,
                },
                { merge: true }
            );
            setUser();
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

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
        loginAnonymous,
        setUser,
        register,
        login,
    };
});
