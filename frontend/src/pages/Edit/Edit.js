import './Edit.scss'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'
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
    const [projectToDelete, setProjectToDelete] = useState('');

    const [imageFiles, setImageFiles] = useState([]);
    const [mainImageIndex, setMainImageIndex]= useState(0);

    useEffect(() => {
        fetch(`${API_URL}/api/projects`)
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                console.log('Projets chargés');
            })
            .catch((error) => console.log(error.message));
    }, [confirmBoxState, handleDisplayProjectForm]);

    function addProject() {
        setArtistsList([]);
        setProductionList([]);
        setPressList([]);
        setLinksList([]);
        setDiffusionList([]);
        setImageFiles([]);
        setProjectFormMode('add');
        setHandleDisplayProjectForm(true);
        console.log(projectFormMode);
    }

    function deleteProject() {
        
        fetch(`${API_URL}/api/projects/${projectToDelete._id}`, {
            method: 'DELETE',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
        })
        .then((response) => {
            if(response.ok) {
                console.log(response);
            }
            setHandleDisplayProjectForm(false);
            setConfirmBoxState (false);
        })
        .catch((error) => console.log(error.message))
    }

    async function editProject(project) {
        console.log(project);
        setImageFiles(project.projectImages);
        setArtistsList(project.artistsList);
        setProductionList(project.productionList);
        setPressList(project.press);
        setLinksList(project.links)
        setDiffusionList(project.diffusionList);
        setProjectEdit(project);
        setProjectFormMode('edit');
        setHandleDisplayProjectForm(true);
        setMainImageIndex(project.mainImageIndex);
    }

    function handleProjectDeleteMode (project) {
        setConfirmBoxState(true);
        setProjectToDelete (project)
    }

    function closeConfirmBox () {
        setConfirmBoxState(false);
    }


    return  (      
        <aside className='edit'>
            <p>PROJETS</p>
            <ul>
                {projects.map((project)=>(
                    <li>
                        <p>{project.title}</p>
                        <button type='button' onClick={()=> handleProjectDeleteMode(project)}>SUPPRIMER</button>
                        <button type='button' onClick={()=> editProject(project)}>MODIFIER</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addProject()} type='button' >+ AJOUTER UN PROJET</button>
            <div>
                <ConfirmBox
                    deleteProject = {deleteProject}
                    confirmBoxState={confirmBoxState}
                    closeConfirmBox={closeConfirmBox}
                    />
            </div>
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