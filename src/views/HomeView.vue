<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import LeadForm from '../components/LeadForm.vue'
import repairFormatCapital from '../assets/repair-format-capital.png'
import repairFormatCosmetic from '../assets/repair-format-cosmetic.png'
import repairFormatExclusive from '../assets/repair-format-exclusive.png'
import { submitLead } from '../utils/leadSubmit'
import {
  company,
  faqItems,
  portfolioCases,
  processSteps,
  reviews,
  trustMetrics,
} from '../data/siteData'

const quizSent = ref(false)
const quizSending = ref(false)
const quizError = ref(false)
const activeProcessStep = ref(0)
const selectedCase = ref(null)
const selectedCaseImageIndex = ref(0)
const calc = reactive({
  area: 52,
  rooms: 2,
  ceiling: true,
  ceilingOption: 0,
  wall: true,
  wallOption: 0,
  floor: true,
  floorOption: 0,
  newElectric: true,
  replaceElectric: false,
  demolition: true,
  bathroom: true,
  phone: '',
})

const calcOptions = {
  ceiling: [
    { label: 'натяжной', price: 550 },
    { label: 'подвесной из гипсокартона', price: 1750 },
    { label: 'под покраску', price: 1200 },
  ],
  wall: [
    { label: 'капитальный ремонт под обои', price: 840 },
    { label: 'косметический ремонт под обои', price: 570 },
    { label: 'под покраску', price: 1050 },
  ],
  floor: [
    { label: 'капитальный ремонт, ламинат', price: 1090 },
    { label: 'косметический ремонт, линолеум', price: 470 },
    { label: 'устройство деревянного, ламинат', price: 700 },
  ],
}

const calcFixedOptions = [
  { key: 'newElectric', label: 'Полная замена электропроводки', price: 2293, mode: 'area' },
  { key: 'replaceElectric', label: 'Замена выключателей, розеток', price: 808, mode: 'area' },
  { key: 'demolition', label: 'Демонтажные работы', price: 485, mode: 'area' },
  { key: 'bathroom', label: 'Ремонт ванной, санузла', price: 80000, mode: 'fixed' },
]

const repairPriceTypes = [
  {
    slug: 'kosmeticheskij-remont',
    title: 'Косметический ремонт',
    price: 'от 2999 руб. за м²',
    tone: 'cosmetic',
    image: repairFormatCosmetic,
    items: [
      'Поклейка стен обоями (винил, флизелин)',
      'Окраска радиаторов отопления',
      'Устройство покрытия пола из ламината или линолеума',
      'Монтаж пластикового плинтуса',
      'Замена розеток, выключателей, светильников',
      'Замена санфаянса',
    ],
  },
  {
    slug: 'kapitalnyj-remont',
    title: 'Капитальный ремонт',
    price: 'от 4499 руб. за м²',
    tone: 'capital',
    image: repairFormatCapital,
    items: [
      'Восстановление черновой отделки',
      'Выравнивание стен, потолков, полов',
      'Оклеивание стен обоями, окраска',
      'Монтаж и окраска потолков',
      'Устройство полов из ламината, паркета',
      'Укладка плитки (ванная, санузел, кухня)',
    ],
  },
  {
    slug: 'dizajnerskij-remont',
    title: 'Эксклюзивный ремонт',
    price: 'от 8999 руб. за м²',
    tone: 'exclusive',
    image: repairFormatExclusive,
    items: [
      'Работы по дизайн-проекту',
      'Устройство многоуровневых потолков с подсветкой',
      'Перепланировка помещений',
      'Установка окон и дверей',
      'Нанесение декоративной штукатурки, окраска',
      'Устройство полов из ламината, паркета, пробки',
    ],
  },
]

