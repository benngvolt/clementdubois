import './OneProject.scss'
import { API_URL } from '../../utils/constants'
// import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
// import { Context } from '../../utils/Context'
import { useParams } from 'react-router-dom'

 
function OneProject() {

    const { id } = useParams();
    const [project, setProject] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/projects/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProject(data);
            })
            .catch((error) => console.log(error.message));
    }, []);

    return  (      
        <section className='oneProject'>
            <div className='oneProject_titleContainer'>
                <div className='oneProject_titleContainer_title'>
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                </div>
                <p className='oneProject_titleContainer_projectInfos'>{project.projectInfos}</p>
            </div>
            <div className='oneProject_firstImageContainer'>
                {project.projectImages && project.projectImages.length > 0 && project.projectImages[0]
                    ? <img src={project.projectImages[0].imageUrl} alt="Project" />
                    : <p>Aucune image disponible</p>
                }
            </div>
            <div className='oneProject_firstInfosBlock'>
                <div className='oneProject_firstInfosBlock_showAndSceno'>
                    <div className='oneProject_firstInfosBlock_showAndSceno_showBlock'>
                        <h4>La pièce</h4>
                        <p>{project.aboutShow}</p>
                    </div>
                    <div className='oneProject_firstInfosBlock_showAndSceno_scenoBlock'>
                        <h4>La scénographie</h4>
                        <p>{project.aboutSceno}</p>
                    </div>
                </div>
                <div className='oneProject_firstInfosBlock_distribution'>
                    <h4>Distribution</h4>
                    <ul className='oneProject_firstInfosBlock_distribution_list'>
                        {project.artistsList?.map((artist)=>(
                            <li className='oneProject_firstInfosBlock_distribution_list_item'>
                                <p><span>{artist.artistFunction}</span> {artist.artistName}</p>
                            </li>
                        ))}
                    </ul>

                </div>


            </div>

        </section>
    )
}

export default OneProject