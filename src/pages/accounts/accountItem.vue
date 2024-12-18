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
    <div class="px-2 py-2 bg-color flex justify-between">
        <div class="button/13-semibold">
            <div class="accaunt-icon" style="background-color: "></div>
            {{ props.account.name }}
        </div>
        <div class="button/13-semibold">
            {{ props.account.balance }}
            {{ getCurrencySymbol(props.account.currency) }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.accaunt-icon {
}
</style>
