import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AttendanceHistory from './components/attendanceHistory/attendanceHistory'
import AttendaceScreen from './components/attendanceScreen/attendanceScreen'

import Authentication from './components/login/login'
import Navbar from './components/navbar/navbar'
import { useAppSelector } from './redux/store'

import './App.css'
function App() {
  const [user, setUser] = React.useState(localStorage.getItem('user'))

  const { email } = useAppSelector((state) => state.auth)

  useEffect(() => {}, [email])

  return (
    <BrowserRouter>
      <div className="bgImg">
        {user || email ? <Navbar /> : null}
        <Routes>
          {user || email ? (
            <React.Fragment>
              <Route path="/" element={<AttendaceScreen />} />
              <Route path="/history" element={<AttendanceHistory />} />
            </React.Fragment>
          ) : (
            <Route path="/" element={<Authentication />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
