<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import LeadForm from '../components/LeadForm.vue'
import {
  clientProblems,
  company,
  estimateExamples,
  faqItems,
  portfolioCases,
  processSteps,
  repairTypes,
  reviews,
  trustMetrics,
} from '../data/siteData'

const quizSent = ref(false)
const quiz = reactive({
  objectType: 'novostroyka',
  area: 52,
  repairType: 'kapitalnyj-remont',
  needDemolition: 'yes',
  hasDesign: 'no',
  startWhen: '1-2-mesyaca',
  phone: '',
})

const baseRates = {
  novostroyka: 12500,
  vtorichka: 14000,
  dom: 15000,
  office: 13200,
  'kapitalnyj-remont': 16500,
  'kosmeticheskij-remont': 8500,
  'dizajnerskij-remont': 19500,
}

const estimateRange = computed(() => {
  const objectRate = baseRates[quiz.objectType] || 12000
  const repairRate = baseRates[quiz.repairType] || 13000
  let coefficient = 1

  if (quiz.needDemolition === 'yes') coefficient += 0.08
  if (quiz.hasDesign === 'no') coefficient += 0.04

  const middle = Math.round(((objectRate + repairRate) / 2) * quiz.area * coefficient)
  return {
    low: Math.round(middle * 0.92),
    high: Math.round(middle * 1.14),
  }
})

function formatRub(value) {
  return new Intl.NumberFormat('ru-RU').format(value)
}

