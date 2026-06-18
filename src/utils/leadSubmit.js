export const leadRecipientEmail = 'vk@bravo-remont.ru'

const leadEndpoint = `https://formsubmit.co/ajax/${leadRecipientEmail}`

export async function submitLead(payload) {
  const formData = new FormData()

  formData.append('_subject', payload.subject || 'Новая заявка с сайта BRAVO REMONT')
  formData.append('_template', 'table')
  formData.append('_captcha', 'false')
  formData.append('Получатель', leadRecipientEmail)

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null || value === '') continue
    if (key === 'subject') continue

    formData.append(key, Array.isArray(value) ? value.join('\n') : String(value))
  }

  const response = await fetch(leadEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Lead submit failed with status ${response.status}`)
  }

  return response.json()
}
