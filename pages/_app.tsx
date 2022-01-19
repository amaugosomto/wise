import {useState, useEffect} from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { AppContext } from '../AppContext'
import { ToastProvider } from "react-toast-notifications";
import { UserModel, WalletView } from '../utils'

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
  const [wallets, setWallets] = useState<WalletView[] | []>([]);

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setUser(undefined);
    setWallets([]);
  }

  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={3000}>
      <AppContext.Provider
        value={{
          state: {
            isLoggedIn,
            user,
            wallets
          },
          setIsLoggedIn,
          setUser,
          logout,
          setWallets
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
