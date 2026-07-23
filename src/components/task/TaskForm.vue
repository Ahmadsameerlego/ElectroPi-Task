<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Task, TaskStatus } from '@/types'
import { useValidation } from '@/composables/useValidation'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  task?: Task | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  task: null,
  loading: false
})

const emit = defineEmits<{
  (
    e: 'submit',
    data: { title: string; description: string; status: TaskStatus; dueDate: string }
  ): void
  (e: 'cancel'): void
}>()

const title = ref('')
const description = ref('')
const status = ref<TaskStatus>('pending')
const dueDate = ref('')

const errors = ref({
  title: '',
  dueDate: ''
})

const { validateTitle, validateDueDate } = useValidation()

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' }
]

const isEditMode = computed(() => !!props.task)

const initForm = () => {
  if (props.task) {
    title.value = props.task.title
    description.value = props.task.description
    status.value = props.task.status
    dueDate.value = props.task.dueDate
  } else {
    title.value = ''
    description.value = ''
    status.value = 'pending'
    dueDate.value = ''
  }
  errors.value = { title: '', dueDate: '' }
}

watch(() => props.task, initForm, { immediate: true })

const handleBlurTitle = () => {
  errors.value.title = validateTitle(title.value)
}

const handleBlurDueDate = () => {
  errors.value.dueDate = validateDueDate(dueDate.value)
}

const handleSubmit = (event: Event) => {
  event.preventDefault()

  errors.value.title = validateTitle(title.value)
  errors.value.dueDate = validateDueDate(dueDate.value)

  if (errors.value.title || errors.value.dueDate) {
    return
  }

  emit('submit', {
    title: title.value,
    description: description.value,
    status: status.value,
    dueDate: dueDate.value
  })
}
</script>

<template>
  <form @submit="handleSubmit" class="space-y-5">
    <BaseInput
      v-model="title"
      label="Task Title"
      placeholder="Enter task title..."
      required
      :error="errors.title"
      :disabled="loading"
      @blur="handleBlurTitle"
    />

    <BaseTextarea
      v-model="description"
      label="Description (Optional)"
      placeholder="Enter details about this task..."
      :disabled="loading"
      :rows="3"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <BaseSelect
        v-model="status"
        :options="statusOptions"
        label="Status"
        placeholder="Select status"
        required
        :disabled="loading"
      />

      <BaseInput
        v-model="dueDate"
        type="date"
        label="Due Date"
        required
        :error="errors.dueDate"
        :disabled="loading"
        @blur="handleBlurDueDate"
      />
    </div>

    <!-- Actions Footer -->
    <div
      class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/50"
    >
      <BaseButton type="button" variant="outline" :disabled="loading" @click="emit('cancel')">
        Cancel
      </BaseButton>
      <BaseButton type="submit" :loading="loading" :disabled="loading">
        {{ isEditMode ? 'Save Changes' : 'Create Task' }}
      </BaseButton>
    </div>
  </form>
</template>
