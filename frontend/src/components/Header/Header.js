import './Header.scss'
import { Link } from 'react-router-dom'
import { useContext, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProjectsContext } from '../../utils/ProjectsContext';
import ContactModal from '../ContactModal/ContactModal';
import {
    faFacebook,
    faSquareInstagram,
    faTiktok,
    faYoutube,
    faLinkedin
} from '@fortawesome/free-brands-svg-icons'

import {
    faBars
} from '@fortawesome/free-solid-svg-icons'

function Header() {
    const [displayContactModal, setdisplayContactModal]= useState(false);
    const { displayHeader, openHeader, closeHeader, hideHeader } = useContext(ProjectsContext);

    return  (
        <header className={hideHeader===true?'header header--displayOff' : (displayHeader===true ? 'header header--open':' header header--close')}>
            <div className={displayHeader===true ? 'header_hamburger header_hamburger--displayOff':'header_hamburger header_hamburger--displayOn'} onMouseOver={()=>openHeader()} >
                <FontAwesomeIcon icon={faBars} className='header_hamburger_icon'/>
            </div>
            <nav className={displayHeader===false ? 'header_nav header_nav--displayOff':'header_nav header_nav--displayOn'} onMouseLeave={()=>closeHeader()}>
                <div className='header_nav_menu'>
                    <Link to="/projects" className='header_nav_menu_item'><p>créations</p></Link>
                    <Link to="/about" className='header_nav_menu_item'><p>à propos</p></Link>
                    <button type='button' className='header_nav_menu_item' onClick={()=>setdisplayContactModal(true)}><p>contact</p></button>
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
            <div className={displayContactModal===true ? 'header_contactModal header_contactModal--open':' header_contactModal header_contactModal--close'}s>
                < ContactModal setdisplayContactModal={setdisplayContactModal}/>
            </div>
        </header>
    )
}

export default Header