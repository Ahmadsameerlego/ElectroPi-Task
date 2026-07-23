<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { useTasks } from '@/composables/useTasks'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import type { Task, TaskStatus } from '@/types'

import TaskSearch from '@/components/task/TaskSearch.vue'
import TaskFilters from '@/components/task/TaskFilters.vue'
import TaskList from '@/components/task/TaskList.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

// Lazy loaded component for optimized initial rendering
const TaskForm = defineAsyncComponent(() => import('@/components/task/TaskForm.vue'))

const { loading, fetchTasks, createTask, updateTask, deleteTask } = useTasks()
const toast = useToast()

// Programmatic confirmation composable variables
const {
  isOpen: isConfirmOpen,
  title: confirmTitle,
  message: confirmMessage,
  confirmText,
  cancelText,
  variant: confirmVariant,
  confirm,
  accept,
  cancel
} = useConfirm()

// Form modal visibility controller
const showFormModal = ref<boolean>(false)
const activeTask = ref<Task | null>(null)

// Initial mount fetch
onMounted(() => {
  fetchTasks().catch(() => {
    toast.error('Failed to load initial tasks. Try clicking Retry.')
  })
})

const openCreateModal = () => {
  activeTask.value = null
  showFormModal.value = true
}

const openEditModal = (task: Task) => {
  activeTask.value = task
  showFormModal.value = true
}

const openDeleteModal = async (id: string) => {
  const confirmed = await confirm({
    title: 'Delete Task',
    message:
      'Are you sure you want to delete this task? This action is permanent and cannot be undone.',
    confirmText: 'Confirm Delete',
    cancelText: 'Cancel',
    variant: 'danger'
  })

  if (confirmed) {
    try {
      await deleteTask(id)
      toast.success('Task deleted successfully!')
    } catch (err) {
      const errorObject = err as { message?: string }
      toast.error(errorObject.message || 'Failed to delete task. Please try again.')
    }
  }
}

const handleFormSubmit = async (formData: {
  title: string
  description: string
  status: TaskStatus
  dueDate: string
}) => {
  try {
    if (activeTask.value) {
      await updateTask(activeTask.value.id, formData)
      toast.success('Task updated successfully!')
    } else {
      await createTask(formData)
      toast.success('Task created successfully!')
    }
    showFormModal.value = false
  } catch (err) {
    const errorObject = err as { message?: string }
    toast.error(errorObject.message || 'Operation failed. Please try again.')
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header Block -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
          Tasks Dashboard
        </h1>
        <p class="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Create, schedule, filter, and manage your pipeline operations.
        </p>
      </div>

      <div>
        <BaseButton @click="openCreateModal" aria-haspopup="dialog">
          <template #prefix>
            <svg
              class="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </template>
          Create Task
        </BaseButton>
      </div>
    </div>

    <!-- Filters & Search Toolbar -->
    <div
      class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm"
    >
      <div class="flex-1 max-w-md">
        <TaskSearch />
      </div>
      <div class="shrink-0">
        <TaskFilters />
      </div>
    </div>

    <!-- Main List Container -->
    <div
      class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-6 rounded-2xl shadow-sm"
    >
      <TaskList @edit="openEditModal" @delete="openDeleteModal" @create-click="openCreateModal" />
    </div>

    <!-- Form Modal (Create/Edit wrapper) -->
    <BaseModal
      :show="showFormModal"
      :title="activeTask ? 'Modify Task Details' : 'Initialize New Task'"
      @close="showFormModal = false"
    >
      <TaskForm
        :task="activeTask"
        :loading="loading"
        @submit="handleFormSubmit"
        @cancel="showFormModal = false"
      />
    </BaseModal>

    <!-- Global Accessible Programmatic Confirm Modal -->
    <BaseModal :show="isConfirmOpen" :title="confirmTitle" size="sm" @close="cancel">
      <div class="space-y-4">
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-normal">
          {{ confirmMessage }}
        </p>

        <div
          class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/50"
        >
          <BaseButton variant="outline" :disabled="loading" @click="cancel">
            {{ cancelText }}
          </BaseButton>
          <BaseButton
            :variant="confirmVariant === 'danger' ? 'danger' : 'primary'"
            :loading="loading"
            :disabled="loading"
            @click="accept"
          >
            {{ confirmText }}
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
