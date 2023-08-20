import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import Layout from '@/components/layout'
import { IntlProvider } from 'react-intl'
import ar from "../locales/ar.json"
import en from "../locales/en.json"
import { useRouter } from 'next/router'
import Head from 'next/head'

const messages : any = {en, ar}

function App({ Component, pageProps }: AppProps) {
  const { locale } :any= useRouter();


  return (
    <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&family=Reem+Kufi+Fun&display=swap" rel="stylesheet" />
    </Head>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Layout>
          <Component {...pageProps} />
      </Layout> 
    </IntlProvider>
    </>

  )
}

export default appWithTranslation(App);