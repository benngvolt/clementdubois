import './AllProjects.scss'
import React, { useState, useContext, useEffect } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import {Link} from 'react-router-dom'
import DOMPurify from 'dompurify';
import MainPhoto from '../../components/MainPhoto/MainPhoto';

function AllProjects() {

    const { projects, projectCategories, setDisplayHeader, displayHeader } = useContext(ProjectsContext);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [categoryProjects, setCategoryProjects] = useState('tous');
    const scrollWithOffset = (element, offset = 100) => {
        const y = element.getBoundingClientRect().top + window.scrollY - offset;
    
        window.scrollTo({
            top: y,
            behavior: "smooth"
        });
    };
    
    const handleCategoryClick = (e, category) => {
    
        if (category === "tous") {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(
                projects.filter(project => project.projectType === category)
            );
        }
    
        setCategoryProjects(category);
    
        scrollWithOffset(e.currentTarget, 100);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setFilteredProjects(projects);
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
        <main className='allProjects' onClick={()=>displayHeader===true && setDisplayHeader(false)} >
            <MainPhoto/>
            <ul className="allProjects_buttonsContainer">
                <li className="allProjects_buttonsContainer_button">
                    <button
                        className={
                            categoryProjects === "tous"
                                ? "allProjects_buttonsContainer_button--selected"
                                : "allProjects_buttonsContainer_button--notSelected"
                        }
                        type="button"
                        aria-pressed={categoryProjects === "tous"}
                        aria-label="Afficher toutes les catégories de projets"
                        onClick={(e) => handleCategoryClick(e, "tous")}
                    >
                        <h3>Tous</h3>
                    </button>
                </li>

                {projectCategories
                    .filter(category =>
                        projects.some(project => project.projectType === category)
                    )
                    .map(category => (
                        <li key={category} className="allProjects_buttonsContainer_button">
                            <button
                                className={
                                    categoryProjects === category
                                        ? "allProjects_buttonsContainer_button--selected"
                                        : "allProjects_buttonsContainer_button--notSelected"
                                }
                                type="button"
                                aria-pressed={categoryProjects === category}
                                aria-label={`Afficher les projets correspondants à la catégorie ${category}`}
                                onClick={(e) => handleCategoryClick(e, category)}
                            >
                                <h3 className="allProjects_buttonsContainer_button_h3">
                                    {category}
                                </h3>
                            </button>
                        </li>
                    ))}
            </ul>
            <ul className='allProjects_projectsList'>
                {sortedProjects.map((project, index)=> (
                <li key={project._id}>
                    <Link to={`/projets/${project.slug || project._id}`} className='allProjects_projectCard' 
                        aria-label={`Accéder à la page du projet ${project.title}`}>
                        <div className='allProjects_projectCard_infos'>
                            <h4 translate="no" className='allProjects_projectCard_infos_title'>{project.title}</h4>
                            <p translate="no" className='allProjects_projectCard_infos_subtitle'>{project.subtitle}</p>
                            <p className='allProjects_projectCard_infos_projectInfos'>{project.projectInfos}</p>
                            <p className='allProjects_projectCard_infos_creationDate'>{project.creationDate.split("-")[0]}</p>
                            {project.summary &&
                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.summary) }} className='allProjects_projectCard_infos_summary'></p>
                            }
                        </div>
                        <figure className='allProjects_projectCard_imageContainer'>
                        {project.projectImages && project.projectImages.length > 0 &&
                            <img src={`${project.projectImages[project.mainImageIndex].imageUrl}`} alt={`image principale du projet ${project.title}(${index})`}/>
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