<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/tasks')
}
</script>

<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
    <span class="text-9xl font-extrabold text-slate-200 dark:text-slate-700 tracking-widest"
      >404</span
    >

    <h1 class="mt-4 text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
      Page Not Found
    </h1>

    <p class="mt-2 text-slate-500 dark:text-slate-400 max-w-md">
      Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
    </p>

    <div class="mt-8 flex flex-col sm:flex-row gap-4">
      <button
        @click="goBack"
        class="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition"
      >
        Go Back
      </button>
      <button
        @click="goHome"
        class="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm"
      >
        Go to Dashboard
      </button>
    </div>
  </div>
</template>
