import { useTranslation } from 'react-i18next'

export const useLocation = () => {
  const { t } = useTranslation('Home')
  return {
    diemDi: [
      { id: 0, name: t('Home_location.All') },
      { id: 1, name: t('Home_location.Ha Noi') },
      { id: 2, name: t('Home_location.Ho Chi Minh') },
      { id: 3, name: t('Home_location.Da Nang') },
      { id: 4, name: t('Home_location.Nha Trang') },
      { id: 5, name: t('Home_location.Hue') },
      { id: 6, name: t('Home_location.Can Tho') },
      { id: 7, name: t('Home_location.Vung Tau') },
      { id: 8, name: t('Home_location.Phu Quoc') },
      { id: 9, name: t('Home_location.Da Lat') },
      { id: 10, name: t('Home_location.Quy Nhon') },
      { id: 11, name: t('Home_location.Hai Phong') }
    ],
    diemDen: [
      { id: 0, name: t('Home_location.All') },
      { id: 1, name: t('Home_location.Ha Noi') },
      { id: 2, name: t('Home_location.Ho Chi Minh') },
      { id: 3, name: t('Home_location.Da Nang') },
      { id: 4, name: t('Home_location.Nha Trang') },
      { id: 5, name: t('Home_location.Hue') },
      { id: 6, name: t('Home_location.Can Tho') },
      { id: 7, name: t('Home_location.Vung Tau') },
      { id: 8, name: t('Home_location.Phu Quoc') },
      { id: 9, name: t('Home_location.Da Lat') },
      { id: 10, name: t('Home_location.Quy Nhon') },
      { id: 11, name: t('Home_location.Hai Phong') }
    ]
  }
}
