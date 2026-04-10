import './Header.scss'
import { Link, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react';
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
    const location = useLocation();

    const [displayContactModal, setdisplayContactModal] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

    const {
        displayHeader,
        setDisplayHeader,
        hideHeader,
        isAuthenticated,
        setLoggedOut
    } = useContext(ProjectsContext);

    const [confirmBoxState, setConfirmBoxState] = useState(false);
    const [authModalDisplay, setAuthModalDisplay] = useState(false);

    function closeConfirmBox() {
        setConfirmBoxState(false);
    }

    const handleAuthModal = () => {
        setAuthModalDisplay((prev) => !prev);
    };
    const handleGoTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        if (isMobile) {
            setDisplayHeader(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 991;
            setIsMobile(mobile);

            if (mobile) {
                setDisplayHeader(false);
            } else {
                setDisplayHeader(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setDisplayHeader]);

    // Sécurité : en desktop, le header doit toujours rester ouvert
    useEffect(() => {
        if (!isMobile && displayHeader === false) {
            setDisplayHeader(true);
        }
    }, [isMobile, displayHeader, setDisplayHeader]);

    useEffect(() => {
        const konamiPattern = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ];

        let current = 0;

        const keyHandler = (event) => {
            if (
                konamiPattern.indexOf(event.key) < 0 ||
                event.key !== konamiPattern[current]
            ) {
                current = 0;
                return;
            }

            current++;

            if (konamiPattern.length === current) {
                current = 0;
                handleAuthModal();
            }
        };

        document.addEventListener('keydown', keyHandler, false);

        return () => {
            document.removeEventListener('keydown', keyHandler, false);
        };
    }, []);

    // Fermeture au scroll uniquement sur mobile
    useEffect(() => {
        const handleScrollMobile = () => {
            if (window.innerWidth <= 991) {
                setDisplayHeader(false);
            }
        };

        window.addEventListener('scroll', handleScrollMobile);

        return () => {
            window.removeEventListener('scroll', handleScrollMobile);
        };
    }, [setDisplayHeader]);

    const handleToggleMobileHeader = () => {
        if (isMobile) {
            setDisplayHeader((prev) => !prev);
        }
    };

    const handleCloseMobileHeader = () => {
        if (isMobile) {
            setDisplayHeader(false);
        }
    };

    return (
        <header
            aria-label='Ouvrir la barre de menu'
            aria-controls='headerNav'
            aria-expanded={displayHeader === false ? false : true}
            className={
                hideHeader === true
                    ? 'header header--displayOff'
                    : (displayHeader === true ? 'header header--open' : 'header header--close')
            }
        >
            <button
                type='button'
                className='header_hamburger header_hamburger_desktop header_hamburger--displayOff'
                aria-hidden="true"
                tabIndex={-1}
            >
                <FontAwesomeIcon icon={faBars} className='header_hamburger_icon' />
            </button>

            <div
                id="headerNav"
                className={displayHeader === false ? 'header_nav header_nav--displayOff' : 'header_nav header_nav--displayOn'}
            >
                <Link  
                    aria-label="Accéder à la page d'accueil"
                    to="/"
                    className="header_nav_menu_itemTitle"
                    onClick={handleGoTop}
                    >
                    <h1>Clément Dubois <br /> scénographe</h1>
                </Link>

                <nav className='header_nav_menu'>
                    <Link
                        aria-label='Accéder à la page Projets'
                        to="/projets"
                        className={
                            location.pathname === '/projets' || location.pathname === '/'
                                ? 'header_nav_menu_item header_nav_menu_item--selected'
                                : 'header_nav_menu_item'
                        }
                        onClick={handleCloseMobileHeader}
                    >
                        <h2>créations</h2>
                    </Link>

                    <Link
                        aria-label='Accéder à la page A Propos'
                        to="/infos"
                        className={
                            location.pathname === '/infos'
                                ? 'header_nav_menu_item header_nav_menu_item--selected'
                                : 'header_nav_menu_item'
                        }
                        onClick={handleCloseMobileHeader}
                    >
                        <h2>à propos</h2>
                    </Link>

                    <button
                        aria-label='Afficher la fenêtre Contact'
                        type='button'
                        className='header_nav_menu_item'
                        onClick={() => setdisplayContactModal(true)}
                    >
                        <h2>contact</h2>
                    </button>

                    <Link
                        aria-label='Accéder au tableau de bord'
                        to="/edit"
                        className={
                            isAuthenticated === true
                                ? (location.pathname === '/edit'
                                    ? 'header_nav_menu_item header_nav_menu_item--selected'
                                    : 'header_nav_menu_item')
                                : 'header_nav_menu_item header_nav_menu_item--displayOff'
                        }
                        onClick={handleCloseMobileHeader}
                    >
                        <p className='header_nav_menu_item_dashboardNav'>dashboard</p>
                    </Link>

                    <button
                        onClick={() => {
                            setConfirmBoxState(true);
                        }}
                        className={
                            isAuthenticated === false
                                ? 'header_nav_menu_item header_nav_menu_item--displayOff'
                                : 'header_nav_menu_item header_nav_menu_item--displayOn'
                        }
                    >
                        <p className='header_nav_menu_item_dashboardNav'>logout</p>
                    </button>
                </nav>

                <nav className='header_nav_socials'>
                    <a
                        aria-label='Accéder à la page Facebook de Clément Dubois'
                        href='https://www.facebook.com/clementduboisscenographe'
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>

                    <a
                        aria-label='Accéder à la page Instagram de Clément Dubois'
                        href='https://www.instagram.com/duboisscenographe/'
                        target="_blank"
                        rel='noreferrer'
                    >
                        <FontAwesomeIcon icon={faSquareInstagram} />
                    </a>

                    <a
                        aria-label='Accéder à la page Tiktok de Clément Dubois'
                        href='https://www.tiktok.com/@duboisscenographe/'
                        target="_blank"
                        rel='noreferrer'
                    >
                        <FontAwesomeIcon icon={faTiktok} />
                    </a>

                    <a
                        aria-label='Accéder à la page LinnkedIn de Clément Dubois'
                        href='https://www.linkedin.com/in/clément-dubois-scenographe'
                        target="_blank"
                        rel='noreferrer'
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </nav>
            </div>

            {isMobile && displayHeader === false && (
                <button
                    type='button'
                    onClick={handleToggleMobileHeader}
                    className='header_hamburger header_hamburger_responsive header_hamburger--displayOn'
                    aria-label='Ouvrir le menu'
                >
                    <FontAwesomeIcon icon={faBars} className='header_hamburger_icon' />
                </button>
            )}

            <section className={displayContactModal === true ? 'header_contactModal header_contactModal--open' : ' header_contactModal header_contactModal--close'}>
                <ContactModal setdisplayContactModal={setdisplayContactModal} />
            </section>

            <div>
                <ConfirmBox
                    affirmativeChoice={setLoggedOut}
                    attribut={null}
                    confirmBoxState={confirmBoxState}
                    negativeChoice={closeConfirmBox}
                />
            </div>

            <AuthModal handleAuthModal={handleAuthModal} authModalDisplay={authModalDisplay} />
        </header>
    )
}

export default Header