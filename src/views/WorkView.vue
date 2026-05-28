<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import LeadForm from '../components/LeadForm.vue'
import { processSteps, workPages } from '../data/siteData'

const route = useRoute()
const work = computed(() => workPages[route.params.slug])
</script>

<template>
  <div v-if="work">
    <section class="hero hero-service">
      <div class="container container-wide hero-grid">
        <div>
          <p class="eyebrow">Виды работ BRAVO REMONT</p>
          <h1>{{ work.title }}</h1>
          <p class="hero-lead">{{ work.lead }}</p>
          <p class="type-price">{{ work.priceFrom }}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#work-lead">Рассчитать работу</a>
            <RouterLink class="btn btn-secondary" to="/">Вернуться на главную</RouterLink>
          </div>
        </div>
        <div class="hero-image-wrap">
          <img class="hero-image" :src="work.image" :alt="work.title" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container container-wide service-columns">
        <article class="card">
          <h2>Что входит</h2>
          <ul>
            <li v-for="item in work.includes" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article class="card">
          <h2>Что получаете</h2>
          <ul>
            <li v-for="item in work.result" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">Процесс</p>
          <h2>Как организуем работу на объекте</h2>
        </div>
        <div class="steps-grid">
          <article v-for="step in processSteps.slice(0, 3)" :key="step.title" class="card step-card">
            <p class="step-period">{{ step.period }}</p>
            <h3>{{ step.title }}</h3>
            <p>{{ step.details }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="work-lead" class="section">
      <div class="container lead-grid">
        <LeadForm
          :title="`Рассчитать: ${work.title}`"
          subtitle="Оставьте телефон — уточним объём, состояние объекта и подготовим ориентир по срокам и бюджету."
          button-label="Получить расчёт"
          tone="dark"
        />
      </div>
    </section>
  </div>

  <section v-else class="section">
    <div class="container card">
      <h1>Страница работы не найдена</h1>
      <RouterLink class="btn btn-primary" to="/">Вернуться на главную</RouterLink>
    </div>
  </section>
</template>
