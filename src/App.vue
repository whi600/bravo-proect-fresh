<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
    <a class="mobile-sticky-cta" href="tel:+73422479957">Позвонить и обсудить ремонт</a>
  </div>
</template>
