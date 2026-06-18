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
const activeDesktopMenu = ref('')
let desktopMenuCloseTimer = null

const serviceMenu = [
  {
    title: 'Форматы ремонта',
    items: [
      { label: 'Косметический ремонт', href: '/uslugi/kosmeticheskij-remont' },
      { label: 'Капитальный ремонт', href: '/uslugi/kapitalnyj-remont' },
      { label: 'Эксклюзивный ремонт', href: '/uslugi/dizajnerskij-remont' },
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
  { label: 'О компании', href: '/o-kompanii' },
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

function openDesktopMenu(menu) {
  if (desktopMenuCloseTimer) {
    clearTimeout(desktopMenuCloseTimer)
  }
  activeDesktopMenu.value = menu
}

function scheduleDesktopMenuClose(delay = 3000) {
  if (desktopMenuCloseTimer) {
    clearTimeout(desktopMenuCloseTimer)
  }
  desktopMenuCloseTimer = window.setTimeout(() => {
    activeDesktopMenu.value = ''
  }, delay)
}

watch(
  () => route.fullPath,
  () => {
    closeMobileMenu()
    activeDesktopMenu.value = ''
  },
)
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="logo" to="/" aria-label="Браво Проект">
        <img class="logo-image" :src="bravoLogo" alt="Браво Проект" />
        <span class="logo-caption">Отделка под ключ</span>
      </RouterLink>

      <nav class="main-nav">
        <div
          class="nav-dropdown"
          :class="{ 'is-open': activeDesktopMenu === 'services' }"
          @mouseenter="openDesktopMenu('services')"
          @mouseleave="scheduleDesktopMenuClose"
          @focusin="openDesktopMenu('services')"
          @focusout="scheduleDesktopMenuClose"
        >
          <a :href="isHome ? '#types' : '/#types'">Услуги</a>
          <div class="mega-menu mega-menu-services">
            <div v-for="group in serviceMenu" :key="group.title" class="mega-menu-group">
              <p>{{ group.title }}</p>
              <a v-for="item in group.items" :key="item.label" :href="item.href">{{
                item.label
              }}</a>
            </div>
          </div>
        </div>

        <div
          class="nav-dropdown"
          :class="{ 'is-open': activeDesktopMenu === 'works' }"
          @mouseenter="openDesktopMenu('works')"
          @mouseleave="scheduleDesktopMenuClose(750)"
          @focusin="openDesktopMenu('works')"
          @focusout="scheduleDesktopMenuClose(750)"
        >
          <a href="/#types">Виды работ</a>
          <div class="mega-menu mega-menu-works">
            <div v-for="group in workMenu" :key="group.title" class="mega-menu-group">
              <p>{{ group.title }}</p>
              <a v-for="item in group.items" :key="item.label" :href="item.href">{{
                item.label
              }}</a>
            </div>
          </div>
        </div>

        <a v-for="item in navItems.slice(0, 2)" :key="item.label" :href="item.href">{{
          item.label
        }}</a>

        <a v-for="item in navItems.slice(2)" :key="item.label" :href="item.href">{{
          item.label
        }}</a>
      </nav>

      <div class="header-actions">
        <div class="header-phones">
          <a
            v-for="phone in company.phones"
            :key="phone.href"
            class="header-phone"
            :href="phone.href"
          >
            {{ phone.label }}
          </a>
        </div>
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
          <button
            class="mobile-nav-close"
            type="button"
            aria-label="Закрыть меню"
            @click="closeMobileMenu"
          >
            ×
          </button>
        </div>

        <button
          class="mobile-nav-item mobile-nav-parent"
          type="button"
          @click="openMobileMenu('services')"
        >
          <span>Услуги</span>
          <span aria-hidden="true">›</span>
        </button>

        <a
          v-for="item in navItems.slice(0, 2)"
          :key="item.label"
          :href="item.href"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </a>

        <button
          class="mobile-nav-item mobile-nav-parent"
          type="button"
          @click="openMobileMenu('works')"
        >
          <span>Виды работ</span>
          <span aria-hidden="true">›</span>
        </button>

        <a
          v-for="item in navItems.slice(2)"
          :key="item.label"
          :href="item.href"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </a>

        <a class="btn btn-primary" href="/#quiz" @click="closeMobileMenu">Рассчитать стоимость</a>
      </div>

      <div v-else class="mobile-menu-screen">
        <div class="mobile-menu-panel-head">
          <button class="mobile-nav-back" type="button" @click="activeMobileMenu = 'main'">
            ← Назад
          </button>
          <button
            class="mobile-nav-close"
            type="button"
            aria-label="Закрыть меню"
            @click="closeMobileMenu"
          >
            ×
          </button>
        </div>

        <template v-if="activeMobileMenu === 'services'">
          <p class="mobile-menu-title">Услуги</p>
          <div v-for="group in serviceMenu" :key="group.title" class="mobile-nav-group">
            <p>{{ group.title }}</p>
            <a
              v-for="item in group.items"
              :key="item.label"
              :href="item.href"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </a>
          </div>
        </template>

        <template v-if="activeMobileMenu === 'works'">
          <p class="mobile-menu-title">Виды работ</p>
          <div v-for="group in workMenu" :key="group.title" class="mobile-nav-group">
            <p>{{ group.title }}</p>
            <a
              v-for="item in group.items"
              :key="item.label"
              :href="item.href"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </a>
          </div>
        </template>
      </div>
    </nav>
  </header>
</template>
