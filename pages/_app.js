import 'normalize.css'
import '@/styles/globals.css'
import { useEffect } from 'react'
import { OrderProvider } from '../context/OrderContext'
import { CartProvider } from '../context/CartContext'

import { ThemeContextProvider } from '@/contexts/theme-context'
import { AuthContextProvider } from '@/contexts/auth-context'
import DefaultLayout from '@/components/layout/default-layout'
import { ThemeProvider } from '@/hooks/use-theme'
import { AuthProvider } from '@/hooks/use-auth'
// import { CartProvider2 } from '@/hooks/use-cart'
//預設排版
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <AuthProvider>
          <ThemeProvider>
            <CartProvider>
              <OrderProvider>
                {getLayout(<Component {...pageProps} />)}
              </OrderProvider>
            </CartProvider>
          </ThemeProvider>
        </AuthProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  )
}
