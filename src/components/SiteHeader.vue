<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import bravoLogo from '../assets/bravo-logo-5.png'
import { company } from '../data/siteData'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const mobileMenuOpen = ref(false)
const activeMobileMenu = ref('main')

const serviceMenu = [
  {
    title: 'Тип ремонта',
    items: [
      { label: 'Косметический ремонт', href: '/uslugi/kosmeticheskij-remont' },
      { label: 'Капитальный ремонт', href: '/uslugi/kapitalnyj-remont' },
      { label: 'Ремонт новостройки', href: '/uslugi/novostroyka' },
      { label: 'Ремонт ванной', href: '/uslugi/remont-vannoj' },
      { label: 'Ремонт кухни', href: '/uslugi/remont-kuhni' },
      { label: 'Дизайнерский ремонт', href: '/uslugi/dizajnerskij-remont' },
    ],
  },
  {
    title: 'Количество комнат',
    items: [
      { label: 'Квартира студия', href: '/uslugi/studija' },
      { label: '1-комнатная квартира', href: '/uslugi/odnokomnatnaya-kvartira' },
      { label: '2-комнатная квартира', href: '/uslugi/dvuhkomnatnaya-kvartira' },
      { label: '3-комнатная квартира', href: '/uslugi/trehkomnatnaya-kvartira' },
      { label: '4-комнатная квартира', href: '/uslugi/chetyrehkomnatnaya-kvartira' },
    ],
  },
  {
    title: 'Тип помещения',
    items: [
      { label: 'Кухня', href: '/uslugi/remont-kuhni' },
      { label: 'Ванная', href: '/uslugi/remont-vannoj' },
      { label: 'Гостиная', href: '/uslugi/remont-gostinoj' },
      { label: 'Туалет', href: '/uslugi/remont-tualeta' },
      { label: 'Спальня', href: '/uslugi/remont-spalni' },
      { label: 'Детская', href: '/uslugi/remont-detskoj' },
      { label: 'Прихожая', href: '/uslugi/remont-prihozhej' },
      { label: 'Офис', href: '/uslugi/remont-ofisa' },
    ],
  },
  {
    title: 'Тип квартиры',
    items: [
      { label: 'Новостройка', href: '/uslugi/novostroyka' },
      { label: 'Вторичка', href: '/uslugi/vtorichka' },
      { label: 'Панельный дом', href: '/uslugi/panelnyj-dom' },
      { label: 'Кирпичный дом', href: '/uslugi/kirpichnyj-dom' },
      { label: 'Хрущевка', href: '/uslugi/hruschevka' },
    ],
  },
]

const workMenu = [
  {
    title: 'Стены',
    items: [
      { label: 'Штукатурка стен', href: '/raboty/shtukaturka-sten' },
      { label: 'Шпатлевка стен', href: '/raboty/shpatlevka-sten' },
      { label: 'Покраска стен', href: '/raboty/pokraska-sten' },
      { label: 'Поклейка обоев', href: '/raboty/poklejka-oboev' },
      { label: 'Плитка на стену', href: '/raboty/plitka-na-stenu' },
    ],
  },
  {
    title: 'Пол',
    items: [
      { label: 'Стяжка пола', href: '/raboty/styazhka-pola' },
      { label: 'Укладка плитки', href: '/raboty/ukladka-plitki' },
      { label: 'Укладка ламината', href: '/raboty/ukladka-laminata' },
      { label: 'Гидроизоляция', href: '/raboty/gidroizolyaciya' },
      { label: 'Теплый пол', href: '/raboty/teplyj-pol' },
    ],
  },
  {
    title: 'Потолок',
    items: [
      { label: 'Натяжной потолок', href: '/raboty/natyazhnoj-potolok' },
      { label: 'Покраска потолка', href: '/raboty/pokraska-potolka' },
      { label: 'Шпатлевка потолка', href: '/raboty/shpatlevka-potolka' },
      { label: 'Подвесной потолок', href: '/raboty/podvesnoj-potolok' },
    ],
  },
  {
    title: 'Инженерия',
    items: [
      { label: 'Сантехника', href: '/raboty/santehnika' },
      { label: 'Электрика', href: '/raboty/elektrika' },
      { label: 'Демонтаж', href: '/raboty/demontazh' },
      { label: 'Монтаж оборудования', href: '/raboty/montazh-oborudovaniya' },
    ],
  },
]

const navItems = [
  { label: 'Портфолио', href: '/#cases' },
  { label: 'О компании', href: '/#faq' },
  { label: 'Контакты', href: '/#lead-end' },
]

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
  activeMobileMenu.value = 'main'
}

