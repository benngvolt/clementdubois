import './AllProjects.scss'
import React, { useState, useContext, useEffect } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import {Link} from 'react-router-dom'
import DOMPurify from 'dompurify';
import Loader from '../../components/Loader/Loader'



function AllProjects() {

    const { projects, displayHomePage, setDisplayHomePage, loaderDisplay } = useContext(ProjectsContext);
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
        setFilteredProjects(projects)
      },[displayHomePage]);
    
    // Trier les projets en fonction de leurs dates numériques (AAAAMM) dans l'ordre décroissant
    const sortedProjects = projectsWithNumericDate.sort((a, b) => b.numericDate - a.numericDate);
   
    
    return  (      
        <section className='allProjects'>
            <div className='allProjects_buttonsContainer'>
                <button className={categoryProjects==='tous'?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' onClick={() => {
                        setFilteredProjects(projects);
                        setCategoryProjects('tous');
                    }}>Tous</button>
                <button className={categoryProjects==='spectacle vivant'?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' onClick={()=> {
                    setFilteredProjects(projects.filter((project)=>project.projectType==='spectacle vivant'));
                    setCategoryProjects('spectacle vivant');
                    }}>Spectacle vivant</button>
                <button className={categoryProjects==='évènement'?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' onClick={()=> {
                    setFilteredProjects(projects.filter((project)=>project.projectType==='évènement'));
                    setCategoryProjects('évènement');
                    }}>Évènement</button>
                <button className={categoryProjects==='médiation'?'allProjects_buttonsContainer_button--selected':'allProjects_buttonsContainer_button--notSelected'} type='button' onClick={()=> {
                    setFilteredProjects(projects.filter((project)=>project.projectType==='médiation'));
                    setCategoryProjects('médiation');
                    }}>Médiation</button>
            </div>
            {sortedProjects.map((project)=> (
                <Link to={`/projects/${project._id}`} className='allProjects_projectCard'>
                    <p className='allProjects_projectCard_creationDate'>{project.creationDate.split("-")[0]}</p>
                    <div className='allProjects_projectCard_infos'>
                        <h3 className='allProjects_projectCard_infos_title'>{project.title}</h3>
                        <p className='allProjects_projectCard_infos_projectInfos'>{project.projectInfos}</p>
                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.aboutShow) }} className='allProjects_projectCard_infos_aboutShow'></p>
                    </div>
                    <div className='allProjects_projectCard_imageContainer'>
                        <img src={`${project.projectImages[project.mainImageIndex].imageUrl}`}/>
                    </div>
                </Link>
            ))}
            <div className={displayHomePage===true?'allProjects_homePage--displayOn':'allProjects_homePage--displayOff'}>
                <div className={loaderDisplay===true?'allProjects_homePage_loader--displayOn':'allProjects_homePage_loader--displayOff'}>
                    <Loader/>
                </div>
                <img className='allProjects_homePage_image'src='./assets/homeImage2.jpg' alt="Project" />
                <button className='allProjects_homePage_button' type='button' onClick={()=>setDisplayHomePage(false)}><h1> Clément Dubois Scénographe </h1> </button>
            </div>
        </section>
    )
}

export default AllProjects