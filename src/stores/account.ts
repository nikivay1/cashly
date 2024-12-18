import { UserAccount } from '@/shared/model';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    getFirestore,
    updateDoc,
} from 'firebase/firestore';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface AccountStore {
    accounts: UserAccount[];
}

export const useAccountStore = defineStore('account', () => {
    const state = ref<AccountStore>({
        accounts: [],
    });

    const db = getFirestore();

    /**
     * Loads the accounts for the given user id from Firestore.
     *
     * @param userId - The Firebase Authentication user ID.
     */
    const loadAccounts = async (userId: string) => {
        try {
            const accountsRef = collection(db, 'users', userId, 'accounts');
            const accounts = await getDocs(accountsRef);

            state.value.accounts = accounts.docs.map((doc) => {
                return {
                    uid: doc.id,
                    ...doc.data(),
                } as UserAccount;
            });
        } catch (error) {
            console.error('Error loading accounts:', error);
        }
    };

    /**
     * Adds a new account to the user.
     *
     * @param userId - The Firebase Authentication user ID.
     * @param name - The name of the account.
     * @param balance - The initial balance of the account.
     * @param currency - The currency of the account.
     */
    const addAccount = async (
        userId: string,
        name: string,
        balance: string,
        currency: string
    ) => {
        const accountRef = collection(db, `users/${userId}/accounts`);

        const accountData = { name, balance, currency };
        await addDoc(accountRef, accountData);

        await loadAccounts(userId);
    };

    /**
     * Updates an existing account.
     *
     * @param userId - The Firebase Authentication user ID.
     * @param accountId - The ID of the account to update.
     * @param newAccount - The new account details.
     */
    const updateAccount = async (
        userId: string,
        accountId: string,
        newAccount: UserAccount
    ) => {
        try {
            const accountRef = doc(db, 'users', userId, 'accounts', accountId);

            await updateDoc(accountRef, {
                ...newAccount,
            });
            await loadAccounts(userId);
        } catch (error) {
            console.error('Error updating balance:', error);
        }
    };

    return {
        state,
        loadAccounts,
        addAccount,
        updateAccount,
    };
});
