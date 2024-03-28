import './Header.scss'
import { Link } from 'react-router-dom'
import { useContext, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProjectsContext } from '../../utils/ProjectsContext';
import ContactModal from '../ContactModal/ContactModal';
import {
    faFacebook,
    faSquareInstagram,
    faTiktok,
    faLinkedin
} from '@fortawesome/free-brands-svg-icons'

import {
    faBars
} from '@fortawesome/free-solid-svg-icons'

function Header() {
    
    const [displayContactModal, setdisplayContactModal]= useState(false);
    const { displayHeader, openHeader, closeHeader, hideHeader } = useContext(ProjectsContext);
    const location = useLocation();

    return  (
        <header className={hideHeader===true?'header header--displayOff' : (displayHeader===true ? 'header header--open':' header header--close')}>
            <button className={displayHeader===true ? 'header_hamburger header_hamburger--displayOff':'header_hamburger header_hamburger--displayOn'} 
                    onMouseOver={()=>openHeader()}
                    aria-label='Ouvrir la barre de menu'
                    aria-controls='headerNav' 
                    aria-expanded={displayHeader===false? false : true}>
                <FontAwesomeIcon icon={faBars} className='header_hamburger_icon'/>
            </button>
            <div id="headerNav" className={displayHeader===false ? 'header_nav header_nav--displayOff':'header_nav header_nav--displayOn'} onMouseLeave={()=>closeHeader()}>
                <nav className='header_nav_menu'>
                    <Link aria-label='Accéder à la page Projets' to="/projects" className={location.pathname==='/projects' ? 'header_nav_menu_item header_nav_menu_item--selected':'header_nav_menu_item'}><h2>créations</h2></Link>
                    <Link aria-label='Accéder à la page A Propos' to="/about" className={location.pathname==='/about' ? 'header_nav_menu_item header_nav_menu_item--selected':'header_nav_menu_item'}><h2>à propos</h2></Link>
                    <button aria-label='Afficher la fenêtre Contact' type='button' className='header_nav_menu_item' onClick={()=>setdisplayContactModal(true)}><h2>contact</h2></button>
                    <Link aria-label='Accéder au tableau de bord' to="/edit" className={location.pathname==='/edit' ? 'header_nav_menu_item header_nav_menu_item--selected':'header_nav_menu_item'}><p>dashboard</p></Link>
                </nav>
                <nav className='header_nav_socials'>
                    <a aria-label='Accéder à la page Facebook de Clément Dubois' href='https://www.facebook.com/clementduboisscenographe' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a aria-label='Accéder à la page Instagram de Clément Dubois' href='https://www.instagram.com/duboisscenographe/' target="_blank" rel='noreferrer'><FontAwesomeIcon icon={faSquareInstagram} target="_blank" rel='noreferrer' /></a>
                    <a aria-label='Accéder à la page Tiktok de Clément Dubois' href='' target="_blank" rel='noreferrer'><FontAwesomeIcon icon={faTiktok} /></a>
                    <a aria-label='Accéder à la page LinnkedIn de Clément Dubois' href='https://www.linkedin.com/in/clément-dubois-scenographe' target="_blank" rel='noreferrer'><FontAwesomeIcon icon={faLinkedin} /></a>
                </nav>
            </div>
            <section className={displayContactModal===true ? 'header_contactModal header_contactModal--open':' header_contactModal header_contactModal--close'}>
                < ContactModal setdisplayContactModal={setdisplayContactModal}/>
            </section>
        </header>
    )
}

export default Header