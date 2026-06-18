<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import LeadForm from '../components/LeadForm.vue'
import RenovationScenario from '../components/RenovationScenario.vue'
import cosmeticApartmentImage from '../assets/service-cosmetic-3d-apartment.webp'
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
    title:
      route.params.slug === 'kosmeticheskij-remont'
        ? 'Простое обновление без сложной стройки'
        : 'Какой результат получает клиент',
    paragraphs:
      route.params.slug === 'kosmeticheskij-remont'
        ? [
            'Косметический ремонт — это самый быстрый и бюджетный способ освежить квартиру без перепланировки, переноса стен и сложных инженерных работ. Его выбирают, когда квартира в целом исправна, но отделка устарела: обои выцвели, краска потеряла вид, пол выглядит уставшим, а интерьер больше не ощущается чистым и современным.',
            'В такой формат обычно входят подготовка поверхностей, поклейка обоев или окраска стен, обновление потолков, замена напольного покрытия, плинтусов, розеток, выключателей, светильников и части сантехники. Основная задача — быстро привести жильё в аккуратное состояние и сделать его приятным для жизни, аренды или продажи.',
            'При этом косметический ремонт не предполагает серьёзную перепланировку, замену всех коммуникаций и глубокое восстановление оснований. Если после осмотра мы видим скрытые проблемы, заранее объясняем, какие работы лучше вынести в отдельный этап, чтобы клиент понимал реальный объём до старта.',
          ]
        : [
            page.value?.heroLead ||
              'Продумываем состав работ, бюджет и порядок этапов под состояние объекта.',
          ],
    image:
      route.params.slug === 'kosmeticheskij-remont'
        ? cosmeticApartmentImage
        : page.value?.aboutImages?.[0] ||
          'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Что входит в работу',
    paragraphs: [(page.value?.whatIncluded || []).join(', ') + '.'],
    image:
      page.value?.aboutImages?.[1] ||
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Как держим процесс под контролем',
    paragraphs: [
      'Перед стартом фиксируем смету, последовательность работ и точки согласования. Клиент видит, что происходит на объекте, без ежедневного ручного контроля.',
    ],
    image:
      page.value?.aboutImages?.[2] ||
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
])

const exampleGallery = computed(
  () =>
    page.value?.exampleGallery || [
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
    ],
)

const serviceAdvantages = computed(() => [
  ...(page.value?.value || []),
  'Смета до старта и понятные варианты по материалам',
  'Прораб ведёт объект и отвечает за ежедневную координацию',
  'Скрытые работы фиксируем до закрытия финишной отделкой',
])
const visibleReviews = computed(() => reviews.slice(0, 3))
const hiddenReviews = computed(() => reviews.slice(3))
</script>

<template>
  <div v-if="service && page">
    <section class="hero hero-service">
      <div class="container container-wide hero-grid">
        <div>
          <p class="eyebrow">Услуги Браво Проект</p>
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
            :src="
              page.heroImage ||
              'https://images.unsplash.com/photo-1630699144867-37acec97df5a?auto=format&fit=crop&w=1600&q=80'
            "
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
              <div class="service-about-copy">
                <p v-for="paragraph in item.paragraphs" :key="paragraph">{{ paragraph }}</p>
              </div>
              <img :src="item.image" :alt="item.title" />
            </div>
          </details>
        </div>
      </div>
    </section>

    <RenovationScenario :current-slug="route.params.slug" />

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
          <article v-for="review in visibleReviews" :key="review.author" class="card review-card">
            <p>«{{ review.text }}»</p>
            <strong>{{ review.author }}</strong>
          </article>
        </div>
        <details v-if="hiddenReviews.length" class="reviews-disclosure card">
          <summary>Показать ещё отзывы</summary>
          <div class="reviews-disclosure-grid">
            <article v-for="review in hiddenReviews" :key="review.author" class="review-card">
              <p>«{{ review.text }}»</p>
              <strong>{{ review.author }}</strong>
            </article>
          </div>
        </details>
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
