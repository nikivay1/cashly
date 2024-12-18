import { Timestamp } from 'firebase/firestore';

export interface User {
    uid: string;
    name?: string;
    deleted: boolean;
    isAnonymous: boolean;
    displayName?: string;
    deviceId?: string;
    email?: string;
    enabled?: boolean;
    create_at: Timestamp;
    updated_at?: Timestamp;
    deletedAt?: Timestamp;
}

export interface UserAccount {
    uid?: string;
    name: string;
    balance: string;
    currency: keyof typeof CurrencySymbols;
    active: boolean;
}

export enum CurrencySymbols {
    GEL = '₾',
    RUB = '₽',
    USD = '$',
    EUR = '€',
}

export const currencyList = [
    {
        label: 'Лари (GEL)',
        value: CurrencySymbols.GEL,
    },
    {
        label: 'Рубли (RUB)',
        value: CurrencySymbols.RUB,
    },
    {
        label: 'Доллары (USD)',
        value: CurrencySymbols.USD,
    },
    {
        label: 'Евро (EUR)',
        value: CurrencySymbols.EUR,
    },
];
