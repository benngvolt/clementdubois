import './AllProjects.scss'
import { API_URL } from '../../utils/constants'
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


function AllProjects() {

    const [projects, setProjects] = useState([]);
    const [sortedProjects, setSortedProjects] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/projects`)
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setSortedProjects(data); // Assurez-vous que sortedProjects est initialisé avec les données chargées
                console.log('Projets chargés');
            })
            .catch((error) => console.log(error.message));
    }, []);


    return  (      
        <section className='allProjects'>
            {projects.map((project)=> (
                <Link to={`/projects/${project._id}`} className='allProjects_projectCard'>
                    <div className='allProjects_projectCard_infos'>
                        <h3 className='allProjects_projectCard_infos_title'>{project.title}</h3>
                        <p className='allProjects_projectCard_infos_projectInfos'>{project.projectInfos}</p>
                        <p className='allProjects_projectCard_infos_aboutShow'>{project.aboutShow}</p>
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