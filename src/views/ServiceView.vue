<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import LeadForm from '../components/LeadForm.vue'
import { repairTypes, reviews, servicePages } from '../data/siteData'

const route = useRoute()

const page = computed(() => servicePages[route.params.slug])
const service = computed(
  () =>
    repairTypes.find((item) => item.slug === route.params.slug) || {
      title: page.value?.heroTitle || 'Услуга',
      priceFrom: 'Итоговая стоимость после замера',
    },
)
const serviceLabel = computed(() => service.value?.title?.toLowerCase() || 'ремонт')
const serviceAboutTitle = computed(() => `Что такое ${serviceLabel.value}`)
const serviceAboutItems = computed(() => [
  {
    title: 'Какой результат получает клиент',
    text:
      page.value?.heroLead ||
      'Продумываем состав работ, бюджет и порядок этапов под состояние объекта.',
    image:
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Что входит в работу',
    text: (page.value?.whatIncluded || []).join(', ') + '.',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Как держим процесс под контролем',
    text: 'Перед стартом фиксируем смету, последовательность работ и точки согласования. Клиент видит, что происходит на объекте, без ежедневного ручного контроля.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
])

const exampleGallery = [
  {
    title: 'Спокойная гостиная',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Светлая кухня',
    image:
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Компактная спальня',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80',
  },
]

const serviceAdvantages = computed(() => [
  ...(page.value?.value || []),
  'Смета до старта и понятные варианты по материалам',
  'Прораб ведёт объект и отвечает за ежедневную координацию',
  'Скрытые работы фиксируем до закрытия финишной отделкой',
])
</script>

<template>
  <div v-if="service && page">
    <section class="hero hero-service">
      <div class="container container-wide hero-grid">
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

    <section class="section service-about-section">
      <div class="container container-wide">
        <div class="section-head service-about-head">
          <p class="eyebrow">О формате ремонта</p>
          <h2>{{ serviceAboutTitle }}</h2>
        </div>

        <div class="service-about-grid">
          <details
            v-for="(item, index) in serviceAboutItems"
            :key="item.title"
            class="card service-about-item"
            :open="index === 0"
          >
            <summary>{{ item.title }}</summary>
            <div class="service-about-body">
              <p>{{ item.text }}</p>
              <img :src="item.image" :alt="item.title" />
            </div>
          </details>
        </div>
      </div>
    </section>

    <section class="section section-soft service-examples-section">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">Примеры</p>
          <h2>Визуальные ориентиры для будущего ремонта</h2>
        </div>
        <div class="service-examples-grid">
          <article v-for="item in exampleGallery" :key="item.title" class="service-example-card">
            <img :src="item.image" :alt="item.title" />
            <h3>{{ item.title }}</h3>
          </article>
        </div>
      </div>
    </section>

    <section class="section service-reviews-section">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">Отзывы</p>
          <h2>Что клиенты отмечают после сдачи объекта</h2>
        </div>
        <div class="service-reviews-grid">
          <article v-for="review in reviews" :key="review.author" class="card review-card">
            <p>«{{ review.text }}»</p>
            <strong>{{ review.author }}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-dark service-advantages-section">
      <div class="container container-wide">
        <div class="service-advantages-layout">
          <div>
            <p class="eyebrow">Почему выбирают нас</p>
            <h2>Берём ответственность за ремонт, а не только за отдельные работы</h2>
          </div>

          <div class="service-advantages-list">
            <article
              v-for="(item, index) in serviceAdvantages"
              :key="item"
              class="service-advantage-item"
            >
              <span>0{{ index + 1 }}</span>
              <p>{{ item }}</p>
            </article>
          </div>
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
