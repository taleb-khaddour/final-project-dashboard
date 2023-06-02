import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './page/Login/login.js'
import PrivateRoutes from './page/util/provideRoute'
import Dashboard from './page/dashboard/dashboard'
import Nav from './page/Sidebar/nav.js'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import NotFound from './components/404/404notFound/notfound.js'
import Menu from '../src/components/menu/menu.js'
import Container from './page/container/container.js'

function App() {
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const authToken = Cookies.get('token')
    if (authToken) {
      setToken(authToken)
      setIsLoggedIn(true)
    }
    let tkn = localStorage.getItem('token')
    tkn ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {isLoggedIn && (
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Container />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu" element={<Menu />} />
            </Route>
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
