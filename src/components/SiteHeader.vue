<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { company } from '../data/siteData'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const mobileMenuOpen = ref(false)

const serviceMenu = [
  {
    title: 'Тип ремонта',
    items: [
      { label: 'Косметический ремонт', href: '/uslugi/kosmeticheskij-remont' },
      { label: 'Капитальный ремонт', href: '/uslugi/kapitalnyj-remont' },
      { label: 'Ремонт новостройки', href: '/uslugi/novostroyka' },
      { label: 'Ремонт ванной', href: '/uslugi/remont-vannoj' },
      { label: 'Ремонт кухни', href: '/uslugi/remont-kuhni' },
      { label: 'Дизайнерский ремонт', href: '/#types' },
    ],
  },
  {
    title: 'Количество комнат',
    items: [
      { label: 'Квартира студия', href: '/#lead-end' },
      { label: '1-комнатная квартира', href: '/#lead-end' },
      { label: '2-комнатная квартира', href: '/#lead-end' },
      { label: '3-комнатная квартира', href: '/#lead-end' },
      { label: '4-комнатная квартира', href: '/#lead-end' },
    ],
  },
  {
    title: 'Тип помещения',
    items: [
      { label: 'Кухня', href: '/uslugi/remont-kuhni' },
      { label: 'Ванная', href: '/uslugi/remont-vannoj' },
      { label: 'Гостиная', href: '/#lead-end' },
      { label: 'Туалет', href: '/#lead-end' },
      { label: 'Спальня', href: '/#lead-end' },
      { label: 'Детская', href: '/#lead-end' },
      { label: 'Прихожая', href: '/#lead-end' },
      { label: 'Офис', href: '/#lead-end' },
    ],
  },
  {
    title: 'Тип квартиры',
    items: [
      { label: 'Новостройка', href: '/uslugi/novostroyka' },
      { label: 'Вторичка', href: '/uslugi/vtorichka' },
      { label: 'Панельный дом', href: '/#lead-end' },
      { label: 'Кирпичный дом', href: '/#lead-end' },
      { label: 'Хрущевка', href: '/#lead-end' },
    ],
  },
]

const workMenu = [
  {
    title: 'Стены',
    items: ['Штукатурка стен', 'Шпатлевка стен', 'Покраска стен', 'Поклейка обоев', 'Плитка на стену'],
  },
  {
    title: 'Пол',
    items: ['Стяжка пола', 'Укладка плитки', 'Укладка ламината', 'Гидроизоляция', 'Теплый пол'],
  },
  {
    title: 'Потолок',
    items: ['Натяжной потолок', 'Покраска потолка', 'Шпатлевка потолка', 'Подвесной потолок'],
  },
  {
    title: 'Инженерия',
    items: ['Сантехника', 'Электрика', 'Демонтаж', 'Монтаж оборудования'],
  },
]

const navItems = [
  { label: 'Портфолио', href: '/#cases' },
  { label: 'Цены', href: '/#estimate' },
  { label: 'Скидки и акции', href: '/#lead-end' },
  { label: 'О компании', href: '/#faq' },
  { label: 'Муниципальные объекты', href: '/#cases' },
  { label: 'Контакты', href: '/#lead-end' },
]

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="logo" to="/" aria-label="BRAVO REMONT">
        <span class="logo-mark">BR</span>
        <span>
          <strong>{{ company.name }}</strong>
          <small>Отделка под ключ • {{ company.city }}</small>
        </span>
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
              <a v-for="item in group.items" :key="item" href="/#lead-end">{{ item }}</a>
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
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <nav id="mobile-menu" class="mobile-nav" :class="{ 'is-open': mobileMenuOpen }">
      <details open>
        <summary>Услуги</summary>
        <div v-for="group in serviceMenu" :key="group.title" class="mobile-nav-group">
          <p>{{ group.title }}</p>
          <a v-for="item in group.items" :key="item.label" :href="item.href" @click="closeMobileMenu">
            {{ item.label }}
          </a>
        </div>
      </details>

      <a v-for="item in navItems.slice(0, 2)" :key="item.label" :href="item.href" @click="closeMobileMenu">
        {{ item.label }}
      </a>

      <details>
        <summary>Виды работ</summary>
        <div v-for="group in workMenu" :key="group.title" class="mobile-nav-group">
          <p>{{ group.title }}</p>
          <a v-for="item in group.items" :key="item" href="/#lead-end" @click="closeMobileMenu">
            {{ item }}
          </a>
        </div>
      </details>

      <a v-for="item in navItems.slice(2)" :key="item.label" :href="item.href" @click="closeMobileMenu">
        {{ item.label }}
      </a>

      <a class="btn btn-primary" href="/#quiz" @click="closeMobileMenu">Рассчитать стоимость</a>
    </nav>
  </header>
</template>
