<script setup>
import { company } from '../data/siteData'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <p class="footer-brand">{{ company.name }}</p>
        <p>Ремонт квартир под ключ в Перми с понятной сметой и контролем качества.</p>
      </div>

      <div>
        <p class="footer-title">Контакты</p>
        <p><a href="tel:+73422479957">{{ company.phone }}</a></p>
        <p>{{ company.address }}</p>
        <p>{{ company.workHours }}</p>
      </div>

      <div>
        <p class="footer-title">Быстрый старт</p>
        <p><a href="/#quiz">Рассчитать стоимость</a></p>
        <p><a href="/#cases">Посмотреть кейсы</a></p>
        <p><a href="/#lead-end">Вызвать замерщика бесплатно</a></p>
      </div>
    </div>
  </footer>
</template>
