import {useState} from 'react'
import type { NextPage } from 'next'
import Login from '../components/Login'
import Register from '../components/Register'
import { HomeStateType } from '../utils'

const Home: NextPage = () => {
  const [indexState, setIndexState] = useState<HomeStateType>({
    isLogin: true,
    loading: false
  });

  const updateState = (key: string, value: boolean) => {
    setIndexState({ ...indexState, [key]: value });
  }

  return (
    <div>
      { 
        indexState.isLogin ?
          <Login isLogin={indexState.isLogin} loading={indexState.loading} updateState={updateState} /> :
          <Register isLogin={indexState.isLogin} loading={indexState.loading} updateState={updateState} /> }
    </div>
  )
}

export default Home