function submitQuiz() {
  quizSent.value = true
}
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">Ремонт под ключ в Перми</p>
          <h1>Отделка квартир с понятной сметой, контролем качества и реальными сроками</h1>
          <p class="hero-lead">
            Берём на себя замер, смету, материалы, черновые и чистовые этапы. Вы получаете
            управляемый процесс и один ответственный канал связи.
          </p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#quiz">Рассчитать стоимость</a>
            <a class="btn btn-secondary" href="#lead-end">Вызвать замерщика бесплатно</a>
          </div>
          <div class="hero-facts">
            <p><strong>368+</strong> объектов сданы по договору</p>
            <p><strong>9</strong> объектов ведём прямо сейчас</p>
            <p><strong>Бесплатный замер</strong> в пределах Перми</p>
          </div>
        </div>

        <div class="hero-image-wrap">
          <img
            class="hero-image"
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
            alt="Интерьер квартиры после качественной отделки"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container stats-grid">
        <article v-for="metric in trustMetrics" :key="metric.value" class="card metric-card">
          <p class="metric-value">{{ metric.value }}</p>
          <p>{{ metric.label }}</p>
        </article>
      </div>
    </section>

    <section id="types" class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Типы ремонта</p>
          <h2>Выберите формат работ под вашу задачу</h2>
        </div>
        <div class="types-grid">
          <article v-for="type in repairTypes" :key="type.slug" class="card type-card">
            <p class="type-price">{{ type.priceFrom }}</p>
            <h3>{{ type.title }}</h3>
            <p>{{ type.short }}</p>
            <ul>
              <li v-for="item in type.scope" :key="item">{{ item }}</li>
            </ul>
            <RouterLink class="text-link" :to="`/uslugi/${type.slug}`">Смотреть страницу услуги</RouterLink>
          </article>
        </div>
      </div>
    </section>

    <section id="quiz" class="section section-accent">
      <div class="container quiz-grid">
        <div>
          <p class="eyebrow">Мини-квиз</p>
          <h2>Получите предварительную смету за 2 минуты</h2>
          <p>
            Заполните параметры объекта, и мы свяжемся с расчётом и рекомендациями, где можно
            сэкономить без потери качества.
          </p>
          <div class="price-preview">
            <p>Ориентир по вашему вводу:</p>
            <strong>{{ formatRub(estimateRange.low) }} — {{ formatRub(estimateRange.high) }} ₽</strong>
          </div>
        </div>

        <form class="card quiz-form" @submit.prevent="submitQuiz">
          <label>
            <span>Тип объекта</span>
            <select v-model="quiz.objectType">
              <option value="novostroyka">Новостройка</option>
              <option value="vtorichka">Вторичка</option>
              <option value="dom">Частный дом</option>
              <option value="office">Офис</option>
            </select>
          </label>

          <label>
            <span>Площадь (м²)</span>
            <input v-model.number="quiz.area" type="range" min="20" max="140" step="1" />
            <small>{{ quiz.area }} м²</small>
          </label>

          <label>
            <span>Тип ремонта</span>
            <select v-model="quiz.repairType">
              <option value="kosmeticheskij-remont">Косметический</option>
              <option value="kapitalnyj-remont">Капитальный</option>
              <option value="dizajnerskij-remont">Дизайнерский</option>
            </select>
          </label>

          <label>
            <span>Нужен демонтаж</span>
            <select v-model="quiz.needDemolition">
              <option value="yes">Да</option>
              <option value="no">Нет</option>
            </select>
          </label>

          <label>
            <span>Есть дизайн-проект</span>
            <select v-model="quiz.hasDesign">
              <option value="yes">Да</option>
              <option value="no">Нет</option>
            </select>
          </label>

          <label>
            <span>Когда хотите старт</span>
            <select v-model="quiz.startWhen">
              <option value="srazu">Сразу</option>
              <option value="1-2-mesyaca">Через 1–2 месяца</option>
              <option value="pozhe">Позже</option>
            </select>
          </label>

          <label>
            <span>Телефон для расчёта</span>
            <input v-model="quiz.phone" type="tel" placeholder="+7 (___) ___-__-__" required />
          </label>

          <button class="btn btn-primary" type="submit">Получить предварительную смету</button>
          <p v-if="quizSent" class="form-success">Принято. Мы подготовим расчёт и свяжемся с вами.</p>
        </form>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Боли и решения</p>
          <h2>Закрываем риски, из-за которых ремонт превращается в хаос</h2>
        </div>
        <div class="problems-grid">
          <article v-for="problem in clientProblems" :key="problem.title" class="card">
            <h3>{{ problem.title }}</h3>
            <p>{{ problem.answer }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Этапы</p>
          <h2>Как мы ведём объект от заявки до сдачи</h2>
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

    <section id="cases" class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Портфолио</p>
          <h2>Реальные кейсы: площадь, срок, стоимость и результат</h2>
        </div>
        <div class="cases-grid">
          <article v-for="item in portfolioCases" :key="item.id" class="card case-card">
            <img :src="item.image" :alt="item.title" />
            <div>
              <h3>{{ item.title }}</h3>
              <p class="case-meta">{{ item.area }} • {{ item.duration }}</p>
              <p><strong>Задача:</strong> {{ item.task }}</p>
              <p><strong>Сделано:</strong> {{ item.workDone }}</p>
              <p><strong>Стоимость работ:</strong> {{ item.workCost }}</p>
              <p><strong>Материалы:</strong> {{ item.materialsCost }}</p>
              <p><strong>Итог:</strong> {{ item.result }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="estimate" class="section section-soft">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Примеры смет</p>
          <h2>Понятная структура цены без “сюрпризов”</h2>
        </div>
        <div class="estimates-grid">
          <article v-for="example in estimateExamples" :key="example.object" class="card">
            <p class="type-price">{{ example.budget }}</p>
            <h3>{{ example.object }}</h3>
            <p>{{ example.includes }}</p>
          </article>
        </div>
        <div class="price-note card">
          <h3>Почему смета может измениться</h3>
          <p>
            Обычно корректировки происходят из-за скрытых дефектов, изменения материалов клиентом
            или дополнительных работ после вскрытия узлов. Любое изменение оформляем отдельно и
            согласуем до выполнения.
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container reviews-grid">
        <article v-for="review in reviews" :key="review.author" class="card review-card">
          <p>«{{ review.text }}»</p>
          <strong>{{ review.author }}</strong>
        </article>
      </div>
    </section>

    <section id="faq" class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">FAQ</p>
          <h2>Частые вопросы перед стартом ремонта</h2>
        </div>
        <div class="faq-list">
          <details v-for="item in faqItems" :key="item.question" class="card faq-item">
            <summary>{{ item.question }}</summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <section id="lead-end" class="section">
      <div class="container lead-grid">
        <LeadForm
          title="Получить консультацию и предварительную смету"
          subtitle="Оставьте телефон — разберём задачу и предложим рабочий сценарий ремонта под ваш бюджет."
          button-label="Обсудить проект"
        />

        <aside class="contact-card card">
          <h3>Контакты</h3>
          <p><strong>{{ company.phone }}</strong></p>
          <p>{{ company.address }}</p>
          <p>{{ company.workHours }}</p>
          <p>
            Работаем по договору, фиксируем этапы и предоставляем гарантию на выполненные работы.
          </p>
        </aside>
      </div>
    </section>
  </div>
</template>
