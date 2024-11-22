<template>
  <q-page>
    <!-- Основной макет -->
    <q-layout>
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>
            Cashly
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <!-- Баланс -->
        <q-card>
          <q-card-section>
            <div class="text-h6">Balance</div>
            <div class="text-h4">${{ balance }}</div>
          </q-card-section>
        </q-card>

        <!-- Кнопка для добавления транзакции -->
        <q-btn label="Add Transaction" color="primary" @click="openModal" />

        <!-- Список транзакций -->
        <q-list>
          <q-item-label>Transaction 1</q-item-label>
          <q-item-label>Transaction 2</q-item-label>
        </q-list>
      </q-page-container>
    </q-layout>

    <!-- Модальное окно для добавления транзакции -->
    <q-dialog v-model="modalOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add Transaction</div>
          <q-input v-model="transactionAmount" label="Amount" type="number" />
          <q-select v-model="transactionType" :options="transactionTypes" label="Type" />
        </q-card-section>

        <q-card-actions>
          <q-btn label="Cancel" color="secondary" @click="closeModal" />
          <q-btn label="Add" color="primary" @click="addTransaction" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'TransactionPage'
});

const balance = ref(1000); 
const modalOpen = ref(false); 
const transactionAmount = ref(0); 
const transactionType = ref(null);
const transactionTypes = ref([
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' }
]);

const openModal = () => {
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  transactionAmount.value = 0;
  transactionType.value = null;
};

const addTransaction = () => {
  if (transactionType.value === 'income') {
    balance.value += Number(transactionAmount.value);
  } else if (transactionType.value === 'expense') {
    balance.value -= Number(transactionAmount.value);
  }
  closeModal();
};
</script>

<style scoped>
</style>
