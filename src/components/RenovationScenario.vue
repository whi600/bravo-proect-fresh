<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  currentSlug: {
    type: String,
    default: '',
  },
})

const formatMap = {
  'kosmeticheskij-remont': 'cosmetic',
  'kapitalnyj-remont': 'capital',
  'dizajnerskij-remont': 'exclusive',
}

const formats = [
  {
    id: 'cosmetic',
    label: 'Косметический',
    sub: 'Обновление квартиры без перепланировки: стены, потолки, полы и аккуратная чистовая отделка.',
    priceFrom: 2999,
    weekFrom: 2,
    weekTo: 4,
    includes: [
      'Подготовка стен и потолков',
      'Поклейка обоев или окраска',
      'Замена напольного покрытия и плинтусов',
      'Обновление розеток, выключателей и светильников',
      'Финишная уборка после работ',
    ],
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'capital',
    label: 'Капитальный',
    sub: 'Полный ремонт с демонтажем, выравниванием оснований, инженерией и чистовой отделкой.',
    priceFrom: 4499,
    weekFrom: 6,
    weekTo: 14,
    includes: [
      'Демонтаж старых покрытий',
      'Выравнивание стен, потолков и полов',
      'Замена электрики и сантехнических узлов',
      'Плиточные и чистовые отделочные работы',
      'Сдача по чек-листу скрытых и финишных работ',
    ],
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'exclusive',
    label: 'Эксклюзивный',
    sub: 'Реализация дизайн-проекта со сложными узлами, декоративными покрытиями и премиальными материалами.',
    priceFrom: 8999,
    weekFrom: 10,
    weekTo: 22,
    includes: [
      'Разбор дизайн-проекта и ведомостей',
      'Сложные потолки, подсветка и декоративные покрытия',
      'Индивидуальные решения по хранению и зонированию',
      'Работа с крупноформатной плиткой и премиальными материалами',
      'Финальная комплектация и авторский контроль деталей',
    ],
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80',
    ],
  },
]

const roomOptions = [
  { id: 'studio', label: 'Студия', area: 32, add: 0 },
  { id: 'one', label: '1-комнатная', area: 41, add: 0 },
  { id: 'two', label: '2-комнатная', area: 58, add: 0 },
  { id: 'three', label: '3-комнатная', area: 78, add: 150 },
  { id: 'four', label: '4+ комнаты', area: 110, add: 250 },
]

const ceilingOptions = [
  { id: 'stretch', label: 'Натяжной потолок', add: 0 },
  { id: 'paint', label: 'Шпатлевка и покраска', add: 450 },
  { id: 'gypsum', label: 'ГКЛ потолок', add: 900 },
]

const wallOptions = [
  { id: 'wallpaper', label: 'Поклейка обоев', add: 0 },
  { id: 'paint', label: 'Под покраску', add: 650 },
  { id: 'decor', label: 'Декоративное покрытие', add: 1200 },
]

const floorOptions = [
  { id: 'laminate', label: 'Ламинат', add: 0 },
  { id: 'tile', label: 'Плитка и керамогранит', add: 850 },
  { id: 'engineered', label: 'Инженерная доска', add: 1300 },
]

const extraWorks = [
  { id: 'electric', label: 'Замена электропроводки', price: 55000 },
  { id: 'sockets', label: 'Розетки и выключатели', price: 12000 },
  { id: 'demolition', label: 'Демонтаж старых покрытий', price: 28000 },
  { id: 'bathroom', label: 'Ремонт ванной и санузла', price: 95000 },
]

const selectedFormatId = ref(formatMap[props.currentSlug] || 'cosmetic')
const selectedRoomId = ref('two')
const selectedCeilingId = ref('stretch')
const selectedWallId = ref('wallpaper')
const selectedFloorId = ref('laminate')
const selectedExtras = ref(['demolition'])
const area = ref(58)
const activeImage = ref(0)

watch(
  () => props.currentSlug,
  (slug) => {
    selectedFormatId.value = formatMap[slug] || selectedFormatId.value
    activeImage.value = 0
  },
)

const selectedFormat = computed(
  () => formats.find((item) => item.id === selectedFormatId.value) || formats[0],
)
const selectedRoom = computed(() => roomOptions.find((item) => item.id === selectedRoomId.value))
const selectedCeiling = computed(
  () => ceilingOptions.find((item) => item.id === selectedCeilingId.value) || ceilingOptions[0],
)
const selectedWall = computed(
  () => wallOptions.find((item) => item.id === selectedWallId.value) || wallOptions[0],
)
const selectedFloor = computed(
  () => floorOptions.find((item) => item.id === selectedFloorId.value) || floorOptions[0],
)
const selectedExtraItems = computed(() =>
  extraWorks.filter((item) => selectedExtras.value.includes(item.id)),
)
const finishAdd = computed(
  () =>
    selectedCeiling.value.add +
    selectedWall.value.add +
    selectedFloor.value.add +
    (selectedRoom.value?.add || 0),
)
const pricePerMeter = computed(() => selectedFormat.value.priceFrom + finishAdd.value)
const extraTotal = computed(() => selectedExtraItems.value.reduce((sum, item) => sum + item.price, 0))
const total = computed(() => pricePerMeter.value * area.value + extraTotal.value)
const baseTotal = computed(() => selectedFormat.value.priceFrom * area.value)

function formatRub(value) {
  return new Intl.NumberFormat('ru-RU').format(value)
}

function selectFormat(id) {
  selectedFormatId.value = id
  activeImage.value = 0
}

function selectRoom(item) {
  selectedRoomId.value = item.id
  area.value = item.area
}

function toggleExtra(id) {
  selectedExtras.value = selectedExtras.value.includes(id)
    ? selectedExtras.value.filter((item) => item !== id)
    : [...selectedExtras.value, id]
}
</script>

