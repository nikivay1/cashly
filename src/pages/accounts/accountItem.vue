<script setup lang="ts">
import { CurrencySymbols, UserAccount } from '@/shared/model';

const props = defineProps({
    account: {
        type: Object as () => UserAccount,
        required: true,
    },
});
function getCurrencySymbol(value: keyof typeof CurrencySymbols): string {
    return CurrencySymbols[value] || '—';
}
</script>

<template>
    <div>
        {{ props.account.name }} - {{ props.account.balance }}
        {{ getCurrencySymbol(props.account.currency) }}
    </div>
</template>
