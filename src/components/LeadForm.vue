<script setup>
import { reactive, ref } from 'vue'
import { submitLead } from '../utils/leadSubmit'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  buttonLabel: {
    type: String,
    default: 'Отправить заявку',
  },
  tone: {
    type: String,
    default: 'light',
  },
})

const sent = ref(false)
const sending = ref(false)
const error = ref(false)
const form = reactive({
  name: '',
  phone: '',
  comment: '',
})

async function onSubmit() {
  if (sending.value) return

  sending.value = true
  sent.value = false
  error.value = false

  try {
    await submitLead({
      subject: `Заявка с сайта: ${props.title}`,
      Форма: props.title,
      Имя: form.name,
      Телефон: form.phone,
      Комментарий: form.comment,
      Страница: window.location.href,
    })

    sent.value = true
    form.name = ''
    form.phone = ''
    form.comment = ''
  } catch {
    error.value = true
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section class="lead-form" :class="`tone-${props.tone}`">
    <h3>{{ props.title }}</h3>
    <p v-if="props.subtitle">{{ props.subtitle }}</p>

    <form class="lead-form-grid" @submit.prevent="onSubmit">
      <label>
        <span>Имя</span>
        <input v-model="form.name" type="text" placeholder="Как к вам обращаться" required />
      </label>

      <label>
        <span>Телефон</span>
        <input v-model="form.phone" type="tel" placeholder="+7 (___) ___-__-__" required />
      </label>

      <label class="full-width">
        <span>Комментарий</span>
        <textarea
          v-model="form.comment"
          rows="3"
          placeholder="Коротко о задаче: площадь, тип ремонта, сроки"
        />
      </label>

      <button class="btn btn-primary" type="submit" :disabled="sending">
        {{ sending ? 'Отправляем...' : props.buttonLabel }}
      </button>
      <small>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</small>
    </form>

    <p v-if="sent" class="form-success">
      Заявка отправлена. Свяжемся с вами в течение 20 минут в рабочее время.
    </p>
    <p v-if="error" class="form-error">
      Не удалось отправить заявку. Позвоните нам или попробуйте ещё раз.
    </p>
  </section>
</template>
