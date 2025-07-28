import thumd1 from '../assets/blog/thumb_1.png'
import thumd3 from '../assets/blog/thumb_2.png'
import thumd2 from '../assets/blog/thumb_3.png'
import thumd4 from '../assets/blog/thumb_4.png'
import thumd5 from '../assets/blog/thumb_5.png'
import thumd6 from '../assets/blog/thumb_6.png'
import thumd7 from '../assets/blog/thumb_7.png'
import thumd8 from '../assets/blog/thumb_8.png'
import { useTranslation } from 'react-i18next'

export const BlogData = () => {
  const { t } = useTranslation('Blog')
  return [
    {
      id: 1,
      title: t('title1'),
      image: thumd1,
      content: t('content1'),
      path: 'Why-Choose-ViserBus',
      date: '2023-10-01'
    },
    {
      id: 2,
      title: t('title2'),
      image: thumd2,
      content: t('content2'),
      path: 'Top-10-Tips-for-Stress-Free-Bus-Travel',
      date: '2023-10-01'
    },
    {
      id: 3,
      title: t('title3'),
      image: thumd3,
      content: t('content3'),
      path: 'How-to-Book-Bus-Tickets-Online'
    },
    {
      id: 4,
      title: t('title4'),
      image: thumd4,
      content: t('content4'),
      path: 'Exploring-the-Benefits-of-Online-Bus-Ticket-Booking',
      date: '2023-10-01'
    },
    {
      id: 5,
      title: t('title5'),
      image: thumd5,
      content: t('content5'),
      path: 'The-Future-of-Bus-Travel',
      date: '2023-10-01'
    },
    {
      id: 6,
      title: t('title6'),
      image: thumd6,
      content: t('content6'),
      path: 'How-to-Choose-the-Right-Bus-Service-for-Your-Journey',
      date: '2023-10-01'
    },
    {
      id: 7,
      title: t('title7'),
      image: thumd7,
      content: t('content7'),
      path: 'The-Ultimate-Guide-to-Bus-Travel-Etiquette',
      date: '2023-10-01'
    },
    {
      id: 8,
      title: t('title8'),
      image: thumd8,
      content: t('content8'),
      path: 'Exploring-Scenic-Routes',
      date: '2023-10-01'
    }
  ]
}
