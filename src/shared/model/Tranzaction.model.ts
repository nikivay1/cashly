import { Timestamp } from 'firebase/firestore';

export type TransactionMainType =
    | 'expense'
    | 'income'
    | 'transfer'
    | 'refund'
    | 'other';

export interface ITransaction {
    id: string;
    date: Timestamp;
    amount: number;
    mainType: TransactionMainType;
    categoryId: string;
    accountId: string;
    note: string;
    repeatInterval: string | null;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface ITransactionCreateData {
    date: Date;
    amount: number;
    mainType: TransactionMainType;
    categoryId: string;
    accountId: string;
    note?: string;
    repeatInterval?: string | null;
}

export interface ITransactionUpdateData {
    transactionId: string;
    date?: Date;
    amount?: number;
    mainType?: TransactionMainType;
    categoryId?: string;
    accountId?: string;
    note?: string;
    repeatInterval?: string | null;
}

export interface ITransactionFilters {
    startDate?: Date;
    endDate?: Date;
    categoryId?: string;
    mainType?: TransactionMainType;
}
