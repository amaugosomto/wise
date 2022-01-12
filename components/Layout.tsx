import React from 'react'
import Header from './Header'
import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>Wise App</title>
        <meta name="description" content="Wise App Sample App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>{ children }</main>
    </div>
  )
}
