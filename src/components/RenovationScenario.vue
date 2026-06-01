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
    sub: 'Быстрое обновление без перепланировки и сложной инженерии.',
    priceFrom: 2999,
    priceTo: 5200,
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
    sub: 'Полный перезапуск квартиры с черновыми работами и коммуникациями.',
    priceFrom: 4499,
    priceTo: 9500,
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
    sub: 'Реализация дизайн-проекта со сложными узлами и материалами.',
    priceFrom: 8999,
    priceTo: 18000,
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

const propertyTypes = [
  { id: 'apartment', label: 'Квартира', icon: '□', hasCondition: true, hasRooms: true, area: 58 },
  { id: 'studio', label: 'Студия', icon: '▣', hasCondition: true, hasRooms: false, area: 32 },
  { id: 'house', label: 'Дом', icon: '⌂', hasCondition: false, hasRooms: false, area: 140 },
  { id: 'office', label: 'Офис', icon: '▤', hasCondition: false, hasRooms: false, area: 90 },
]

const conditions = [
  { id: 'newbuild', label: 'Новостройка', sub: 'без отделки', multiplier: 1.08 },
  { id: 'secondary-clean', label: 'Вторичка', sub: 'с отделкой', multiplier: 1 },
  { id: 'secondary-old', label: 'Вторичка', sub: 'после старого ремонта', multiplier: 1.16 },
]

const rooms = [
  { id: 'one', label: '1-комн.', area: 41 },
  { id: 'two', label: '2-комн.', area: 58 },
  { id: 'three', label: '3-комн.', area: 78 },
  { id: 'four', label: '4+ комн.', area: 110 },
]

const selectedFormatId = ref(formatMap[props.currentSlug] || 'cosmetic')
const selectedPropertyId = ref('')
const selectedConditionId = ref('')
const selectedRoomId = ref('')
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
const selectedProperty = computed(() =>
  propertyTypes.find((item) => item.id === selectedPropertyId.value),
)
const selectedCondition = computed(() =>
  conditions.find((item) => item.id === selectedConditionId.value),
)
const selectedRoom = computed(() => rooms.find((item) => item.id === selectedRoomId.value))

const needsCondition = computed(() => selectedProperty.value?.hasCondition || false)
const needsRooms = computed(() => selectedProperty.value?.hasRooms || false)
const showConditionStep = computed(() => !!selectedProperty.value && needsCondition.value)
const showRoomsStep = computed(
  () =>
    !!selectedProperty.value &&
    needsRooms.value &&
    (!needsCondition.value || !!selectedCondition.value),
)
const isComplete = computed(
  () =>
    !!selectedFormat.value &&
    !!selectedProperty.value &&
    (!needsCondition.value || !!selectedCondition.value) &&
    (!needsRooms.value || !!selectedRoom.value),
)

const scenarioHint = computed(() => {
  if (!selectedProperty.value) return 'Выберите тип объекта'
  if (showConditionStep.value && !selectedCondition.value) return 'Укажите состояние жилья'
  if (showRoomsStep.value && !selectedRoom.value) return 'Укажите планировку'
  return 'Сценарий готов'
})

const area = computed(() => selectedRoom.value?.area || selectedProperty.value?.area || 60)
const multiplier = computed(() => selectedCondition.value?.multiplier || 1)
const priceFrom = computed(() => roundHundreds(selectedFormat.value.priceFrom * multiplier.value))
const priceTo = computed(() => roundHundreds(selectedFormat.value.priceTo * multiplier.value))
const totalFrom = computed(() => priceFrom.value * area.value)
const totalTo = computed(() => priceTo.value * area.value)

function roundHundreds(value) {
  return Math.round(value / 100) * 100
}

function formatRub(value) {
  return new Intl.NumberFormat('ru-RU').format(value)
}

function selectFormat(id) {
  selectedFormatId.value = id
  activeImage.value = 0
}

function selectProperty(id) {
  selectedPropertyId.value = id
  selectedConditionId.value = ''
  selectedRoomId.value = ''
}

