import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

function NewTransaction() {
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
          <form className="mt-8 space-y-6" action="#" method="POST">
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
                  // value={formValues.email}
                  // onChange={(e) => setFormValues({ ...formValues, email: e.target.value }) }
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
                  // value={formValues.password}
                  // onChange={(e) => setFormValues({ ...formValues, password: e.target.value }) }
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                // disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
                  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {/* { !loading ? 'Sign in' : 'Loading...'} */}
                Loading
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewTransaction
