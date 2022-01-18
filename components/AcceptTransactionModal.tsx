import react, { Fragment, useRef, Dispatch, SetStateAction, useState, ChangeEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { AcceptTransactionPropsType, Currency } from '../utils'
import { useToasts } from "react-toast-notifications";

const defaultProps = {
  currency: '0',
  amount: 0,
  rate: 1
}

function AcceptTransactionModal({
  state,
  changeState,
  acceptTransaction,
  rejectTransaction
}: {
  state: AcceptTransactionPropsType,
  changeState: Dispatch<SetStateAction<AcceptTransactionPropsType>>,
  acceptTransaction: (data: {currency: number, rate: number}) => void
  rejectTransaction: (data: {walletId: string, amount: number}) => void
}) {
  const [formValues, setFormValues] = useState({...defaultProps})
  const cancelButtonRef = useRef(null)
  const { addToast } = useToasts();

  function closeModal() {
    changeState({
      ...state,
      open: false
    })
  }

  function computeConversion(e: ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    let value = e.target.value;

    setFormValues({...formValues, currency: value})
    let toCurrency = Currency[Number.parseInt(value)];
    let fromCurrency = state.currency;
    let query = fromCurrency + '_' + toCurrency;
    let apiKey = '450b218e309c2985a7a2'

    let url = 'https://free.currconv.com/api/v7/convert?q=' + query + '&compact=ultra&apiKey=' + apiKey;

    fetch(url, {
      method: 'GET'
    }).then(res => {
      if (!res.status) {
        addToast('Couldn"t convert money to desired rate')
        throw new Error("error occured") 
      } 
      return res.json()
    }).then(data => {
      setFormValues({...formValues, amount: Number.parseFloat((data[query] * state.amount).toFixed(2)), rate: data[query], currency: value})
    }).catch(err => {
      console.log({err})
    })

  }

  function accept () {
    acceptTransaction({currency: Number.parseInt(formValues.currency), rate: formValues.rate});
    setFormValues({...defaultProps});
  }

  function reject() {
    rejectTransaction({walletId: state.sentWalletId ? state.sentWalletId : '', amount: state.amount});
    setFormValues({...defaultProps});
  }

  return (
    <Transition.Root show={state.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={closeModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Accept / Reject Transaction
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {state.senderName} wants to send you {state.currency} {state.amount}
                      </p>
                    </div>
                    <div className="flex mt-3">
                      <div className="w-1/2">
                        <select 
                          className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white
                            bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 
                            focus:bg-white focus:border-blue-600 focus:outline-none" 
                          aria-label="Default select example"
                          value={formValues.currency}
                          onChange={e => computeConversion(e)}
                        >
                          <option value="0">Select Wallet</option>
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
                          disabled
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="0"
                          value={formValues.amount}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => reject()}
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => accept()}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => closeModal()}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AcceptTransactionModal
