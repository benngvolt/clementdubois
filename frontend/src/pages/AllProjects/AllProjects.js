import './AllProjects.scss'
import React, { useState, useContext, useEffect } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import {Link} from 'react-router-dom'
import DOMPurify from 'dompurify';

function AllProjects() {

    const { projects, projectCategories, setDisplayHeader } = useContext(ProjectsContext);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [categoryProjects, setCategoryProjects] = useState('tous');

    useEffect(() => {
        setFilteredProjects(projects);
        setDisplayHeader(false);
    },[projects]);
    
    // Tri des projets en fonction de leurs dates numériques (AAAAMM) dans l'ordre décroissant
    const projectsWithNumericDate = filteredProjects.map(project => {
        const [year, month] = project.creationDate.split("-");
        return {
            ...project,
            // Concaténation et conversion en nombre
            numericDate: parseInt(year + month, 10) 
        };
    });

    const sortedProjects = projectsWithNumericDate.sort((a, b) => b.numericDate - a.numericDate);
   
    
    return  (      
        <main className='allProjects'>
            <ul className='allProjects_buttonsContainer'>
                <li className='allProjects_buttonsContainer_button'>
                    <button className={categoryProjects==='tous'?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' 
                        onClick={() => {
                            setFilteredProjects(projects);
                            setCategoryProjects('tous');
                        }}><h3>Tous</h3>
                    </button>
                </li>
                {projectCategories.map((projectCategory) => (
                projects.some(project => project.projectType === `${projectCategory}`) &&
                <li className='allProjects_buttonsContainer_button'>
                    <button className={categoryProjects===`${projectCategory}`?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' 
                        onClick={()=> {
                            setFilteredProjects(projects.filter((project)=>project.projectType===`${projectCategory}`));
                            setCategoryProjects(`${projectCategory}`);
                        }}><h3 className='allProjects_buttonsContainer_button_h3'>{projectCategory}</h3>
                    </button>
                </li>
                ))}
            </ul>
            <ul className='allProjects_projectsList'>
                {sortedProjects.map((project)=> (
                <li>
                    <Link to={`/projects/${project._id}`} className='allProjects_projectCard'>
                        <div className='allProjects_projectCard_infos'>
                            <h4 className='allProjects_projectCard_infos_title'>{project.title}</h4>
                            <p className='allProjects_projectCard_infos_projectInfos'>{project.projectInfos}</p>
                            <p className='allProjects_projectCard_infos_creationDate'>{project.creationDate.split("-")[0]}</p>
                            {project.summary &&
                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.summary) }} className='allProjects_projectCard_infos_summary'></p>
                            }
                        </div>
                        <figure className='allProjects_projectCard_imageContainer'>
                        {project.projectImages && project.projectImages.length > 0 &&
                            <img src={`${project.projectImages[project.mainImageIndex].imageUrl}`}/>
                        }
                        </figure>
                    </Link>
                </li>
                ))}
            </ul>
        </main>
    )
}

export default AllProjects