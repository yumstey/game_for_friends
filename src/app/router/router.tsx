import { Navigate, createBrowserRouter } from 'react-router'
import { ROUTES } from '@/shared/config'
import { AppLoader } from './AppLoader'
import { RootLayout } from './RootLayout'

/**
 * Sahifalar alohida chunk'larga boʻlinib, faqat kerak boʻlganda yuklanadi.
 * Har bir sahifa oʻz slice'ining public API'si (`index.ts`) orqali import qilinadi.
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    HydrateFallback: AppLoader,
    children: [
      {
        path: ROUTES.home,
        lazy: { Component: async () => (await import('@/pages/home')).HomePage },
      },
      {
        path: ROUTES.imposterSetup,
        lazy: {
          Component: async () =>
            (await import('@/pages/imposter-setup')).ImposterSetupPage,
        },
      },
      {
        path: ROUTES.imposterGame,
        lazy: {
          Component: async () => (await import('@/pages/imposter-game')).ImposterGamePage,
        },
      },
      {
        path: ROUTES.mafiaSetup,
        lazy: {
          Component: async () => (await import('@/pages/mafia-setup')).MafiaSetupPage,
        },
      },
      {
        path: ROUTES.mafiaGame,
        lazy: {
          Component: async () => (await import('@/pages/mafia-game')).MafiaGamePage,
        },
      },
      { path: '*', element: <Navigate to={ROUTES.home} replace /> },
    ],
  },
])
