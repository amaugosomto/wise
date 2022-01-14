import {useState, useEffect} from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { AppContext } from '../AppContext'
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    isLoggedIn && setIsLoggedIn(true);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={3000}>
      <AppContext.Provider
        value={{
          state: {isLoggedIn},
          setIsLoggedIn,
          logout
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </ToastProvider>
  )
}

export default MyApp
