<script setup>
import {ref, toValue, onMounted, nextTick} from 'vue'

const inputRef = ref(null)
const password = ref('')
onMounted(() => {
  nextTick(() => {
    inputRef.value.focus()
  })
})
const emit = defineEmits(['change'])
const passwordChange = () => {
  emit('change', toValue(password))
}
</script>
<template>
  <input ref="inputRef" type="password" @input="passwordChange" v-model="password" placeholder="Password" name="text"
         class="input">
</template>
<style scoped>
.input {
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.input:focus {
  border: 2px solid var(--input-focus);
}

</style>
