<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { company } from './data/siteData'
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
    <a class="mobile-sticky-cta" :href="company.phones[0].href">Позвонить и обсудить ремонт</a>
  </div>
</template>
