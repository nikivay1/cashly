<script setup lang="ts">
import { UserAccount } from '@/shared/model';
import { onMounted } from 'vue';

const props = defineProps({
    account: {
        type: Object as () => UserAccount,
        required: true,
    },
});

onMounted(() => {
    console.log(props);
});
</script>

<template>
    <div>{{ props.account.name }} - {{ props.account.balance }}</div>
</template>
