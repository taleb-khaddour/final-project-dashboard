import { Fragment } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie'
import classes from './nav.module.css'
import './active.css'

// Impport Icons
import { MdOutlineClass } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { HiTableCells } from 'react-icons/hi2'
import { BiUser } from 'react-icons/bi'
import { FaCreativeCommons, FaList, FaMailBulk, FaProductHunt, FaQuestion, FaUserCheck, FaUserTie } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'

function Sidebar(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['auth'])
  console.log(cookies)

  const logout = () => {
    removeCookie('auth')
    localStorage.clear()
  }

  if (useLocation().pathname === '/') return null

  const authCookie = Cookies.get('auth')
  let isSuper = false
  if (!authCookie) {
  } else {
    try {
      const dataUser = JSON.parse(authCookie)
      console.log(dataUser)
      const token = dataUser.access_token
      isSuper = dataUser.user.isSuperadmin
    } catch (error) {
      console.error('Invalid auth cookie:', authCookie)
    }
  }
  return (
    <Fragment>
      <nav className={classes.sidebar}>
        <div>
          <img
            className={classes.logo}
            src={process.env.PUBLIC_URL + '/Assets/Logo-final.png'}
            alt="SVG Logo"
          />
        </div>

        <div className={classes.bar}>
          <NavLink to={'/menu'}>
            <FaList className={classes.icons} size={25} />
            {/* <b></b>
            <u></u> */}
            <span>Menu</span>
          </NavLink>
          <NavLink to={'/category'}>
            <MdOutlineClass className={classes.icons} size={25} />
            {/* <b></b>
            <u></u> */}
            <span>Category</span>
          </NavLink>
        
          <NavLink to={'/contact'}>
            <FaMailBulk className={classes.icons} size={25} />
            {/* <b></b>
            <u></u> */}
            <span>Contact</span>
          </NavLink>
          <NavLink to={'/suggestion'}>
            <FaQuestion className={classes.icons} size={25} />
            {/* <b></b>
            <u></u> */}
            <span>Suggestion</span>
          </NavLink>

         
        </div>

        <div className={classes.setting}>
          <Link to={'/'} onClick={logout}>
            <HiOutlineLogout size={30} className={classes.logOut} />
            <span>Logout</span>
          </Link>
        </div>
      </nav>
    </Fragment>
  )
}

export default Sidebar
