import './Edit.scss'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'
import { API_URL } from '../../utils/constants'
import React, { useState, useContext, useEffect } from 'react'
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

    const { projects, handleLoadProjects, randomImagesSelection, setDisplayHeader, displayHeader, isAuthenticated } = useContext(ProjectsContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        setDisplayHeader(false);
    },[]);

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
            handleLoadProjects();
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
        setProjectToDelete (project);
    }

    function closeConfirmBox () {
        setConfirmBoxState(false);
    }


    return  (      
        <main className='edit' onClick={()=>displayHeader===true && setDisplayHeader(false)}>
            <p className={isAuthenticated===true?'edit_warning--displayOff':'edit_warning'}>Accès réservé</p>
            <aside className={isAuthenticated===true?'edit_wrapper':'edit_wrapper--displayOff'}>
                <ul className='edit_list'>
                    {projects.map((project, index)=>(
                        <li key={project._id} className='edit_list_item'>
                            {project.projectImages && project.projectImages.length > 0 &&
                                <img className='edit_list_item_image' src={project.projectImages[project.mainImageIndex].imageUrl} alt={`image principale du projet ${project.title}(${index})`}/>
                            }
                            <p className='edit_list_item_title'>{project.title}</p>
                            <div className='edit_list_item_buttonsBox'>
                                <button type='button' onClick={()=> handleProjectDeleteMode(project)}>SUPPRIMER</button>
                                <button type='button' className='edit_list_item_buttonsBox_modif' onClick={()=> editProject(project)}>MODIFIER</button>
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
                <div className='edit_randomImages'>
                    <p className='edit_randomImages_title'>IMAGES LANDING PAGE</p>
                    <div className='edit_randomImages_list'>
                        {randomImagesSelection.map((imageUrl, index) => (
                        <div key={index} className='edit_randomImages_list_item'>
                            <img className='edit_randomImages_list_item_img' src={imageUrl} alt={`image random (${index})`}/>
                            {/* <button type='button' aria-label="Définir cette image comme image random de la landing-page" className='edit_randomImages_list_item_inRandomSelectionButton'
                                onMouseDown={() => console.log('hola')} >
                                <FontAwesomeIcon icon={faBolt} 
                                className = 'edit_randomImages_list_item'
                                // className={props.item.inRandomSelection === true ? 'dndItem_buttons_inRandomSelectionButton--isOrange' : 'dndItem_buttons_inRandomSelectionButton--isWhite'} 
                                />
                            </button> */}
                        </div>
                        ))}
                    </div>
                </div>
            </aside>
        </main>
    )
}

export default Edit