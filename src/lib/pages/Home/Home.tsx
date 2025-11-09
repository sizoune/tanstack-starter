import { useTranslation } from 'react-i18next'
import { AppLayout } from '@/layouts/AppLayout/AppLayout'
import { Route as RootRoute } from '@/routes/__root'

const Home = () => {
  const { t } = useTranslation()
  const { user } = RootRoute.useRouteContext()

  return (
    <AppLayout>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="mb-3 font-black text-2xl">🏝️ {user ? `${t('Welcome')}, ${user.name}!` : t('Hello!')} 🏝️</h1>
      </div>
    </AppLayout>
  )
}

export { Home }
