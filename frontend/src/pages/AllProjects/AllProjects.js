import './AllProjects.scss'
import React, { useState, useContext, useEffect } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import {Link} from 'react-router-dom'
import DOMPurify from 'dompurify';

function AllProjects() {

    const { projects, projectCategories } = useContext(ProjectsContext);

    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [categoryProjects, setCategoryProjects] = useState('tous');

    useEffect(() => {
        setFilteredProjects(projects);
    },[projects]);
    
    // Trier les projets en fonction de leurs dates numériques (AAAAMM) dans l'ordre décroissant
    const projectsWithNumericDate = filteredProjects.map(project => {
        const [year, month] = project.creationDate.split("-");
        return {
            ...project,
            // Concaténer et convertir en nombre
            numericDate: parseInt(year + month, 10) 
        };
    });

    const sortedProjects = projectsWithNumericDate.sort((a, b) => b.numericDate - a.numericDate);
   
    
    return  (      
        <section className='allProjects'>
            <div className='allProjects_buttonsContainer'>
                <button className={categoryProjects==='tous'?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' 
                    onClick={() => {
                        setFilteredProjects(projects);
                        setCategoryProjects('tous');
                    }}>Tous
                </button>
                {projectCategories.map((projectCategory) => (
                projects.some(project => project.projectType === `${projectCategory}`) &&
                    <button className={categoryProjects===`${projectCategory}`?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' 
                        onClick={()=> {
                            setFilteredProjects(projects.filter((project)=>project.projectType===`${projectCategory}`));
                            setCategoryProjects(`${projectCategory}`);
                        }}>{projectCategory}
                    </button>  
                ))}
            </div>
            {sortedProjects.map((project)=> (
            <Link to={`/projects/${project._id}`} className='allProjects_projectCard'>
                
                <div className='allProjects_projectCard_infos'>
                    <h3 className='allProjects_projectCard_infos_title'>{project.title}</h3>
                    <p className='allProjects_projectCard_infos_projectInfos'>{project.projectInfos}</p>
                    <p className='allProjects_projectCard_infos_creationDate'>{project.creationDate.split("-")[0]}</p>
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