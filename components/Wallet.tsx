import React, { useEffect, useState } from 'react'
import { useContextState } from '../AppContext'
import { WalletView } from '../utils';

function Wallet() {
  const { state, setWallets } = useContextState();
  const [wallets, setLocalWallet] = useState<WalletView[] | []>([]);

  useEffect(() => {
    function fetchWallets () {
      fetch('/api/wallet', {
        method: 'GET',
        headers: {
          'Authorization': state.user ? state.user.id : ''
        }
      }).then(res => {
        return res.json()
      }).then(data => {
        setLocalWallet(data);
        setWallets(data);
      })
    }

    if (state.isLoggedIn) {
      if (state.wallets.length < 1) {
        fetchWallets()
      }
    }
  }, [setWallets, state, wallets])

  return (
    <div className="flex justify-end">
      {
        state.wallets.map(wallet => (
          <div className="shadow-lg p-4 rounded" key={wallet.id}>
            <div className="flex text-md font-bold">
              <p className="mr-1 text-blue-400" >{wallet.currency.name} </p> :
              <span className="text-gray-500 ml-1">{wallet.amount}</span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Wallet
