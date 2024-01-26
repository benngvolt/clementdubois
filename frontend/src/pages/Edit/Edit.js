import './Edit.scss'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import { API_URL } from '../../utils/constants'
import React, { useEffect, useState } from 'react'

function Edit() {

    const [projects, setProjects] = useState([]);
    const [projectFormMode, setProjectFormMode] = useState('add');
    const [projectEdit, setProjectEdit] = useState('');
    const [handleDisplayProjectForm, setHandleDisplayProjectForm] = useState(false);
    const [confirmBoxState, setConfirmBoxState] = useState(false);

    
    useEffect(() => {
        fetch(`${API_URL}/api/projects`)
        .then((res) => res.json())
        .then((data) => setProjects(data),
            console.log('travaux chargés'),
        )
        .catch((error)=>console.log(error.message))
    },[handleDisplayProjectForm, confirmBoxState]);


    return  (      
        <aside className='edit'>
            <p>PROJETS</p>
            <button>+ AJOUTER UN PROJET</button>
            <ProjectForm 
                projectEdit={projectEdit} 
                projectFormMode={projectFormMode}/>

        </aside>
    )
}

export default Edit