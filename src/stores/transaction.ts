import {
    ITransaction,
    ITransactionCreateData,
    ITransactionFilters,
    ITransactionUpdateData,
} from '@/shared/model';
import {
    collection,
    doc,
    DocumentReference,
    getDocs,
    getFirestore,
    orderBy,
    query,
    QueryConstraint,
    runTransaction,
    Timestamp,
    where,
} from 'firebase/firestore';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTransactionsStore = defineStore('transactions', () => {
    const transactions = ref<ITransaction[]>([]);
    const loading = ref(false);
    const userId = ref<string | null>(null);

    const db = getFirestore();

    function setUserId(id: string) {
        userId.value = id;
    }

    async function fetchTransactions(filters: ITransactionFilters = {}) {
        if (!userId.value) return;
        loading.value = true;

        try {
            const colRef = collection(
                db,
                'users',
                userId.value,
                'transactions'
            );
            const qConstraints: QueryConstraint[] = [orderBy('date', 'desc')];

            if (filters.startDate) {
                qConstraints.push(
                    where('date', '>=', Timestamp.fromDate(filters.startDate))
                );
            }
            if (filters.endDate) {
                qConstraints.push(
                    where('date', '<=', Timestamp.fromDate(filters.endDate))
                );
            }
            if (filters.categoryId) {
                qConstraints.push(
                    where('categoryId', '==', filters.categoryId)
                );
            }
            if (filters.mainType) {
                qConstraints.push(where('mainType', '==', filters.mainType));
            }

            const qRef = query(colRef, ...qConstraints);
            const snap = await getDocs(qRef);

            const txData: ITransaction[] = [];
            snap.forEach((docSnap) => {
                const data = docSnap.data();
                txData.push({
                    id: docSnap.id,
                    date: data.date,
                    amount: data.amount,
                    mainType: data.mainType,
                    categoryId: data.categoryId,
                    accountId: data.accountId,
                    note: data.note,
                    repeatInterval: data.repeatInterval,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                });
            });

            transactions.value = txData;
        } catch (error) {
            console.error('Ошибка при загрузке транзакций:', error);
        } finally {
            loading.value = false;
        }
    }

    async function createTransaction(data: ITransactionCreateData) {
        if (!userId.value) return;
        loading.value = true;

        const {
            date,
            amount,
            mainType,
            categoryId,
            accountId,
            note = '',
            repeatInterval = null,
        } = data;

        try {
            const accountsRef = doc(
                db,
                'users',
                userId.value,
                'accounts',
                accountId
            );
            const transactionsColRef = collection(
                db,
                'users',
                userId.value,
                'transactions'
            );

            await runTransaction(db, async (transaction) => {
                const accSnap = await transaction.get(accountsRef);
                if (!accSnap.exists()) {
                    throw new Error('Счёт не найден');
                }

                const now = Timestamp.now();
                const newTxRef: DocumentReference = doc(transactionsColRef);
                const newTx = {
                    date: Timestamp.fromDate(date),
                    amount,
                    mainType,
                    categoryId,
                    accountId,
                    note,
                    repeatInterval,
                    createdAt: now,
                    updatedAt: now,
                };

                transaction.set(newTxRef, newTx);

                let delta = 0;
                if (mainType === 'expense') {
                    delta = -Math.abs(amount);
                } else if (mainType === 'income') {
                    delta = Math.abs(amount);
                }

                if (delta !== 0) {
                    const accountData = accSnap.data();
                    const newBalance =
                        (accountData.currentBalance || 0) + delta;
                    transaction.update(accountsRef, {
                        currentBalance: newBalance,
                    });
                }

                transactions.value.push({
                    id: newTxRef.id,
                    ...newTx,
                });
            });
        } catch (error) {
            console.error('Ошибка при создании транзакции:', error);
        } finally {
            loading.value = false;
        }
    }

    async function updateTransaction(data: ITransactionUpdateData) {
        if (!userId.value) return;
        loading.value = true;

        const { transactionId, ...updatedData } = data;

        try {
            const txRef = doc(
                db,
                'users',
                userId.value,
                'transactions',
                transactionId
            );

            await runTransaction(db, async (transaction) => {
                const txSnap = await transaction.get(txRef);
                if (!txSnap.exists()) {
                    throw new Error('Транзакция не найдена');
                }

                const oldTx = txSnap.data() as Omit<ITransaction, 'id'>;

                const now = Timestamp.now();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const finalData: any = {
                    updatedAt: now,
                    date: updatedData.date
                        ? Timestamp.fromDate(updatedData.date)
                        : oldTx.date,
                    amount:
                        updatedData.amount !== undefined
                            ? updatedData.amount
                            : oldTx.amount,
                    mainType: updatedData.mainType ?? oldTx.mainType,
                    categoryId: updatedData.categoryId ?? oldTx.categoryId,
                    accountId: updatedData.accountId ?? oldTx.accountId,
                    note: updatedData.note ?? oldTx.note,
                    repeatInterval:
                        updatedData.repeatInterval ?? oldTx.repeatInterval,
                };

                const accountId = finalData.accountId;
                const accountsRef = doc(
                    db,
                    'users/' + userId.value + '/accounts/' + accountId
                );
                const accSnap = await transaction.get(accountsRef);
                if (!accSnap.exists()) {
                    throw new Error('Счёт не найден');
                }

                let oldDelta = 0;
                if (oldTx.mainType === 'expense') {
                    oldDelta = -Math.abs(oldTx.amount);
                } else if (oldTx.mainType === 'income') {
                    oldDelta = Math.abs(oldTx.amount);
                }

                let newDelta = 0;
                if (finalData.mainType === 'expense') {
                    newDelta = -Math.abs(finalData.amount);
                } else if (finalData.mainType === 'income') {
                    newDelta = Math.abs(finalData.amount);
                }

                const balanceChange = newDelta - oldDelta;

                transaction.update(txRef, finalData);

                if (balanceChange !== 0) {
                    const accountData = accSnap.data();
                    const newBalance =
                        (accountData.currentBalance || 0) + balanceChange;
                    transaction.update(accountsRef, {
                        currentBalance: newBalance,
                    });
                }

                const index = transactions.value.findIndex(
                    (tx) => tx.id === transactionId
                );
                if (index !== -1) {
                    transactions.value[index] = {
                        ...transactions.value[index],
                        ...finalData,
                        id: transactionId,
                    };
                }
            });
        } catch (error) {
            console.error('Ошибка при обновлении транзакции:', error);
        } finally {
            loading.value = false;
        }
    }

    async function deleteTransaction(transactionId: string) {
        if (!userId.value) return;
        loading.value = true;

        try {
            const txRef = doc(
                db,
                'users',
                userId.value,
                'transactions',
                transactionId
            );

            await runTransaction(db, async (transaction) => {
                const txSnap = await transaction.get(txRef);
                if (!txSnap.exists()) {
                    throw new Error('Транзакция не найдена');
                }

                const oldTx = txSnap.data() as Omit<ITransaction, 'id'>;
                const accountId = oldTx.accountId;
                const accountsRef = doc(
                    db,
                    'users/' + userId.value + '/accounts/' + accountId
                );
                const accSnap = await transaction.get(accountsRef);
                if (!accSnap.exists()) {
                    throw new Error('Счёт не найден');
                }

                let oldDelta = 0;
                if (oldTx.mainType === 'expense') {
                    oldDelta = -Math.abs(oldTx.amount);
                } else if (oldTx.mainType === 'income') {
                    oldDelta = Math.abs(oldTx.amount);
                }

                const rollback = -oldDelta;

                transaction.delete(txRef);

                if (rollback !== 0) {
                    const accountData = accSnap.data();
                    const newBalance =
                        (accountData.currentBalance || 0) + rollback;
                    transaction.update(accountsRef, {
                        currentBalance: newBalance,
                    });
                }

                transactions.value = transactions.value.filter(
                    (tx) => tx.id !== transactionId
                );
            });
        } catch (error) {
            console.error('Ошибка при удалении транзакции:', error);
        } finally {
            loading.value = false;
        }
    }

    return {
        transactions,
        loading,
        userId,
        setUserId,
        fetchTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    };
});
