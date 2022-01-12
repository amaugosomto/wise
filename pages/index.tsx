import {useState} from 'react'
import type { NextPage } from 'next'
import Login from '../components/Login'
import Register from '../components/Register'

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      { isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} /> }
    </div>
  )
}

export default Home
