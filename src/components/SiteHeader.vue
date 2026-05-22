<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { company } from '../data/siteData'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="logo" to="/" aria-label="BRAVO REMONT">
        <span class="logo-mark">BR</span>
        <span>
          <strong>{{ company.name }}</strong>
          <small>Отделка под ключ • {{ company.city }}</small>
        </span>
      </RouterLink>

      <nav class="main-nav">
        <a :href="isHome ? '#types' : '/#types'">Услуги</a>
        <a :href="isHome ? '#cases' : '/#cases'">Кейсы</a>
        <a :href="isHome ? '#estimate' : '/#estimate'">Смета</a>
        <a :href="isHome ? '#faq' : '/#faq'">FAQ</a>
      </nav>

      <div class="header-actions">
        <a class="header-phone" href="tel:+73422479957">{{ company.phone }}</a>
        <a class="btn btn-primary" :href="isHome ? '#quiz' : '/#quiz'">Рассчитать стоимость</a>
      </div>
    </div>
  </header>
</template>