<template>
  <section class="section renovation-scenario-section">
    <div class="container container-wide">
      <div class="section-head renovation-scenario-head">
        <p class="eyebrow">Калькулятор работ</p>
        <h2>Соберите состав ремонта</h2>
        <p>
          Выберите формат, площадь и основные виды отделки. Расчет показывает ориентир по работам до
          выезда замерщика, а точную смету фиксируем после осмотра объекта.
        </p>
      </div>

      <div class="renovation-scenario">
        <div class="scenario-step">
          <div class="scenario-step-head">
            <span class="scenario-step-badge is-done">1</span>
            <p>Формат ремонта</p>
          </div>

          <div class="scenario-format-grid">
            <button
              v-for="item in formats"
              :key="item.id"
              class="scenario-format-card"
              :class="{ 'is-active': selectedFormatId === item.id }"
              type="button"
              @click="selectFormat(item.id)"
            >
              <strong>{{ item.label }}</strong>
              <span>от {{ formatRub(item.priceFrom) }} ₽/м²</span>
            </button>
          </div>
        </div>

        <div class="scenario-step">
          <div class="scenario-step-head">
            <span class="scenario-step-badge is-done">2</span>
            <p>Площадь и комнаты</p>
          </div>

          <div class="scenario-field-grid">
            <label class="scenario-range">
              <span>Площадь квартиры</span>
              <strong>{{ area }} м²</strong>
              <input v-model.number="area" type="range" min="20" max="160" step="1" />
            </label>

            <div class="scenario-pill-grid">
              <button
                v-for="item in roomOptions"
                :key="item.id"
                class="scenario-pill scenario-pill-stack"
                :class="{ 'is-active': selectedRoomId === item.id }"
                type="button"
                @click="selectRoom(item)"
              >
                <strong>{{ item.label }}</strong>
                <span>≈ {{ item.area }} м²</span>
              </button>
            </div>
          </div>
        </div>

        <div class="scenario-step">
          <div class="scenario-step-head">
            <span class="scenario-step-badge is-done">3</span>
            <p>Потолок, стены, пол</p>
          </div>

          <div class="scenario-field-grid scenario-finish-grid">
            <label>
              <span>Потолок</span>
              <select v-model="selectedCeilingId">
                <option v-for="item in ceilingOptions" :key="item.id" :value="item.id">
                  {{ item.label }}
                </option>
              </select>
            </label>
            <label>
              <span>Стены</span>
              <select v-model="selectedWallId">
                <option v-for="item in wallOptions" :key="item.id" :value="item.id">
                  {{ item.label }}
                </option>
              </select>
            </label>
            <label>
              <span>Полы</span>
              <select v-model="selectedFloorId">
                <option v-for="item in floorOptions" :key="item.id" :value="item.id">
                  {{ item.label }}
                </option>
              </select>
            </label>
          </div>
        </div>

        <div class="scenario-step">
          <div class="scenario-step-head">
            <span class="scenario-step-badge is-done">4</span>
            <p>Дополнительные работы</p>
          </div>

          <div class="scenario-check-grid">
            <button
              v-for="item in extraWorks"
              :key="item.id"
              class="scenario-check"
              :class="{ 'is-active': selectedExtras.includes(item.id) }"
              type="button"
              @click="toggleExtra(item.id)"
            >
              <span></span>
              <strong>{{ item.label }}</strong>
              <small>+ {{ formatRub(item.price) }} ₽</small>
            </button>
          </div>
        </div>

        <div class="scenario-result">
          <div class="scenario-gallery">
            <img
              class="scenario-main-image"
              :src="selectedFormat.images[activeImage]"
              :alt="`${selectedFormat.label} ремонт`"
            />
            <div class="scenario-thumbs">
              <button
                v-for="(image, index) in selectedFormat.images"
                :key="image"
                :class="{ 'is-active': activeImage === index }"
                type="button"
                @click="activeImage = index"
              >
                <img :src="image" alt="" />
              </button>
            </div>
          </div>

          <div class="scenario-summary">
            <p class="scenario-breadcrumb">
              {{ selectedFormat.label }} ремонт
              <span>/</span>
              {{ area }} м²
              <span>/</span>
              {{ selectedRoom.label }}
            </p>

            <h3>{{ selectedFormat.label }} ремонт по вашему составу</h3>
            <p>{{ selectedFormat.sub }}</p>

            <div class="scenario-stats">
              <div>
                <span>Базовая цена</span>
                <strong>от {{ formatRub(selectedFormat.priceFrom) }} ₽/м²</strong>
              </div>
              <div>
                <span>Срок</span>
                <strong>{{ selectedFormat.weekFrom }}–{{ selectedFormat.weekTo }} нед.</strong>
              </div>
              <div>
                <span>Ориентир</span>
                <strong>{{ formatRub(total) }} ₽</strong>
              </div>
            </div>

            <p class="scenario-list-title">Что учли в расчете</p>
            <ul>
              <li>Базовые работы: от {{ formatRub(baseTotal) }} ₽ за {{ area }} м²</li>
              <li>Потолок: {{ selectedCeiling.label }}</li>
              <li>Стены: {{ selectedWall.label }}</li>
              <li>Полы: {{ selectedFloor.label }}</li>
              <li v-for="item in selectedExtraItems" :key="item.id">{{ item.label }}</li>
            </ul>

            <p class="scenario-list-title">Что входит в формат</p>
            <ul>
              <li v-for="item in selectedFormat.includes" :key="item">{{ item }}</li>
            </ul>

            <div class="scenario-actions">
              <a class="btn btn-primary" href="#service-lead">Рассчитать точнее</a>
              <a class="btn btn-secondary" href="/#cases">Смотреть кейсы</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
