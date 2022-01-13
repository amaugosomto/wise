import React, { FormEvent } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Head from 'next/head'
import { useContextState } from '../AppContext'
import { IHomeProps } from '../utils/types'
import { useRouter } from 'next/router'

function Login({ updateState, loading }: IHomeProps) {
  const { setIsLoggedIn} = useContextState();
  const router = useRouter();

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateState({ loading : true });

    setTimeout(() => {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      updateState({ loading : false });
      router.push('/dashboard');
    }, 1500);
  }

  return (
    <div>
      <Head>
        <title>Wise App - Login</title>
        <meta name="description" content="Wise App Sample App Login Page" />
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" onSubmit={e => login(e)} method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">

            <div className="text-sm">
              Don{"'"}t have an account? {' '}
              <a href="#" onClick={() => updateState({ isLogin : false })} className="font-medium text-indigo-600 hover:text-indigo-500">
                Register
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
              { !loading ? 'Sign in' : 'Loading...'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login
