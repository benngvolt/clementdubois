import './Header.scss'
import { Link } from 'react-router-dom'
// import React, { useContext, useEffect } from 'react'
// import { Context } from '../../utils/Context'
// import { useNavigate } from 'react-router-dom'

 
function Header() {

    return  (
        <section className='header'>
            <p>Header</p>
            <nav className='header_nav'>
                <div className='header_nav_menu'>
                    <Link to="/" className='header_nav_menu_item'><h2>ACCUEIL</h2></Link>
                    <Link to="/about" className='header_nav_menu_item'><h2>À PROPOS</h2></Link>
                    <Link to="/projets" className='header_nav_menu_item'><h2>PROJETS</h2></Link>
                    <button className='header_nav_menu_item'>CONTACT</button>
                    <Link to="/edit" className='header_nav_menu_item'><p>EDIT</p></Link>
                </div>
            </nav>
        </section>
    )
}

export default Header