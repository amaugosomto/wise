import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useContextState } from '../../AppContext'
import { useRouter } from 'next/router'
import { AcceptTransactionPropsType, Status, TransactionView} from '../../utils'
import Wallet from '../../components/Wallet'
import Link from 'next/link'
import Head from 'next/head'
import { useToasts } from "react-toast-notifications";
import moment from 'moment'
import AcceptTransactionModal from '../../components/AcceptTransactionModal'

const defaultAcceptTransactionProp = {
  open: false,
  senderName: '',
  amount: 0,
  currency: '',
  transactionId: '',
  sentWalletId: ''
}

const Transactions: NextPage = ({}) => {
  const { state, setWallets } = useContextState();
  const router = useRouter();
  const { addToast } = useToasts();
  const [transactions, setTransactions] = useState<TransactionView[] | []>([]);
  const [acceptParams, setAcceptParams] = useState<AcceptTransactionPropsType>({...defaultAcceptTransactionProp});
  
  useEffect(() => {
    let localState = localStorage.getItem('isLoggedIn');
    if (!localState) router.push('/');

    async function getUserData () {
      fetch('/api/transactions', {
        method: 'GET',
        headers: {
          'Authorization': state.user ? state.user.id : ''
        }
      }).then(res => {
        return res.json()
      }).then(data => {
        setTransactions(data)
      })
    }

    state.isLoggedIn && transactions.length < 1 && getUserData();
    
  }, [state, router, transactions])

  function statusClassName(statusId: number) {
    let defaultClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full ';

    statusId === 1 ? defaultClasses += 'bg-blue-100 text-blue-800' :
    statusId === 2 ? defaultClasses += 'bg-green-100 text-green-800':
      defaultClasses += 'bg-red-100 text-red-800'

    return defaultClasses;
  }

  function openAcceptModal(transaction: TransactionView) {
    setAcceptParams({
      ...acceptParams,
      open: true,
      senderName: transaction.sentUser ? transaction.sentUser.fullName : '',
      amount: transaction.amount,
      currency: transaction.sentCurrency.name,
      transactionId: transaction.id,
      sentWalletId: transaction.sentWalletId
    })
  }

  function acceptTransaction ({currency, rate}: { currency: number, rate: number}) {
    let amountToSave = acceptParams.amount * rate;
    let walletId = state.wallets.find(wallet => Number.parseInt(wallet.currencyId) == currency)?.id;

    let dataToSave = {
      amountToSave,
      wallet: walletId,
      currency,
      rate,
      transactionId: acceptParams.transactionId,
      user: state.user?.id
    }

    fetch('/api/acceptTransaction', {
      method: 'POST',
      body: JSON.stringify(dataToSave)
    }).then(res => {
      if (res.ok) {
        addToast('Successfully accepted Transaction', {appearance: 'success'});
        setTransactions([])
        setWallets([])
        return
      }

      throw new Error();
    }).catch(() => {
      addToast('An error occured while trying to accept transaction', {appearance: 'error'});
    }).finally(() => 
      setAcceptParams({...defaultAcceptTransactionProp})
    )
  }

  function rejectTransaction ({walletId, amount}: { walletId: string, amount: number}) {

    let dataToSave = {
      walletId,
      transactionId: acceptParams.transactionId,
      amountToSave: amount
    }

    fetch('/api/rejectTransaction', {
      method: 'POST',
      body: JSON.stringify(dataToSave)
    }).then(res => {
      if (res.ok) {
        addToast('Successfully rejected Transaction', {appearance: 'success'});
        setTransactions([])
        return
      }

      throw new Error();
    }).catch(() => {
      addToast('An error occured while trying to reject transaction', {appearance: 'error'});
    }).finally(() => 
      setAcceptParams({...defaultAcceptTransactionProp})
    )
  }

  return (
    <div className="container mx-auto px-4 mt-10">
      <Head>
        <title>Wise App - Transaction</title>
        <meta name="description" content="Wise App Sample App Login Page" />
      </Head>

      <div className="flex flex-col">

        <Wallet />

        <div className="flex justify-between my-5">
          <h2 className="text-3xl font-extrabold text-gray-900">Transactions</h2>
          <Link
            href={'/transactions/newTransaction'}
          >
            <a
              className="group relative py-2 px-4 border border-transparent text-sm
                font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-indigo-500"
            >
              New Transaction
            </a> 
          </Link>
        </div>

        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      To
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Currency (Received)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created_At
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Updated_At
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  { transactions?.map((transaction, i) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{transaction.sentUser?.fullName}</div>
                            <div className="text-sm text-gray-500">{transaction.sentCurrency.name} {transaction.amount}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.receivedUser?.fullName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.receivedCurrency?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.rate && (transaction.amount * transaction.rate).toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{moment(transaction.created_at).format('MMMM Do YYYY, h:mm a')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{moment(transaction.updated_at).format('MMMM Do YYYY, h:mm a')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={statusClassName(transaction.statusId)}>
                          { transaction.statusId == Status.Pending && transaction.status.name }
                          { 
                            transaction.statusId == Status.Received && transaction.sentById == state.user?.id ? 'User Received' :
                            transaction.statusId == Status.Received && transaction.receivedById == state.user?.id ? 'Accepted' : ''
                          }
                          { 
                            transaction.statusId == Status.Rejected && transaction.sentById == state.user?.id ? 'User Rejected' :
                            transaction.statusId == Status.Rejected && transaction.sentById == state.user?.id ? 'Rejected' : ''
                          }
                        </span>
                      </td>
                      {
                        (transaction.statusId == Status.Pending && transaction.receivedById == state.user?.id) && (
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" onClick={() => openAcceptModal(transaction)} className="text-indigo-600 hover:text-indigo-900">
                              Accept
                            </a>
                          </td>
                        )
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AcceptTransactionModal
        state={acceptParams}
        changeState={setAcceptParams}
        acceptTransaction={acceptTransaction}
        rejectTransaction={rejectTransaction}
      />
    </div>
  )
}

export default Transactions
