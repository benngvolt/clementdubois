import './AllProjects.scss'
import React, { useState, useContext } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import {Link} from 'react-router-dom'
import DOMPurify from 'dompurify';



function AllProjects() {

    const { projects } = useContext(ProjectsContext);
    const [sortedProjects, setSortedProjects] = useState([]);

    return  (      
        <section className='allProjects'>
            {projects.map((project)=> (
                <Link to={`/projects/${project._id}`} className='allProjects_projectCard'>
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
        </section>
    )
}

export default AllProjects