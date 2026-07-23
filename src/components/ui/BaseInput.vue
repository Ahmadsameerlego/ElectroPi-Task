<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'date' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  error?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  error: '',
  helperText: '',
  disabled: false,
  required: false,
  id: () => `input-${Math.random().toString(36).substring(2, 9)}`
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()

const inputClasses = computed(() => {
  const base =
    'w-full px-4 py-2.5 text-sm rounded-xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:cursor-not-allowed dark:bg-slate-800'

  if (props.error) {
    return `${base} border-rose-500 text-rose-900 placeholder-rose-300 focus:ring-rose-500 focus:border-rose-500 dark:text-rose-200`
  }

  return `${base} border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 dark:border-slate-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500`
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="space-y-1.5 w-full">
    <label
      v-if="label"
      :for="id"
      class="block text-xs font-semibold text-slate-700 dark:text-slate-300"
    >
      {{ label }}
      <span v-if="required" class="text-rose-500">*</span>
    </label>

    <div class="relative">
      <span
        v-if="$slots.prefix"
        class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"
      >
        <slot name="prefix" />
      </span>

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[inputClasses, $slots.prefix ? 'pl-10' : '', $slots.suffix ? 'pr-10' : '']"
        @input="onInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />

      <span
        v-if="$slots.suffix"
        class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"
      >
        <slot name="suffix" />
      </span>
    </div>

    <p v-if="error" class="text-xs font-medium text-rose-600 dark:text-rose-400">
      {{ error }}
    </p>
    <p v-else-if="helperText" class="text-xs text-slate-500 dark:text-slate-400">
      {{ helperText }}
    </p>
  </div>
</template>
