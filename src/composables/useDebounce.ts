import { ref, watch, onUnmounted, type Ref } from 'vue'

/**
 * Custom composable to create a debounced value from a reactive source or getter.
 * @param source Ref or getter function to watch
 * @param delay Milliseconds to delay updates (default: 300)
 */
export function useDebounce<T>(source: Ref<T> | (() => T), delay = 300): Ref<T> {
  const debouncedValue = ref(
    typeof source === 'function' ? (source as () => T)() : source.value
  ) as Ref<T>

  let timeoutId: ReturnType<typeof setTimeout> | null = null

  watch(source, (newValue) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue as T
    }, delay)
  })

  onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId)
  })

  return debouncedValue
}
