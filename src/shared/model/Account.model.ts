import { Timestamp } from 'firebase/firestore';

export interface User {
    uid: string;
    name?: string;
    deleted: boolean;
    isAnonymous: boolean;
    displayName?: string;
    email?: string;
    enabled?: boolean;
    create_at: Timestamp;
    updated_at?: Timestamp;
    deletedAt?: Timestamp;
}

export interface UserAccount {
    uid?: string;
    name: string;
    balance: number;
    currency: string;
    active: boolean;
}
