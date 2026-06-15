<script setup>
import { RouterLink } from 'vue-router'
import LeadForm from '../components/LeadForm.vue'
import { aboutPage, reviews, trustMetrics } from '../data/siteData'
</script>

<template>
  <div>
    <section class="hero about-hero">
      <div class="container container-wide about-hero-layout">
        <div class="about-hero-main">
          <p class="eyebrow">BRAVO REMONT</p>
          <h1>{{ aboutPage.heroTitle }}</h1>
          <p class="hero-lead">{{ aboutPage.heroLead }}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#about-lead">Обсудить ремонт</a>
            <RouterLink class="btn btn-secondary" to="/#cases">Посмотреть кейсы</RouterLink>
          </div>
        </div>

        <div class="about-hero-panel">
          <p>Ремонт без хаоса</p>
          <strong
            >Смета, этапы, материалы и контроль прораба собраны в один управляемый процесс.</strong
          >
          <div class="about-hero-points">
            <span>Поэтапная оплата</span>
            <span>Контроль скрытых работ</span>
            <span>Материалы по ведомости</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container container-wide stats-grid">
        <article v-for="metric in trustMetrics" :key="metric.value" class="card metric-card">
          <p class="metric-value">{{ metric.value }}</p>
          <p>{{ metric.label }}</p>
        </article>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container container-wide about-intro-grid">
        <div>
          <p class="eyebrow">Как работаем</p>
          <h2>Ремонт должен быть управляемым, а не бесконечным стрессом</h2>
        </div>
        <div class="about-intro-copy">
          <p>
            Квартирный ремонт обычно забирает много времени, сил и денег. Поэтому мы строим процесс
            вокруг понятной сметы, заранее согласованных сроков и контроля со стороны прораба.
          </p>
          <p>
            Материалы, этапы оплаты, порядок работ и технические решения фиксируются до старта. Так
            клиент понимает, за что платит, а команда работает по единому плану.
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">Принципы</p>
          <h2>Что взяли с собой из опыта старого сайта и усилили в новой подаче</h2>
        </div>

        <div class="about-principles-grid">
          <article v-for="item in aboutPage.principles" :key="item.title" class="card">
            <span></span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container container-wide about-process-grid">
        <div>
          <p class="eyebrow">Порядок</p>
          <h2>Прораб держит план, мастера отвечают за технологию</h2>
          <p>
            Внутри ремонта важны не только красивые материалы, но и последовательность: что
            проверяем до закрытия, когда согласуем изменения и как сдаём каждый этап.
          </p>
        </div>

        <div class="work-process-list">
          <article v-for="(step, index) in aboutPage.process" :key="step" class="work-process-item">
            <span>0{{ index + 1 }}</span>
            <p>{{ step }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section about-reviews-section">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">Отзывы</p>
          <h2>Что клиенты отмечали на донорском сайте</h2>
        </div>

        <div class="about-reviews-grid">
          <article v-for="review in reviews" :key="review.author" class="card review-card">
            <p>«{{ review.text }}»</p>
            <strong>{{ review.author }}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container container-wide about-partner-card card">
        <div>
          <p class="eyebrow">Партнёры</p>
          <h2>Проверенные участники процесса</h2>
        </div>
        <div>
          <p v-for="partner in aboutPage.partners" :key="partner">{{ partner }}</p>
        </div>
      </div>
    </section>

    <section id="about-lead" class="section">
      <div class="container lead-grid">
        <LeadForm
          title="Обсудить ремонт с BRAVO REMONT"
          subtitle="Оставьте телефон — уточним задачу, состояние квартиры и предложим понятный следующий шаг."
          button-label="Получить консультацию"
          tone="dark"
        />
      </div>
    </section>
  </div>
</template>
