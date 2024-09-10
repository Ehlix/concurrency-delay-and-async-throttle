<script setup lang="ts">
import { ref, watch } from 'vue';
import { useConcurrencyDelay } from './utils/useConcurrencyDelay';
import { useAsyncThrottle } from './utils/useAsyncThrottle';

const inputModel = defineModel<string>();
const delayValue = ref<string>('');
const throttleValue = ref<string>('');

const delayFn = useConcurrencyDelay();
const throttleFn = useAsyncThrottle();

const updateDelay = async (text: string) => {
  try {
    await delayFn(500);
    delayValue.value = text;
  } catch (error) {}
};

const updateThrottle = async (text: string) => {
  try {
    await throttleFn(500);
    throttleValue.value = text;
  } catch (error) {}
};

watch(inputModel, (value) => {
  if (value) {
    updateDelay(value);
    updateThrottle(value);
  }
});
</script>

<template>
  <div class="delay">
    <h2>Raw:</h2>
    <div>{{ inputModel }}</div>
    <h2>Delay Value:</h2>
    <div>{{ delayValue }}</div>
    <h2>Throttle Value:</h2>
    <div>{{ throttleValue }}</div>
    <input v-model="inputModel" />
  </div>
</template>

<style scoped>
.delay {
  text-align: left;
  min-width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  h2 {
    color: red;
  }
}
</style>
