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
// user
import USER_DASHBOARD_EN from '../locales/en/features/user/Dashboard.json'
import USER_INFORMATION_EN from '../locales/en/features/user/Page/Information.json'
import USER_CHANGEPASSWORD_EN from '../locales/en/features/user/Page/Changepassword.json'
import USER_BOOKING_HISTORY_EN from '../locales/en/features/user/Page/Bookinghistory.json'
import USER_PROSETING_EN from '../locales/en/features/user/Page/ProfileSetting.json'
import USER_SUPPORT_TICKET_CREATE_NEW_EN from '../locales/en/features/user/Page/Support/Ticketcreatenew.json'
import USER_SUPPORT_CHAT_EN from '../locales/en/features/user/Page/Support/ChatSupport.json'
import USER_SUPPORT_TICKET_EN from '../locales/en/features/user/Page/Support/Support_Ticket.json'
import USER_LIST_SUPPORT_EN from '../locales/en/features/user/Page/Support/Listchat.json'

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
// user
import USER_DASHBOARD_VI from '../locales/vi/features/user/Dashboard.json'
import USER_INFORMATION_VI from '../locales/vi/features/user/Page/Information.json'
import USER_CHANGEPASSWORD_VI from '../locales/vi/features/user/Page/Changepassword.json'
import USER_BOOKING_HISTORY_VI from '../locales/vi/features/user/Page/Bookinghistory.json'
import USER_PROSETING_VI from '../locales/vi/features/user/Page/ProfileSetting.json'
import USER_SUPPORT_TICKET_CREATE_NEW_VI from '../locales/vi/features/user/Page/Support/Ticketcreatenew.json'
import USER_SUPPORT_CHAT_VI from '../locales/vi/features/user/Page/Support/ChatSupport.json'
import USER_SUPPORT_TICKET_VI from '../locales/vi/features/user/Page/Support/Support_Ticket.json'
import USER_LIST_SUPPORT_VI from '../locales/vi/features/user/Page/Support/Listchat.json'

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
    Buyticket: BUYTICKET_EN,
    // user
    Dashboard: USER_DASHBOARD_EN,
    Information: USER_INFORMATION_EN,
    Changepassword: USER_CHANGEPASSWORD_EN,
    Bookinghistory: USER_BOOKING_HISTORY_EN,
    ProfileSetting: USER_PROSETING_EN,
    SupportTicketCreateNew: USER_SUPPORT_TICKET_CREATE_NEW_EN,
    ChatSupport: USER_SUPPORT_CHAT_EN,
    SupportTicket: USER_SUPPORT_TICKET_EN,
    ListSupport: USER_LIST_SUPPORT_EN
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
    Buyticket: BUYTICKET_VI,
    // user
    Dashboard: USER_DASHBOARD_VI,
    Information: USER_INFORMATION_VI,
    Changepassword: USER_CHANGEPASSWORD_VI,
    Bookinghistory: USER_BOOKING_HISTORY_VI,
    ProfileSetting: USER_PROSETING_VI,
    SupportTicketCreateNew: USER_SUPPORT_TICKET_CREATE_NEW_VI,
    ChatSupport: USER_SUPPORT_CHAT_VI,
    SupportTicket: USER_SUPPORT_TICKET_VI,
    ListSupport: USER_LIST_SUPPORT_VI
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