const currentProcessStep = computed(() => processSteps[activeProcessStep.value] || processSteps[0])
const selectedCaseImages = computed(() => selectedCase.value?.gallery || [])
const selectedCaseImage = computed(() => selectedCaseImages.value[selectedCaseImageIndex.value])
const visibleReviews = computed(() => reviews.slice(0, 3))
const hiddenReviews = computed(() => reviews.slice(3))
const calcRows = computed(() => {
  const area = Number(calc.area) || 0
  const rooms = Number(calc.rooms) || 0
  const rows = []

  if (!area || !rooms) return rows

  if (calc.ceiling) {
    const option = calcOptions.ceiling[calc.ceilingOption]
    rows.push({ label: `Потолок: ${option.label}`, total: area * option.price })
  }

  if (calc.wall) {
    const option = calcOptions.wall[calc.wallOption]
    const wallMultiplier = rooms === 1 ? 2.4 : 1.5
    rows.push({
      label: `Стены: ${option.label}`,
      total: area * rooms * wallMultiplier * option.price,
    })
  }

  if (calc.floor) {
    const option = calcOptions.floor[calc.floorOption]
    rows.push({ label: `Полы: ${option.label}`, total: area * option.price })
  }

  for (const item of calcFixedOptions) {
    if (calc[item.key]) {
      rows.push({
        label: item.label,
        total: item.mode === 'fixed' ? item.price : area * item.price,
      })
    }
  }

  return rows
})
const calcTotal = computed(() => calcRows.value.reduce((sum, row) => sum + row.total, 0))

function formatRub(value) {
  return new Intl.NumberFormat('ru-RU').format(value)
}

async function submitQuiz() {
  if (quizSending.value) return

  quizSending.value = true
  quizSent.value = false
  quizError.value = false

  try {
    await submitLead({
      subject: 'Заявка из калькулятора ремонта',
      Форма: 'Калькулятор расчёта стоимости ремонта',
      Телефон: calc.phone,
      Площадь: `${calc.area} м²`,
      Комнаты: calc.rooms,
      Работы: calcRows.value.map((row) => `${row.label}: ${formatRub(row.total)} ₽`),
      'Предварительная стоимость': `${formatRub(calcTotal.value)} ₽`,
      Страница: window.location.href,
    })

    quizSent.value = true
    calc.phone = ''
  } catch {
    quizError.value = true
  } finally {
    quizSending.value = false
  }
}

function openCase(item) {
  selectedCase.value = item
  selectedCaseImageIndex.value = 0
}

function closeCase() {
  selectedCase.value = null
  selectedCaseImageIndex.value = 0
}

function showCaseImage(index) {
  selectedCaseImageIndex.value = index
}

function moveCaseImage(direction) {
  const total = selectedCaseImages.value.length
  selectedCaseImageIndex.value = (selectedCaseImageIndex.value + direction + total) % total
}
</script>

