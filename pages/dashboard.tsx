import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useContextState } from '../AppContext'
import { useRouter } from 'next/router'

const dashboard: NextPage = ({}) => {
  const { state } = useContextState();
  const router = useRouter();

  useEffect(() => {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    !isLoggedIn && router.push('/');
  }, [state, router])

  return (
    <div>
      
    </div>
  )
}

export default dashboard
