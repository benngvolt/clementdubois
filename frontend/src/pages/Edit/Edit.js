import './Edit.scss'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'
import { API_URL } from '../../utils/constants'
import React, { useState, useContext } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'

function Edit() {

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
    const [moImageFiles, setMoImageFiles] = useState([]);
    const [mainImageIndex, setMainImageIndex]= useState(0);
    const [mainMoImageIndex, setMainMoImageIndex]= useState(0);

    const { projects, handleLoadProjects } = useContext(ProjectsContext);

    function addProject() {
        resetFields();
        setProjectFormMode('add');
        setHandleDisplayProjectForm(true);
    }

    function resetFields() {
        setArtistsList([]);
        setProductionList([]);
        setPressList([]);
        setLinksList([]);
        setDiffusionList([]);
        setImageFiles([]);
        setMoImageFiles([]);
        setProjectEdit([]);
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
        setImageFiles(project.projectImages);
        setMoImageFiles(project.makingOfImages);
        setArtistsList(project.artistsList);
        setProductionList(project.productionList);
        setPressList(project.press);
        setLinksList(project.links)
        setDiffusionList(project.diffusionList);
        setProjectEdit(project);
        setProjectFormMode('edit');
        setHandleDisplayProjectForm(true);
        setMainImageIndex(project.mainImageIndex);
        setMainMoImageIndex(project.mainMoImageIndex);
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
            <ul className='edit_list'>
                {projects.map((project)=>(
                    <li className='edit_list_item'>
                        {project.projectImages && project.projectImages.length > 0 &&
                            <img className='edit_list_item_image' src={project.projectImages[project.mainImageIndex].imageUrl} />
                        }
                        <p className='edit_list_item_title'>{project.title}</p>
                        <div className='edit_list_item_buttonsBox'>
                            <button type='button' onClick={()=> handleProjectDeleteMode(project)}>SUPPRIMER</button>
                            <button type='button' onClick={()=> editProject(project)}>MODIFIER</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => addProject()} type='button' className='edit_addButton'>+ ajouter</button>
            <div>
                <ConfirmBox
                    affirmativeChoice = {deleteProject}
                    confirmBoxState={confirmBoxState}
                    negativeChoice={closeConfirmBox}
                    attribut={null}
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
                    moImageFiles={moImageFiles}
                    setMoImageFiles={setMoImageFiles}
                    mainImageIndex={mainImageIndex}
                    mainMoImageIndex={mainMoImageIndex}
                    setMainImageIndex={setMainImageIndex}
                    setMainMoImageIndex={setMainMoImageIndex}
                    setHandleDisplayProjectForm={setHandleDisplayProjectForm}
                    handleDisplayProjectForm={handleDisplayProjectForm}
                    handleLoadProjects={handleLoadProjects}
                    />
            </div>
        </aside>
    )
}

export default Edit