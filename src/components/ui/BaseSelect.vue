<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue: string | number
  options: (Option | string)[]
  label?: string
  placeholder?: string
  error?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  error: '',
  helperText: '',
  disabled: false,
  required: false,
  id: () => `select-${Math.random().toString(36).substring(2, 9)}`
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const selectClasses = computed(() => {
  const base =
    'w-full px-4 py-2.5 text-sm rounded-xl border appearance-none transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:cursor-not-allowed dark:bg-slate-800'

  if (props.error) {
    return `${base} border-rose-500 text-rose-900 focus:ring-rose-500 focus:border-rose-500 dark:text-rose-200`
  }

  return `${base} border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 dark:border-slate-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500`
})

const parsedOptions = computed<Option[]>(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'string') {
      return { label: opt, value: opt }
    }
    return opt
  })
})

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
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
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="selectClasses"
        @change="onChange"
      >
        <option v-if="placeholder" value="" disabled selected hidden>
          {{ placeholder }}
        </option>
        <option v-for="opt in parsedOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>

      <!-- Custom Dropdown Icon Indicator -->
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
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
