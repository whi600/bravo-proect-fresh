import { company, servicePages, workPages } from '../data/siteData'

const siteUrl = 'https://bravo-proect-fresh.pages.dev'
const defaultImage = `${siteUrl}/og-image.png`

const fallbackSeo = {
  title: 'BR — ремонт квартир под ключ в Перми',
  description:
    'Ремонт квартир под ключ в Перми: понятная смета, контроль качества, реальные сроки и один ответственный канал связи.',
  path: '/',
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value)
  }
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function trimDescription(value) {
  return value.length > 155 ? `${value.slice(0, 152).trim()}...` : value
}

function getSeoForRoute(to) {
  if (to.name === 'about') {
    return {
      title: 'О компании BR — ремонт квартир в Перми',
      description:
        'BR помогает владельцам квартир в Перми пройти ремонт без хаоса: смета, материалы, этапы, прораб и контроль качества.',
      path: '/o-kompanii',
    }
  }

  if (to.name === 'service') {
    const page = servicePages[to.params.slug]

    if (page) {
      return {
        title: `${page.heroTitle} | BR`,
        description: trimDescription(page.heroLead),
        path: `/uslugi/${to.params.slug}`,
      }
    }
  }

  if (to.name === 'work') {
    const page = workPages[to.params.slug]

    if (page) {
      return {
        title: `${page.title} в Перми | BR`,
        description: trimDescription(page.lead || page.description?.[0] || fallbackSeo.description),
        path: `/raboty/${to.params.slug}`,
      }
    }
  }

  return fallbackSeo
}

export function applyRouteSeo(to) {
  const seo = getSeoForRoute(to)
  const url = `${siteUrl}${seo.path}`

  document.title = seo.title

  upsertLink('canonical', url)
  upsertMeta('meta[name="description"]', {
    name: 'description',
    content: seo.description,
  })
  upsertMeta('meta[property="og:title"]', {
    property: 'og:title',
    content: seo.title,
  })
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: seo.description,
  })
  upsertMeta('meta[property="og:url"]', {
    property: 'og:url',
    content: url,
  })
  upsertMeta('meta[property="og:image"]', {
    property: 'og:image',
    content: defaultImage,
  })
  upsertMeta('meta[property="og:image:alt"]', {
    property: 'og:image:alt',
    content: seo.title,
  })
  upsertMeta('meta[name="twitter:title"]', {
    name: 'twitter:title',
    content: seo.title,
  })
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: seo.description,
  })
  upsertMeta('meta[name="twitter:image"]', {
    name: 'twitter:image',
    content: defaultImage,
  })
}

export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'BR',
  url: siteUrl,
  logo: `${siteUrl}/br-logo.png`,
  image: defaultImage,
  telephone: '+79048487714',
  address: {
    '@type': 'PostalAddress',
    addressLocality: company.city,
    streetAddress: 'ул. Ленина, 64, офис 312',
    addressCountry: 'RU',
  },
  areaServed: company.city,
  priceRange: '₽₽',
  description: fallbackSeo.description,
}
