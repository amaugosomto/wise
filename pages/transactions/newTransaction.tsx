import React, {useState, useEffect, FormEvent} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Wallet from '../../components/Wallet'
import { useContextState } from '../../AppContext'
import { NewTransactionForm, Status } from '../../utils'
import { useRouter } from 'next/router'
import { useToasts } from "react-toast-notifications";

function NewTransaction() {
  const router = useRouter();
  const { state } = useContextState();
  const { addToast } = useToasts();

  const [formValues, setFormValues] = useState<NewTransactionForm>({
    user: '',
    currency: '',
    amount: 0,
    loading: false
  });
  const [users, setUsers] = useState<{fullName: string, id: string}[] | []>([]);

  useEffect(() => {
    function getUsers() {
      fetch('/api/users', {
        method: 'GET',
        headers: {
          'Authorization': state.user ? state.user.id : ''
        }
      }).then(res => {
        return res.json()
      }).then(data => {
        setUsers(data)
      })
    }

    let localState = localStorage.getItem('isLoggedIn');
    if (!localState) router.push('/');

    state.isLoggedIn && getUsers()
  }, [router, state]);

  function sendTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formValues.user == '') return addToast("Please select a User!", {appearance: 'error'});
    if (formValues.currency == '') return addToast("Please select a Currency!", {appearance: 'error'});
    if (formValues.amount < 1) return addToast("Please enter an Amount!", {appearance: 'error'});

    setFormValues({...formValues, loading: true});

    let wallet = state.wallets.find(wallet => wallet.currencyId == formValues.currency);
    if (wallet) {
      let difference = wallet.amount - formValues.amount;
      if (difference < 0) {
        setFormValues({...formValues, loading: false});
        return addToast("The money you are tyring to send is bigger than what is in your wallet!", {appearance: 'error'})
      }

      let transactionData = {
        statusId: Status.Pending,
        amount: formValues.amount,
        sentCurrencyId: Number.parseInt(formValues.currency),
        sentById: state.user?.id,
        sentWalletId: wallet.id,
        receivedById: formValues.user
      }

      fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(transactionData)
      }).then(res => {
        if (res.ok) {
          let message = `You successfully sent ${formValues.amount} ${wallet?.currency.name}`
          addToast(message, {appearance: 'success'})
          router.push('/transactions')
        } else {
          addToast('Could not send money', {appearance: 'error'})
        }
      })
    }
  }

  return (
    <div className="container mx-auto px-4 mt-10">
      <Head>
        <title>Wise App - New Transaction</title>
        <meta name="description" content="Wise App Sample App Login Page" />
      </Head>

      <div className="flex flex-col">
        <Wallet />
      </div>

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="text-center">
              <Image
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
                width={50}
                height={50}
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Initiate a new Transaction</h2>
          </div>
          <form className="mt-8 space-y-6" action="#" onSubmit={e => sendTransaction(e)} method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-2">
                <div className="mb-3 w-full">
                  <select 
                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white
                      bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 
                      focus:bg-white focus:border-blue-600 focus:outline-none" 
                    aria-label="Default select example"
                    value={formValues.user}
                    onChange={e => setFormValues({...formValues, user: e.target.value})}
                  >
                    <option selected>Select User</option>
                    {
                      users.map(user => (
                        <option value={user.id} key={user.id}>{user.fullName}</option>
                      ))  
                    }
                  </select>
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2">
                  <select 
                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white
                      bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 
                      focus:bg-white focus:border-blue-600 focus:outline-none" 
                    aria-label="Default select example"
                    value={formValues.currency}
                    onChange={e => setFormValues({...formValues, currency: e.target.value})}
                  >
                    <option selected>Select Wallet</option>
                    <option value="1">USD Wallet</option>
                    <option value="2">EUR Wallet</option>
                    <option value="3">NGN Wallet</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label htmlFor="amount" className="sr-only">
                    Amount
                  </label>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Amount"
                    value={formValues.amount}
                    onChange={e => setFormValues({...formValues, amount: Number.parseInt(e.target.value)})}
                  />
                </div>
                
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={formValues.loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
                  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                { !formValues.loading ? 'Send money' : 'Loading...'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewTransaction
