import './Footer.scss'
import { Link } from 'react-router-dom'
import { API_URL } from '../../utils/constants'
import React, { useState, useEffect } from 'react'
// import { Context } from '../../utils/Context'
// import { useNavigate } from 'react-router-dom'
 
function Footer() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/projects`)
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                console.log('Projets chargés');
            })
            .catch((error) => console.log(error.message));
    }, []);

    return  (      
        <footer className='footer'>
            <ul className='footer_list'>
                {projects?.map((project)=>(
                    <li className='footer_list_item'> 
                        <Link to={`/projects/${project._id}`}>
                            <img src={`${project.projectImages[project.mainImageIndex].imageUrl}`}/>
                            <p>{project.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </footer>
    )
}

export default Footer