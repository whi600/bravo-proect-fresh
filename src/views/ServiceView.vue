<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import LeadForm from '../components/LeadForm.vue'
import { estimateExamples, portfolioCases, processSteps, repairTypes, servicePages } from '../data/siteData'

const route = useRoute()
const activeProcessStep = ref(0)

const page = computed(() => servicePages[route.params.slug])
const service = computed(
  () =>
    repairTypes.find((item) => item.slug === route.params.slug) || {
      title: page.value?.heroTitle || 'Услуга',
      priceFrom: 'Итоговая стоимость после замера',
    },
)
const relatedCase = computed(() =>
  portfolioCases.filter((item) => item.relatedService === route.params.slug).slice(0, 2),
)
const currentProcessStep = computed(() => processSteps[activeProcessStep.value] || processSteps[0])
const serviceFit = computed(() => [
  'Нужно понять реальный бюджет до старта и не потеряться в вариантах материалов.',
  'Важно отдать ремонт под контроль прораба и получать понятные отчёты по этапам.',
  'Нужен аккуратный результат без хаоса, переделок и ежедневного участия в стройке.',
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

    <section class="section service-flow-section">
      <div class="container container-wide">
        <div class="section-head service-flow-head">
          <p class="eyebrow">Подход к услуге</p>
          <h2>Собираем ремонт как понятный маршрут, а не набор разрозненных работ</h2>
        </div>
        <div class="service-fit-grid">
          <article v-for="(item, index) in serviceFit" :key="item" class="card service-fit-card">
            <span>0{{ index + 1 }}</span>
            <p>{{ item }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section service-scope-section">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">Состав работ</p>
          <h2>Что входит и за счёт чего держим качество</h2>
        </div>
        <div class="service-scope-grid">
          <article class="card service-scope-card">
            <h3>Что входит в услугу</h3>
            <ul>
              <li v-for="item in page.whatIncluded" :key="item">{{ item }}</li>
            </ul>
          </article>
          <article class="card service-scope-card service-scope-card-accent">
            <h3>Почему нам доверяют</h3>
            <ul>
              <li v-for="item in page.value" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="section service-process-section">
      <div class="container container-wide">
        <div class="section-head process-head">
          <p class="eyebrow">Этапы</p>
          <h2>Как ведём объект по этой услуге</h2>
          <p>
            На каждом этапе фиксируем результат, срок и следующую точку контроля. Клиент видит, что
            происходит на объекте, и принимает решения без лишней суеты.
          </p>
        </div>

        <div class="process-timeline process-timeline-desktop">
          <div class="process-row process-row-top">
            <div v-for="(step, index) in processSteps" :key="step.title" class="process-slot">
              <button
                v-if="index % 2 === 0"
                class="process-card"
                :class="{ 'is-active': activeProcessStep === index }"
                type="button"
                @click="activeProcessStep = index"
              >
                <span>{{ step.period }}</span>
                <strong>{{ step.title }}</strong>
              </button>
            </div>
          </div>

          <div class="process-line">
            <span class="process-line-fill"></span>
            <button
              v-for="(step, index) in processSteps"
              :key="step.title"
              class="process-dot"
              :class="{ 'is-active': activeProcessStep === index }"
              type="button"
              :aria-label="`Открыть этап ${index + 1}: ${step.title}`"
              @click="activeProcessStep = index"
            >
              {{ index + 1 }}
            </button>
          </div>

          <div class="process-row process-row-bottom">
            <div v-for="(step, index) in processSteps" :key="step.title" class="process-slot">
              <button
                v-if="index % 2 !== 0"
                class="process-card"
                :class="{ 'is-active': activeProcessStep === index }"
                type="button"
                @click="activeProcessStep = index"
              >
                <span>{{ step.period }}</span>
                <strong>{{ step.title }}</strong>
              </button>
            </div>
          </div>
        </div>

        <div class="process-timeline-mobile">
          <button
            v-for="(step, index) in processSteps"
            :key="step.title"
            class="process-mobile-step"
            :class="{ 'is-active': activeProcessStep === index }"
            type="button"
            @click="activeProcessStep = index"
          >
            <span class="process-mobile-dot">{{ index + 1 }}</span>
            <span class="process-mobile-card">
              <small>{{ step.period }}</small>
              <strong>{{ step.title }}</strong>
            </span>
          </button>
        </div>

        <div class="process-detail">
          <div class="process-detail-number">0{{ activeProcessStep + 1 }}</div>
          <div>
            <p class="step-period">{{ currentProcessStep.period }}</p>
            <h3>{{ currentProcessStep.title }}</h3>
            <p>{{ currentProcessStep.details }}</p>
          </div>
          <div class="process-pills" aria-label="Выбор этапа">
            <button
              v-for="(step, index) in processSteps"
              :key="step.title"
              type="button"
              :class="{ 'is-active': activeProcessStep === index }"
              :aria-label="`Показать этап ${index + 1}`"
              @click="activeProcessStep = index"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <section class="section service-cases-section">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">Кейсы по услуге</p>
          <h2>Объекты с прозрачными цифрами</h2>
        </div>
        <div v-if="relatedCase.length" class="cases-grid">
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
        <div v-else class="card service-empty-case">
          <h3>Покажем близкие объекты на консультации</h3>
          <p>
            Подберём примеры по похожей площади, состоянию квартиры и бюджету, чтобы вы понимали
            реальный объём работ до старта.
          </p>
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container container-wide">
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
