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
    const [artistsList, setArtistsList] = useState([]);
    const [productionList, setProductionList] = useState([]);
    const [pressList, setPressList] = useState([]);
    const [linksList, setLinksList] = useState([]);
    const [diffusionList, setDiffusionList] = useState([]);

    const [imageFiles, setImageFiles] = useState([]);
    const [mainImageIndex, setMainImageIndex]= useState(0);

    

    
    useEffect(() => {
        fetch(`${API_URL}/api/projects`)
        .then((res) => res.json())
        .then((data) => setProjects(data),
            console.log('travaux chargés'),
        )
        .catch((error)=>console.log(error.message))
    },[handleDisplayProjectForm, confirmBoxState]);

    function addProject() {
        setArtistsList([]);
        setProductionList([]);
        setPressList([]);
        setLinksList([]);
        setDiffusionList([]);
        setImageFiles([]);
        setProjectFormMode('add');
        setHandleDisplayProjectForm(true);
    }


    return  (      
        <aside className='edit'>
            <p>PROJETS</p>
            <button onClick={() => addProject()} type='button' >+ AJOUTER UN PROJET</button>
            <div className={handleDisplayProjectForm===false ? "edit_form--displayOff" : "edit_form--displayOn"}>
                <ProjectForm 
                    projectEdit={projectEdit} 
                    projectFormMode={projectFormMode}
                    artistsList={artistsList}
                    setArtistsList={setArtistsList}
                    productionList={productionList}
                    setProductionList={setProductionList}
                    pressList={pressList}
                    setPressList={setPressList}
                    linksList={linksList}
                    setLinksList={setLinksList}
                    diffusionList={diffusionList}
                    setDiffusionList={setDiffusionList}
                    imageFiles={imageFiles}
                    setImageFiles={setImageFiles}
                    mainImageIndex={mainImageIndex}
                    setMainImageIndex={setMainImageIndex}
                    setHandleDisplayProjectForm={setHandleDisplayProjectForm}
                    />
            </div>
        </aside>
    )
}

export default Edit