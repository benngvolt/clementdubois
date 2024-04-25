import './Header.scss'
import { Link } from 'react-router-dom'
import { useContext, useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProjectsContext } from '../../utils/ProjectsContext';
import AuthModal from '../AuthModal/AuthModal'
import ContactModal from '../ContactModal/ContactModal';
import ConfirmBox from '../ConfirmBox/ConfirmBox';
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
    const screenWidth = window.innerWidth;
    const [displayContactModal, setdisplayContactModal]= useState(false);
    const { displayHeader, setDisplayHeader, closeHeader, hideHeader, isAuthenticated, setLoggedOut } = useContext(ProjectsContext);
    const location = useLocation();
    
    /*------------------------------
    ----- OUVERTURE CONFIRMBOX -----
    ------------------------------*/
    const [confirmBoxState, setConfirmBoxState] = useState (false);
    /*------------------------------------
    ----- FERMETURE CONFIRMBOX -----
    ------------------------------------*/
    function closeConfirmBox() {
        setConfirmBoxState(false);
    }

    /*-------------------------------------------------------------
    ----- SYSTEME DE SUIVI / OUVERTURE ET FERMETURE DU HEADER -----
    -------------------------------------------------------------*/
    const [isMouseOverHeader, setIsMouseOverHeader] = useState(false); // État pour suivre si la souris est sur le Header
    const scrollMargin = 10;
    
    useEffect(() => {
        // Définissez la marge de défilement ici, par exemple 10 pixels
        const handleScroll = () => {
            if (screenWidth > 991) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (!isMouseOverHeader) { // Vérifier si la souris n'est pas sur le Header
                    setDisplayHeader(scrollTop <= scrollMargin);
                }
            } else {
                setDisplayHeader(false);
            }
        }
        
        const throttleScroll = () => {
            if (screenWidth > 991) {
                let isThrottled = false;
                return () => {
                    if (!isThrottled) {
                        isThrottled = true;
                        requestAnimationFrame(() => {
                            handleScroll();
                            isThrottled = false;
                        })
                    }
                }
            } else if (screenWidth <= 991) {
                setDisplayHeader(false);
            }
        }

        const throttledScroll = throttleScroll();

        window.addEventListener('scroll', throttledScroll);

        return () => {      
            window.removeEventListener('scroll', throttledScroll);
        }

    }, [isMouseOverHeader, location.pathname]); // Ajoutez isMouseOverHeader comme dépendance

    const handleMouseOver = () => {
        if (screenWidth > 991) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop <= scrollMargin) {
                return;
            }
            setIsMouseOverHeader(true); // La souris est sur le Header
            setDisplayHeader(true); // Toujours afficher le Header lorsque survolé
        } else  {
            setDisplayHeader(true);
        }
    };

    const handleMouseLeave = () => {
        if (screenWidth > 991) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop <= scrollMargin) {
                setDisplayHeader(true);
                return;
            }
            setIsMouseOverHeader(false); // La souris n'est plus sur le Header
        } else {
            setIsMouseOverHeader(false);
        }
    };

    /*-------------------------------------------------------
    ----- USE EFFECT POUR ECOUTER EVENEMENT KONAMI CODE -----
    -------------------------------------------------------*/

    useEffect(() => {
        document.addEventListener('keydown', keyHandler, false);
    
        return () => {
          document.removeEventListener('keydown', keyHandler, false);
        };
    }, []);

    /*--------------------------------------------------------
    ----- IMPLÉMENTATION DU KONAMI CODE POUR MODALE AUTH -----
    --------------------------------------------------------*/

    let konamiPattern = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    let current = 0;
    const keyHandler = (event) => {
        if (konamiPattern.indexOf(event.key) < 0 || event.key !== konamiPattern[current])  {
            current = 0;
            return;
        }
        current++;
        if (konamiPattern.length === current) {
            current = 0;
            handleAuthModal();
        }
    }

    /*-------------------------------------------------------
    ----- GESTION OUVERTURE/FERMETURE DE LA MODALE AUTH -----
    -------------------------------------------------------*/

    const [authModalDisplay, setAuthModalDisplay] = useState(false);

    const handleAuthModal = () => {
        setAuthModalDisplay(authModalDisplay === false ? true : false );
    }

    return  (
        <header 
                onMouseLeave={handleMouseLeave}
                onMouseOver={()=>{
                    handleMouseOver()
                }}
                    aria-label='Ouvrir la barre de menu'
                    aria-controls='headerNav' 
                    aria-expanded={displayHeader===false? false : true}className={hideHeader===true?'header header--displayOff' : (displayHeader===true ? 'header header--open':' header header--close')}>
            <button className={displayHeader===true ? 'header_hamburger header_hamburger_desktop header_hamburger--displayOff':'header_hamburger header_hamburger_desktop header_hamburger--displayOn'} >
                <FontAwesomeIcon icon={faBars} className='header_hamburger_icon'/>
            </button>
            <div id="headerNav" className={displayHeader===false ? 'header_nav header_nav--displayOff':'header_nav header_nav--displayOn'} onMouseLeave={()=>closeHeader()}>
                <nav className='header_nav_menu'>
                    <Link aria-label='Accéder à la page Projets' to="/projets" className={location.pathname==='/projects' ? 'header_nav_menu_item header_nav_menu_item--selected':'header_nav_menu_item'}><h2>créations</h2></Link>
                    <Link aria-label='Accéder à la page A Propos' to="/infos" className={location.pathname==='/about' ? 'header_nav_menu_item header_nav_menu_item--selected':'header_nav_menu_item'}><h2>à propos</h2></Link>
                    <button aria-label='Afficher la fenêtre Contact' type='button' className='header_nav_menu_item' onClick={()=>setdisplayContactModal(true)}><h2>contact</h2></button>
                    <Link aria-label='Accéder au tableau de bord' to="/console" className={isAuthenticated === true ? (location.pathname==='/edit' ? 'header_nav_menu_item header_nav_menu_item--selected':'header_nav_menu_item') : 'header_nav_menu_item header_nav_menu_item--displayOff' }><p className='header_nav_menu_item_dashboardNav'>dashboard</p></Link>
                    <button onClick={() => {
                                setConfirmBoxState(true);
                            }}
                            className={isAuthenticated === false ? 'header_nav_menu_item header_nav_menu_item--displayOff' : 'header_nav_menu_item header_nav_menu_item--displayOn'}>
                        <p className='header_nav_menu_item_dashboardNav'>logout</p>
                    </button>
                </nav>
                <button onClick={() => {setDisplayHeader(false)}} className={displayHeader===false ? 'header_hamburger header_hamburger_responsive header_hamburger--displayOff':'header_hamburger header_hamburger_responsive header_hamburger--displayOn'} >
                    <FontAwesomeIcon icon={faBars} className='header_hamburger_icon'/>
                </button>
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
            <div>
                <ConfirmBox
                    affirmativeChoice = {setLoggedOut}
                    attribut = {null}
                    confirmBoxState = {confirmBoxState}
                    negativeChoice = {closeConfirmBox}
                />
            </div>
            <AuthModal handleAuthModal={handleAuthModal} authModalDisplay={authModalDisplay}/>
        </header>
    )
}

export default Header