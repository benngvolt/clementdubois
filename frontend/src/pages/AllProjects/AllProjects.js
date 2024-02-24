import './AllProjects.scss'
import React, { useState, useContext, useEffect } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import {Link} from 'react-router-dom'
import DOMPurify from 'dompurify';

function AllProjects() {

    const { projects, closeHeader } = useContext(ProjectsContext);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [categoryProjects, setCategoryProjects] = useState('tous');

    const projectsWithNumericDate = filteredProjects.map(project => {
        const [year, month] = project.creationDate.split("-");
        return {
            ...project,
            numericDate: parseInt(year + month, 10) // Concaténer et convertir en nombre
        };
    });

    useEffect(() => {
        setFilteredProjects(projects);
    },[]);
    
    // Trier les projets en fonction de leurs dates numériques (AAAAMM) dans l'ordre décroissant
    const sortedProjects = projectsWithNumericDate.sort((a, b) => b.numericDate - a.numericDate);
   
    
    return  (      
        <section className='allProjects'>
            <div className='allProjects_buttonsContainer'>
                <button className={categoryProjects==='tous'?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' onClick={() => {
                        setFilteredProjects(projects);
                        setCategoryProjects('tous');
                    }}>Tous</button>
                {projects.some(project => project.projectType === 'spectacle vivant') &&
                    <button className={categoryProjects==='spectacle vivant'?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' onClick={()=> {
                        setFilteredProjects(projects.filter((project)=>project.projectType==='spectacle vivant'));
                        setCategoryProjects('spectacle vivant');
                        }}>Spectacle vivant</button>
                }
                {projects.some(project => project.projectType === 'évènement') &&
                <button className={categoryProjects==='évènement'?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' onClick={()=> {
                    setFilteredProjects(projects.filter((project)=>project.projectType==='évènement'));
                    setCategoryProjects('évènement');
                    }}>Évènement</button>
                }
                {projects.some(project => project.projectType === 'médiation') &&
                <button className={categoryProjects==='médiation'?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' onClick={()=> {
                    setFilteredProjects(projects.filter((project)=>project.projectType==='médiation'));
                    setCategoryProjects('médiation');
                    }}>Médiation</button>
                }
            </div>
            {sortedProjects.map((project)=> (
                <Link to={`/projects/${project._id}`} className='allProjects_projectCard'>
                    <p className='allProjects_projectCard_creationDate'>{project.creationDate.split("-")[0]}</p>
                    <div className='allProjects_projectCard_infos'>
                        <h3 className='allProjects_projectCard_infos_title'>{project.title}</h3>
                        <p className='allProjects_projectCard_infos_projectInfos'>{project.projectInfos}</p>
                        {project.summary &&
                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.summary) }} className='allProjects_projectCard_infos_summary'></p>
                        }
                    </div>
                    <div className='allProjects_projectCard_imageContainer'>
                        {project.projectImages && project.projectImages.length > 0 &&
                            <img src={`${project.projectImages[project.mainImageIndex].imageUrl}`}/>
                        }
                    </div>
                </Link>
            ))}
        </section>
    )
}

export default AllProjects