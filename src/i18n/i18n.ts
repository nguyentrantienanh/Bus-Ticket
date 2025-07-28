import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HEADER_EN from '../locales/en/Header.json'
import FOOTER_EN from '../locales/en/Footer.json'
import HOME_EN from '../locales/en/Page/Home.json'
import ABOUT_EN from '../locales/en/Page/About.json'
import FAQ_EN from '../locales/en/Page/Faq.json'
import BLOG_EN from '../locales/en/Page/Blog/Blog.json'
import CONTENT_EN from '../locales/en/Page/Blog/Content.json'
import CONTACT_EN from '../locales/en/Page/Contact.json'
import POLICIES_EN from '../locales/en/Page/Policies.json'
import BUYTICKET_EN from '../locales/en/Page/Buytickets.json'

import HEADER_VI from '../locales/vi/Header.json'
import FOOTER_VI from '../locales/vi/Footer.json'
import HOME_VI from '../locales/vi/Page/Home.json'
import ABOUT_VI from '../locales/vi/Page/About.json'
import FAQ_VI from '../locales/vi/Page/Faq.json'
import BLOG_VI from '../locales/vi/Page/Blog/Blog.json'
import CONTENT_VI from '../locales/vi/Page/Blog/Content.json'
import CONTACT_VI from '../locales/vi/Page/Contact.json'
import POLICIES_VI from '../locales/vi/Page/Policies.json'
import BUYTICKET_VI from '../locales/vi/Page/Buytickets.json'
export const languages = {
  en: 'English',
  vi: 'Tiếng Việt'
}

export const resources = {
  en: {
    Header: HEADER_EN,
    Footer: FOOTER_EN,
    Home: HOME_EN,
    About: ABOUT_EN,
    Faq: FAQ_EN,
    Blog: BLOG_EN,
    Content: CONTENT_EN,
    Contact: CONTACT_EN,
    Policies: POLICIES_EN,
    Buyticket: BUYTICKET_EN
  },
  vi: {
    Header: HEADER_VI,
    Footer: FOOTER_VI,
    Home: HOME_VI,
    About: ABOUT_VI,
    Faq: FAQ_VI,
    Blog: BLOG_VI,
    Content: CONTENT_VI,
    Contact: CONTACT_VI,
    Policies: POLICIES_VI,
    Buyticket: BUYTICKET_VI
  }
}
export const defaultNS = 'Header'
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi', // default language
    ns: ['Home'], // namespaces to load
    defaultNS,
    fallbackLng: 'vi', // fallback language
    interpolation: {
      escapeValue: false // react already does escaping
    }
  })