<template>
  <div class="home-page">
    <section class="hero">
      <div class="container container-wide hero-grid">
        <div>
          <p class="eyebrow">Ремонт квартир с понятной сметой</p>
          <h1>Ремонт под ключ в Перми</h1>
          <p class="hero-lead">
            Берём на себя замер, материалы, черновые и чистовые этапы. Вы получаете контроль
            качества, реальные сроки и один ответственный канал связи.
          </p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#quiz">Рассчитать стоимость</a>
            <a class="btn btn-secondary" href="#lead-end">Вызвать замерщика бесплатно</a>
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
      <div class="container container-wide stats-grid">
        <article v-for="metric in trustMetrics" :key="metric.value" class="card metric-card">
          <p class="metric-value">{{ metric.value }}</p>
          <p>{{ metric.label }}</p>
        </article>
      </div>
    </section>

    <section id="quiz" class="section section-accent">
      <div class="container container-wide quiz-grid">
        <div class="quiz-copy">
          <p class="eyebrow">Расчёт стоимости</p>
          <h2>Калькулятор расчёта стоимости ремонта</h2>
          <p>
            Модель расчёта перенесена с донорского сайта: выберите площадь, количество комнат и
            нужные виды работ. Итог считается по тем же ставкам.
          </p>
          <div class="price-preview">
            <p>{{ calcTotal ? 'Предварительная стоимость ремонта' : 'Выберите параметры' }}</p>
            <strong>{{ calcTotal ? `${formatRub(calcTotal)} ₽` : 'Введите размеры' }}</strong>
          </div>
        </div>

        <form class="card quiz-form repair-calculator" @submit.prevent="submitQuiz">
          <div class="calc-top-row">
            <label>
              <span>Площадь квартиры, м²</span>
              <input v-model.number="calc.area" type="number" min="1" step="1" />
            </label>

            <label>
              <span>Число комнат</span>
              <div class="calc-room-control">
                <button type="button" @click="calc.rooms = Math.max(1, Number(calc.rooms) - 1)">
                  ‹
                </button>
                <input v-model.number="calc.rooms" type="number" min="1" max="99" />
                <button type="button" @click="calc.rooms = Math.min(99, Number(calc.rooms) + 1)">
                  ›
                </button>
              </div>
            </label>
          </div>

          <div class="calc-options">
            <div class="calc-option-row">
              <label class="calc-check">
                <input v-model="calc.ceiling" type="checkbox" />
                <span>Потолок</span>
              </label>
              <select v-model.number="calc.ceilingOption" :disabled="!calc.ceiling">
                <option
                  v-for="(option, index) in calcOptions.ceiling"
                  :key="option.label"
                  :value="index"
                >
                  {{ option.label }}
                </option>
              </select>
              <strong
                >{{
                  calc.ceiling
                    ? formatRub(calcRows.find((row) => row.label.startsWith('Потолок'))?.total || 0)
                    : '—'
                }}
                ₽</strong
              >
            </div>

            <div class="calc-option-row">
              <label class="calc-check">
                <input v-model="calc.wall" type="checkbox" />
                <span>Стены</span>
              </label>
              <select v-model.number="calc.wallOption" :disabled="!calc.wall">
                <option
                  v-for="(option, index) in calcOptions.wall"
                  :key="option.label"
                  :value="index"
                >
                  {{ option.label }}
                </option>
              </select>
              <strong
                >{{
                  calc.wall
                    ? formatRub(calcRows.find((row) => row.label.startsWith('Стены'))?.total || 0)
                    : '—'
                }}
                ₽</strong
              >
            </div>

            <div class="calc-option-row">
              <label class="calc-check">
                <input v-model="calc.floor" type="checkbox" />
                <span>Полы</span>
              </label>
              <select v-model.number="calc.floorOption" :disabled="!calc.floor">
                <option
                  v-for="(option, index) in calcOptions.floor"
                  :key="option.label"
                  :value="index"
                >
                  {{ option.label }}
                </option>
              </select>
              <strong
                >{{
                  calc.floor
                    ? formatRub(calcRows.find((row) => row.label.startsWith('Полы'))?.total || 0)
                    : '—'
                }}
                ₽</strong
              >
            </div>

            <label
              v-for="item in calcFixedOptions"
              :key="item.key"
              class="calc-option-row calc-option-simple"
            >
              <span class="calc-check">
                <input v-model="calc[item.key]" type="checkbox" />
                <span>{{ item.label }}</span>
              </span>
              <span>{{ item.mode === 'fixed' ? 'фиксированно' : `${item.price} ₽/м²` }}</span>
              <strong
                >{{
                  calc[item.key]
                    ? formatRub(calcRows.find((row) => row.label === item.label)?.total || 0)
                    : '—'
                }}
                ₽</strong
              >
            </label>
          </div>

          <label>
            <span>Телефон для расчёта</span>
            <input v-model="calc.phone" type="tel" placeholder="+7 (___) ___-__-__" required />
          </label>

          <button class="btn btn-primary" type="submit" :disabled="quizSending">
            {{ quizSending ? 'Отправляем...' : 'Оставить заявку' }}
          </button>
          <p v-if="quizSent" class="form-success">
            Принято. Мы подготовим расчёт и свяжемся с вами.
          </p>
          <p v-if="quizError" class="form-error">
            Не удалось отправить заявку. Позвоните нам или попробуйте ещё раз.
          </p>
        </form>
      </div>
    </section>

    <section id="types" class="section repair-price-section">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">Стоимость за м²</p>
          <h2>Три понятных формата ремонта под разный объём работ</h2>
        </div>
        <div class="repair-price-grid">
          <article
            v-for="type in repairPriceTypes"
            :key="type.slug"
            class="card repair-price-card"
            :class="`repair-price-card-${type.tone}`"
          >
            <div class="repair-price-icon" aria-hidden="true">
              <img :src="type.image" :alt="type.title" />
            </div>
            <h3>{{ type.title }}</h3>
            <p class="repair-price-ribbon">{{ type.price }}</p>
            <ul>
              <li v-for="item in type.items" :key="item">{{ item }}</li>
            </ul>
            <RouterLink class="text-link" :to="`/uslugi/${type.slug}`"
              >Подробнее о ремонте</RouterLink
            >
          </article>
        </div>
      </div>
    </section>

    <section class="section process-section">
      <div class="container container-wide">
        <div class="section-head process-head">
          <p class="eyebrow">Этапы</p>
          <h2>Как мы ведём объект от заявки до сдачи</h2>
          <p>
            Каждый этап фиксируем по срокам, смете и результату. Вы видите понятный маршрут ремонта
            без хаоса, скрытых работ и ежедневного ручного контроля.
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

    <section id="cases" class="section">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">Портфолио</p>
          <h2>Реальные кейсы: площадь, срок, стоимость и результат</h2>
        </div>
        <div class="cases-grid">
          <article v-for="item in portfolioCases" :key="item.id" class="card case-card">
            <button class="case-media" type="button" @click="openCase(item)">
              <img :src="item.image" :alt="item.title" />
            </button>
            <div class="case-content">
              <h3>{{ item.title }}</h3>
              <p class="case-meta">{{ item.area }} • {{ item.duration }}</p>
              <p><strong>Задача:</strong> {{ item.task }}</p>
              <p><strong>Сделано:</strong> {{ item.workDone }}</p>
              <p><strong>Итог:</strong> {{ item.result }}</p>
              <button class="btn btn-secondary case-more" type="button" @click="openCase(item)">
                Подробнее
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="reviews" class="section reviews-band">
      <div class="container container-wide">
        <div class="section-head reviews-band-head">
          <div>
            <span class="reviews-kicker">Отзывы клиентов</span>
            <h2>Клиенты отмечают не только результат, но и спокойный процесс</h2>
          </div>
          <p>
            Собрали реальные впечатления после сдачи объектов: про сроки, материалы, коммуникацию и
            итоговое качество ремонта.
          </p>
        </div>
        <div class="reviews-band-grid">
          <article v-for="review in visibleReviews" :key="review.author" class="review-card">
            <p>«{{ review.text }}»</p>
            <strong>{{ review.author }}</strong>
          </article>
        </div>
        <details v-if="hiddenReviews.length" class="reviews-disclosure reviews-band-more">
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

    <section id="faq" class="section">
      <div class="container container-wide">
        <div class="section-head">
          <p class="eyebrow">FAQ</p>
          <h2>Частые вопросы перед стартом ремонта</h2>
        </div>
        <div class="faq-list faq-list-full">
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
          <p v-for="phone in company.phones" :key="phone.href">
            <a :href="phone.href">
              <strong>{{ phone.label }}</strong>
            </a>
          </p>
          <p>{{ company.address }}</p>
          <p>{{ company.workHours }}</p>
          <p>
            Работаем по договору, фиксируем этапы и предоставляем гарантию на выполненные работы.
          </p>
        </aside>
      </div>
    </section>

    <div v-if="selectedCase" class="case-modal" role="dialog" aria-modal="true">
      <button class="case-modal-backdrop" type="button" aria-label="Закрыть" @click="closeCase" />
      <div class="case-modal-panel">
        <div class="case-modal-head">
          <div>
            <p class="eyebrow">Фото объекта</p>
            <h2>{{ selectedCase.title }}</h2>
          </div>
          <button class="case-modal-close" type="button" aria-label="Закрыть" @click="closeCase">
            ×
          </button>
        </div>

        <div class="case-modal-gallery">
          <button
            v-if="selectedCaseImages.length > 1"
            class="case-gallery-control case-gallery-prev"
            type="button"
            aria-label="Предыдущее фото"
            @click="moveCaseImage(-1)"
          >
            ‹
          </button>
          <img :src="selectedCaseImage" :alt="selectedCase.title" />
          <button
            v-if="selectedCaseImages.length > 1"
            class="case-gallery-control case-gallery-next"
            type="button"
            aria-label="Следующее фото"
            @click="moveCaseImage(1)"
          >
            ›
          </button>
        </div>

        <div class="case-thumbs">
          <button
            v-for="(image, index) in selectedCaseImages"
            :key="image"
            type="button"
            :class="{ 'is-active': selectedCaseImageIndex === index }"
            @click="showCaseImage(index)"
          >
            <img :src="image" :alt="`${selectedCase.title}: фото ${index + 1}`" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
