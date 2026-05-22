<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import LeadForm from '../components/LeadForm.vue'
import { estimateExamples, portfolioCases, processSteps, repairTypes, servicePages } from '../data/siteData'

const route = useRoute()

const service = computed(() => repairTypes.find((item) => item.slug === route.params.slug))
const page = computed(() => servicePages[route.params.slug])
const relatedCase = computed(() =>
  portfolioCases.filter((item) => item.relatedService === route.params.slug).slice(0, 2),
)
</script>

<template>
  <div v-if="service && page">
    <section class="hero hero-service">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">Услуги BRAVO REMONT</p>
          <h1>{{ page.heroTitle }}</h1>
          <p class="hero-lead">{{ page.heroLead }}</p>
          <p class="type-price">{{ service.priceFrom }}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#service-lead">Получить смету</a>
            <RouterLink class="btn btn-secondary" to="/">Вернуться на главную</RouterLink>
          </div>
        </div>
        <div class="hero-image-wrap">
          <img
            class="hero-image"
            src="https://images.unsplash.com/photo-1630699144867-37acec97df5a?auto=format&fit=crop&w=1600&q=80"
            alt="Пример реализованной отделки"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container service-columns">
        <article class="card">
          <h2>Что входит в услугу</h2>
          <ul>
            <li v-for="item in page.whatIncluded" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article class="card">
          <h2>Почему нам доверяют</h2>
          <ul>
            <li v-for="item in page.value" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Этапы работ</p>
          <h2>Структура процесса по этой услуге</h2>
        </div>
        <div class="steps-grid">
          <article v-for="step in processSteps" :key="step.title" class="card step-card">
            <p class="step-period">{{ step.period }}</p>
            <h3>{{ step.title }}</h3>
            <p>{{ step.details }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Кейсы по услуге</p>
          <h2>Объекты с прозрачными цифрами</h2>
        </div>
        <div class="cases-grid">
          <article v-for="item in relatedCase" :key="item.id" class="card case-card">
            <img :src="item.image" :alt="item.title" />
            <div>
              <h3>{{ item.title }}</h3>
              <p class="case-meta">{{ item.area }} • {{ item.duration }}</p>
              <p><strong>Стоимость работ:</strong> {{ item.workCost }}</p>
              <p><strong>Материалы:</strong> {{ item.materialsCost }}</p>
              <p>{{ item.result }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Примеры смет</p>
          <h2>Ориентиры по бюджету</h2>
        </div>
        <div class="estimates-grid">
          <article v-for="example in estimateExamples" :key="example.object" class="card">
            <p class="type-price">{{ example.budget }}</p>
            <h3>{{ example.object }}</h3>
            <p>{{ example.includes }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="service-lead" class="section">
      <div class="container lead-grid">
        <LeadForm
          :title="`Обсудить услугу: ${service.title}`"
          subtitle="Оставьте телефон, мы подготовим предварительный расчёт и предложим понятный план работ."
          button-label="Получить консультацию"
          tone="dark"
        />
      </div>
    </section>
  </div>

  <section v-else class="section">
    <div class="container card">
      <h1>Страница услуги не найдена</h1>
      <RouterLink class="btn btn-primary" to="/">Вернуться на главную</RouterLink>
    </div>
  </section>
</template>
