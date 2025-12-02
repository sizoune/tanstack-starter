import { useTranslation } from 'react-i18next'
import { AppLayout } from '@/layouts/AppLayout/AppLayout'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <div className="flex h-full w-full items-center justify-center">{t('Not Found')}</div>
    </AppLayout>
  )
}

export { NotFound }
