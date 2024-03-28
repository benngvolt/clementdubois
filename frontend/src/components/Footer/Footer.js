import './Footer.scss'
import { Link, useLocation } from 'react-router-dom'
import React, { useContext } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
 
function Footer() {

    const { projects, hideFooter } = useContext(ProjectsContext);
    const location = useLocation();
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    };

    return  (      
        <footer className={hideFooter===false?'footer':'footer footer--displayOff'}>
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
        </footer>
    )
}

export default Footer