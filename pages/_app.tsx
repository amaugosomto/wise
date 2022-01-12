import {useState} from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { AppContext } from '../AppContext'

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{
        state: {isLoggedIn},
        setIsLoggedIn
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )
}

export default MyApp
