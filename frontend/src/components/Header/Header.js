import './Header.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
  faSquareInstagram,
  faTiktok,
  faYoutube,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'
// import React, { useContext, useEffect } from 'react'
// import { Context } from '../../utils/Context'
// import { useNavigate } from 'react-router-dom'

 
function Header() {

    return  (
        <div className='header'>
            <nav className='header_nav'>
                <div className='header_nav_menu'>
                    <Link to="/" className='header_nav_menu_item'><h2>accueil</h2></Link>
                    <Link to="/projects" className='header_nav_menu_item'><h2>créations</h2></Link>
                    <Link to="/about" className='header_nav_menu_item'><h2>à propos</h2></Link>
                    <button className='header_nav_menu_item'>contact</button>
                    <Link to="/edit" className='header_nav_menu_item'><p>dashboard</p></Link>
                </div>
                <div className='header_nav_socials'>
                    <a href=''><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href=''><FontAwesomeIcon icon={faSquareInstagram} /></a>
                    <a href=''><FontAwesomeIcon icon={faTiktok} /></a>
                    <a href=''><FontAwesomeIcon icon={faYoutube} /></a>
                    <a href=''><FontAwesomeIcon icon={faLinkedin} /></a>
                </div>
            </nav>
        </div>
    )
}

export default Header