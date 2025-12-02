import { useTranslation } from 'react-i18next'
import { AppLayout } from '@/layouts/AppLayout/AppLayout'

const ErrorBoundary = () => {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <div className="flex h-full w-full items-center justify-center">{t('An Error Occurred')}</div>
    </AppLayout>
  )
}

export { ErrorBoundary }
