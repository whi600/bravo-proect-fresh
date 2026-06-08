<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import LeadForm from '../components/LeadForm.vue'
import { workPages } from '../data/siteData'

const route = useRoute()
const work = computed(() => workPages[route.params.slug])
const gallery = computed(() =>
  work.value?.gallery?.length ? work.value.gallery : [work.value?.image].filter(Boolean),
)
const priceRows = computed(() => work.value?.priceRows || [])
const description = computed(() =>
  work.value?.description?.length
    ? work.value.description
    : [
        work.value?.lead,
        'Работаем по понятной технологии: сначала оцениваем основание, затем согласуем состав работ и только после этого запускаем этап на объекте.',
      ].filter(Boolean),
)
const workStages = computed(
  () =>
    work.value?.stages || [
      'Осматриваем основание, фиксируем объем и технические ограничения.',
      'Готовим поверхность, защищаем соседние зоны и завозим материалы.',
      'Выполняем работу по технологии и контролируем геометрию, примыкания и чистоту.',
      'Сдаем результат, убираем рабочую зону и объясняем, когда можно переходить к следующему этапу.',
    ],
)
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

    <section class="section work-intro-section">
      <div class="container container-wide work-intro-grid">
        <div>
          <p class="eyebrow">О работе</p>
          <h2>{{ work.aboutTitle || work.title }}</h2>
          <p v-for="paragraph in description" :key="paragraph">{{ paragraph }}</p>
        </div>

        <div class="work-gallery">
          <a
            v-for="image in gallery"
            :key="image"
            :href="image"
            target="_blank"
            rel="noreferrer"
            class="work-gallery-item"
          >
            <img :src="image" :alt="work.title" />
          </a>
        </div>
      </div>
    </section>

    <section v-if="priceRows.length" class="section section-soft work-price-section">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">Прайс</p>
          <h2>{{ work.priceTitle || `Стоимость: ${work.title.toLowerCase()}` }}</h2>
          <p>
            Цены перенесены из старого сайта как ориентир по работам. Итог зависит от основания,
            объема, материала и доступа к зоне ремонта.
          </p>
        </div>

        <div class="work-price-table">
          <div class="work-price-row work-price-row-head">
            <span>Наименование работ</span>
            <span>Ед.</span>
            <span>Цена</span>
          </div>
          <div v-for="row in priceRows" :key="`${row.name}-${row.price}`" class="work-price-row">
            <span>{{ row.name }}</span>
            <span>{{ row.unit }}</span>
            <strong>{{ row.price }}</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container container-wide">
        <div class="work-scope-grid">
          <article class="card">
            <p class="eyebrow">Состав</p>
            <h2>Что входит в работу</h2>
            <ul>
              <li v-for="item in work.includes" :key="item">{{ item }}</li>
            </ul>
          </article>
          <article class="card">
            <p class="eyebrow">Результат</p>
            <h2>Что получает клиент</h2>
            <ul>
              <li v-for="item in work.result" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container container-wide">
        <div class="work-process-layout">
          <div>
            <p class="eyebrow">Порядок работ</p>
            <h2>Как выполняем на объекте</h2>
          </div>
          <div class="work-process-list">
            <article v-for="(step, index) in workStages" :key="step" class="work-process-item">
              <span>0{{ index + 1 }}</span>
              <p>{{ step }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section work-advantages-section">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">Почему BRAVO REMONT</p>
          <h2>Делаем отдельные работы как часть нормального ремонта</h2>
        </div>
        <div class="service-fit-grid">
          <article v-for="item in work.advantages" :key="item" class="card service-fit-card">
            <span></span>
            <p>{{ item }}</p>
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
