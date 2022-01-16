import {useState, useEffect} from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { AppContext } from '../AppContext'
import { ToastProvider } from "react-toast-notifications";
import { UserModel } from '../utils'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      let userDetails: UserModel = JSON.parse(isLoggedIn);
      setIsLoggedIn(true);
      setUser(userDetails);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserModel | undefined>(undefined);

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={3000}>
      <AppContext.Provider
        value={{
          state: {
            isLoggedIn,
            user
          },
          setIsLoggedIn,
          setUser,
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
