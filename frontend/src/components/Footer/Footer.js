import './Footer.scss'
import { Link, useLocation } from 'react-router-dom'
import React, { useContext, useState, useEffect } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronLeft, faChevronRight
} from '@fortawesome/free-solid-svg-icons'
 
function Footer() {

    const { projects, hideFooter } = useContext(ProjectsContext);
    const location = useLocation();
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    };

    useEffect(() => {
        const footerList = document.querySelector('.footer_list');
        if (footerList) {
            footerList.addEventListener('scroll', handleScroll);
            return () => {
                footerList.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const handleScroll = (event) => {
        const scrollLeft = event.target.scrollLeft;
        const scrollWidth = event.target.scrollWidth;
        const clientWidth = event.target.clientWidth;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollWidth - scrollLeft !== clientWidth);
    };

    const scrollLeft = () => {
        const footerList = document.querySelector('.footer_list');
        if (footerList) {
            footerList.scrollBy({
                left: -1000,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        const footerList = document.querySelector('.footer_list');
        if (footerList) {
            footerList.scrollBy({
                left: 1000,
                behavior: 'smooth'
            });
        }
    };

    return  (      
        <footer className={hideFooter===false?'footer':'footer footer--displayOff'}>
            <div className='footer_leftButtonContainer' >
                <div className='footer_leftButtonContainer_button'>
                    <FontAwesomeIcon className={showLeftButton ? 'footer_leftButtonContainer_button_icon footer_leftButtonContainer_button_icon--displayOn':'footer_leftButtonContainer_button_icon footer_leftButtonContainer_button_icon--displayOff'} icon={faChevronLeft} onClick={scrollLeft}/>
                </div>
            </div>
            <ul className='footer_list'>
                {projects?.map((project, index)=>(
                    <li key={project._id} className={location.pathname===`/projects/${project._id}`?'footer_list_item footer_list_item--selected':'footer_list_item'}> 
                        <Link to={`/projects/${project._id}`} 
                            onClick={()=>scrollToTop()}
                            aria-label={`Accéder à la page du projet ${project.title}`}>
                            {project.projectImages && project.projectImages.length > 0 &&
                            <img src={`${project.projectImages[project.mainImageIndex].imageUrl}`} alt={`image du projet ${project.title}(${index})`}/>
                            }
                            <p>{project.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className='footer_rightButtonContainer' >
                <div className='footer_rightButtonContainer_button'>
                    <FontAwesomeIcon className={showRightButton ? 'footer_rightButtonContainer_button_icon footer_rightButtonContainer_button_icon--displayOn' : 'footer_rightButtonContainer_button_icon footer_rightButtonContainer_button_icon--displayOff' } icon={faChevronRight} onClick={scrollRight}/>
                </div>
            </div>
        </footer>
    )
}

export default Footer