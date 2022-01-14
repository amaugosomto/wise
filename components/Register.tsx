import React, { FormEvent, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Head from 'next/head'
import { IHomeProps, UserAccount } from '../utils'
import { useToasts } from "react-toast-notifications";
import { GetServerSideProps } from 'next'
var bcrypt = require('bcryptjs');

function Register({ updateState, loading }: IHomeProps) {
  const { addToast } = useToasts();
  const [formValues, setFormValues] = useState<UserAccount>({
    fullName: '',
    email: '',
    password: ''
  })

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateState({loading: true});

    var salt = bcrypt.genSaltSync(10);

    const dataToSave = {...formValues, password: bcrypt.hashSync(formValues.password, salt)};

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(dataToSave)
      })
      
      if (!response.ok)
        throw new Error(response.statusText === 'Unauthorized' ? 'Email is already in use, please choose another!': response.statusText);
      
      addToast("Successfully registered! Please Login", { appearance: "success" })
      updateState({loading : false, isLogin: true});

    } catch (error: any) {
      addToast(error.message ? error.message : 'An error occured', { appearance: 'error' })
      updateState({loading : false});
    }
    
  }

  return (
    <div>
      <Head>
        <title>Wise App - Register</title>
        <meta name="description" content="Wise App Sample App Register Page" />
      </Head>

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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register an Account</h2>
          </div>
          <form className="mt-8 space-y-6" action="#" onSubmit={e => register(e)} method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Full Name
                </label>
                <input
                  id="full-name"
                  name="fullname"
                  type="text"
                  autoComplete="full-name"
                  value={formValues.fullName}
                  onChange={(e) => setFormValues({ ...formValues, fullName: e.target.value }) }
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formValues.email}
                  onChange={(e) => setFormValues({ ...formValues, email: e.target.value }) }
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formValues.password}
                  onChange={(e) => setFormValues({ ...formValues, password: e.target.value }) }
                  min={5}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">

              <div className="text-sm">
                Already have an account? {' '}
                <a href="#" onClick={() => updateState({ isLogin : true })} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Login
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm 
                  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {loading ? 'Loading...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  return {
    props: {},
  }
}