import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import logo from '../../assets/images/logo.png'
import icon1 from '../../assets/images/i1.png'
import icon2 from '../../assets/images/i2.png'
import icon3 from '../../assets/images/i3.png'
const Navbar: React.FC<any> = () => {
  const [navbarClose, setNavbarClose] = useState(false)
  const handleCollapse = () => {
    setNavbarClose(!navbarClose)
  }
  const navigate = useNavigate()

  const logout = async () => {
    try {
      handleCollapse()
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      navigate('/')
      window.location.reload()
    } catch (err) {
      console.log('user')
    }
  }
  return (
    <nav className="navbar navbar-expand-lg  mainNavbar ">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {' '}
          <img src={logo} width="90" height="90" alt="" />
        </Link>
        <button
          className="navbar-toggler customToggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={
            navbarClose
              ? 'collapse navbar-collapse show'
              : 'collapse navbar-collapse  '
          }
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link ms-5  " onClick={handleCollapse}>
                <div className="text-lg-center ">
                  <img src={icon1} width="30" height="30" alt="" />
                </div>
                Attendence{' '}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/history"
                className="nav-link   ms-5"
                onClick={handleCollapse}
              >
                <div className="text-lg-center">
                  <img src={icon2} width="30" height="30" alt="" />
                </div>
                History
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link   ms-5" onClick={logout}>
                <div className="text-lg-center">
                  <img src={icon3} width="30" height="30" alt="" />
                </div>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
