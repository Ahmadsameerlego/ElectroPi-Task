<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

const buttonClasses = computed(() => {
  const base =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base'
  }

  const variantStyles = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm shadow-indigo-100 dark:shadow-none border border-transparent',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100 focus:ring-slate-500 border border-transparent',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-sm border border-transparent',
    outline:
      'bg-transparent border border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 focus:ring-slate-500',
    ghost:
      'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300 focus:ring-slate-500'
  }

  return [
    base,
    sizeStyles[props.size],
    variantStyles[props.variant],
    props.fullWidth ? 'w-full' : ''
  ].join(' ')
})
</script>

<template>
  <button :type="type" :disabled="disabled || loading" :class="buttonClasses" @click="handleClick">
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <span v-if="$slots.prefix && !loading" class="mr-2 inline-flex">
      <slot name="prefix" />
    </span>

    <slot />

    <span v-if="$slots.suffix && !loading" class="ml-2 inline-flex">
      <slot name="suffix" />
    </span>
  </button>
</template>