function selectCondition(id) {
  selectedConditionId.value = id
  selectedRoomId.value = ''
}
</script>

<template>
  <section class="section renovation-scenario-section">
    <div class="container container-wide">
      <div class="section-head renovation-scenario-head">
        <p class="eyebrow">Подбор сценария</p>
        <h2>Настройте ремонт под свой объект</h2>
        <p>
          Выберите формат, тип помещения и исходное состояние. Блок покажет ориентир по бюджету,
          срокам и составу работ, чтобы проще понять масштаб ремонта до консультации.
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
            <span class="scenario-step-badge" :class="{ 'is-done': selectedProperty }">2</span>
            <p>Тип объекта</p>
          </div>

          <div class="scenario-pill-grid">
            <button
              v-for="item in propertyTypes"
              :key="item.id"
              class="scenario-pill"
              :class="{ 'is-active': selectedPropertyId === item.id }"
              type="button"
              @click="selectProperty(item.id)"
            >
              <span aria-hidden="true">{{ item.icon }}</span>
              {{ item.label }}
            </button>
          </div>
        </div>

        <div v-if="showConditionStep" class="scenario-step">
          <div class="scenario-step-head">
            <span class="scenario-step-badge" :class="{ 'is-done': selectedCondition }">3</span>
            <p>Состояние жилья</p>
          </div>

          <div class="scenario-pill-grid">
            <button
              v-for="item in conditions"
              :key="item.id"
              class="scenario-pill scenario-pill-stack"
              :class="{ 'is-active': selectedConditionId === item.id }"
              type="button"
              @click="selectCondition(item.id)"
            >
              <strong>{{ item.label }}</strong>
              <span>{{ item.sub }}</span>
            </button>
          </div>
        </div>

        <div v-if="showRoomsStep" class="scenario-step">
          <div class="scenario-step-head">
            <span class="scenario-step-badge" :class="{ 'is-done': selectedRoom }">4</span>
            <p>Планировка</p>
          </div>

          <div class="scenario-pill-grid">
            <button
              v-for="item in rooms"
              :key="item.id"
              class="scenario-pill scenario-pill-stack"
              :class="{ 'is-active': selectedRoomId === item.id }"
              type="button"
              @click="selectedRoomId = item.id"
            >
              <strong>{{ item.label }}</strong>
              <span>≈ {{ item.area }} м²</span>
            </button>
          </div>
        </div>

        <div v-if="isComplete" class="scenario-result">
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
              {{ selectedProperty.label }}
              <template v-if="selectedCondition">
                <span>/</span>
                {{ selectedCondition.label }}
              </template>
              <template v-if="selectedRoom">
                <span>/</span>
                {{ selectedRoom.label }}
              </template>
            </p>

            <h3>{{ selectedFormat.label }} ремонт под ваш ввод</h3>
            <p>{{ selectedFormat.sub }}</p>

            <div class="scenario-stats">
              <div>
                <span>Цена / м²</span>
                <strong>{{ formatRub(priceFrom) }}–{{ formatRub(priceTo) }} ₽</strong>
              </div>
              <div>
                <span>Срок</span>
                <strong>{{ selectedFormat.weekFrom }}–{{ selectedFormat.weekTo }} нед.</strong>
              </div>
              <div>
                <span>Ориентир</span>
                <strong>{{ formatRub(totalFrom) }}–{{ formatRub(totalTo) }} ₽</strong>
              </div>
            </div>

            <p class="scenario-list-title">Что входит</p>
            <ul>
              <li v-for="item in selectedFormat.includes" :key="item">{{ item }}</li>
            </ul>

            <div class="scenario-actions">
              <a class="btn btn-primary" href="#service-lead">Рассчитать точнее</a>
              <a class="btn btn-secondary" href="/#cases">Смотреть кейсы</a>
            </div>
          </div>
        </div>

        <p v-else class="scenario-hint">{{ scenarioHint }}</p>
      </div>
    </div>
  </section>
</template>