function openMobileMenu(menu) {
  activeMobileMenu.value = menu
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
  activeMobileMenu.value = 'main'
}

watch(
  () => route.fullPath,
  () => {
    closeMobileMenu()
  },
)
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="logo" to="/" aria-label="BRAVO REMONT">
        <img class="logo-image" :src="bravoLogo" alt="BRAVO REMONT" />
        <span class="logo-caption">Отделка под ключ</span>
      </RouterLink>

      <nav class="main-nav">
        <div class="nav-dropdown">
          <a :href="isHome ? '#types' : '/#types'">Услуги</a>
          <div class="mega-menu">
            <div v-for="group in serviceMenu" :key="group.title" class="mega-menu-group">
              <p>{{ group.title }}</p>
              <a v-for="item in group.items" :key="item.label" :href="item.href">{{ item.label }}</a>
            </div>
          </div>
        </div>

        <a v-for="item in navItems.slice(0, 2)" :key="item.label" :href="item.href">{{ item.label }}</a>

        <div class="nav-dropdown">
          <a href="/#types">Виды работ</a>
          <div class="mega-menu mega-menu-works">
            <div v-for="group in workMenu" :key="group.title" class="mega-menu-group">
              <p>{{ group.title }}</p>
              <a v-for="item in group.items" :key="item.label" :href="item.href">{{ item.label }}</a>
            </div>
          </div>
        </div>

        <a v-for="item in navItems.slice(2)" :key="item.label" :href="item.href">{{ item.label }}</a>
      </nav>

      <div class="header-actions">
        <a class="header-phone" href="tel:+73422479957">{{ company.phone }}</a>
        <a class="btn btn-primary" :href="isHome ? '#quiz' : '/#quiz'">Рассчитать стоимость</a>
      </div>

      <button
        class="mobile-menu-toggle"
        type="button"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-menu"
        @click.stop="toggleMobileMenu"
      >
        <span class="mobile-menu-label">Меню</span>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <button
      class="mobile-menu-backdrop"
      :class="{ 'is-open': mobileMenuOpen }"
      type="button"
      aria-label="Закрыть меню"
      @click="closeMobileMenu"
    ></button>

    <nav
      id="mobile-menu"
      class="mobile-nav"
      :class="{ 'is-open': mobileMenuOpen }"
      aria-label="Мобильное меню"
    >
      <div v-if="activeMobileMenu === 'main'" class="mobile-menu-screen">
        <div class="mobile-menu-panel-head">
          <p class="mobile-menu-title">Меню</p>
          <button class="mobile-nav-close" type="button" aria-label="Закрыть меню" @click="closeMobileMenu">
            ×
          </button>
        </div>

        <button class="mobile-nav-item mobile-nav-parent" type="button" @click="openMobileMenu('services')">
          <span>Услуги</span>
          <span aria-hidden="true">›</span>
        </button>

        <a v-for="item in navItems.slice(0, 2)" :key="item.label" :href="item.href" @click="closeMobileMenu">
          {{ item.label }}
        </a>

        <button class="mobile-nav-item mobile-nav-parent" type="button" @click="openMobileMenu('works')">
          <span>Виды работ</span>
          <span aria-hidden="true">›</span>
        </button>

        <a v-for="item in navItems.slice(2)" :key="item.label" :href="item.href" @click="closeMobileMenu">
          {{ item.label }}
        </a>

        <a class="btn btn-primary" href="/#quiz" @click="closeMobileMenu">Рассчитать стоимость</a>
      </div>

      <div v-else class="mobile-menu-screen">
        <div class="mobile-menu-panel-head">
          <button class="mobile-nav-back" type="button" @click="activeMobileMenu = 'main'">← Назад</button>
          <button class="mobile-nav-close" type="button" aria-label="Закрыть меню" @click="closeMobileMenu">
            ×
          </button>
        </div>

        <template v-if="activeMobileMenu === 'services'">
          <p class="mobile-menu-title">Услуги</p>
          <div v-for="group in serviceMenu" :key="group.title" class="mobile-nav-group">
            <p>{{ group.title }}</p>
            <a v-for="item in group.items" :key="item.label" :href="item.href" @click="closeMobileMenu">
              {{ item.label }}
            </a>
          </div>
        </template>

        <template v-if="activeMobileMenu === 'works'">
          <p class="mobile-menu-title">Виды работ</p>
          <div v-for="group in workMenu" :key="group.title" class="mobile-nav-group">
            <p>{{ group.title }}</p>
            <a v-for="item in group.items" :key="item.label" :href="item.href" @click="closeMobileMenu">
              {{ item.label }}
            </a>
          </div>
        </template>
      </div>
    </nav>
  </header>
</template>
