import './Edit.scss'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'
import { API_URL } from '../../utils/constants'
import React, { useState, useContext, useEffect } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import ErrorText from '../../components/ErrorText/ErrorText'
import InformationsForm from '../../components/InformationsForm/InformationsForm'

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

    const [displayError, setDisplayError] = useState (false);

    const [imageFiles, setImageFiles] = useState([]);
    const [moImageFiles, setMoImageFiles] = useState([]);
    const [mainImageIndex, setMainImageIndex]= useState(0);
    const [mainMoImageIndex, setMainMoImageIndex]= useState(0);

    const [handleDisplayInformationsForm, setHandleDisplayInformationsForm] = useState(false)
    const [informationsEdit, setInformationsEdit] = useState(null)

    async function loadInformations() {
    const res = await fetch(`${API_URL}/api/informations`)
    const data = await res.json()
    setInformationsEdit(data)
    }

    useEffect(() => { loadInformations() }, [])

    function editInformations() {
    setHandleDisplayInformationsForm(true)
    }

    const { projects, handleLoadProjects, randomImagesSelection, setDisplayHeader, displayHeader, isAuthenticated } = useContext(ProjectsContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        // setDisplayHeader(true); 
        setDisplayError(false)
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
                Authorization: `Bearer ${sessionStorage.getItem('1')}`,
            },
        })
        .then((response) => {
            if(response.ok) {
                console.log(response);
                setDisplayError(false);
            }
            setHandleDisplayProjectForm(false);
            setConfirmBoxState (false);
            handleLoadProjects();
        })
        .catch((error) => {
            console.log(error.message)
            setDisplayError(true)
        })
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
            <ErrorText errorText={'Impossible de supprimer ce projet dû à une erreur serveur'} state={displayError}/>
            <aside className={isAuthenticated===true?'edit_wrapper':'edit_wrapper--displayOff'}>
                <ul className='edit_list'>
                {projects.map((project, index) => {
                    const mainMedia = project.projectImages?.[project.mainImageIndex];

                    const fileType = mainMedia?.fileType || '';
                    const isVideo = fileType ? fileType.startsWith('video/') : false;
                    const isImage = fileType
                        ? fileType.startsWith('image/')
                        : !!mainMedia?.imageUrl;

                    return (
                        <li key={project._id} className='edit_list_item'>
                            {mainMedia && isImage && (
                                <img
                                    className='edit_list_item_image'
                                    src={mainMedia.imageUrl}
                                    alt={`image principale du projet ${project.title} (${index})`}
                                />
                            )}

                            {mainMedia && isVideo && (
                                <video
                                    className='edit_list_item_image'
                                    src={mainMedia.imageUrl}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                            )}

                            <p className='edit_list_item_title'>{project.title}</p>

                            <div className='edit_list_item_buttonsBox'>
                                <button type='button' onClick={() => handleProjectDeleteMode(project)}>
                                    SUPPRIMER
                                </button>
                                <button
                                    type='button'
                                    className='edit_list_item_buttonsBox_modif'
                                    onClick={() => editProject(project)}
                                >
                                    MODIFIER
                                </button>
                            </div>
                        </li>
                    );
                })}
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
                    <p className='edit_randomImages_title'>SÉLECTION D'IMAGES RANDOM :</p>
                    <div className='edit_randomImages_list'>
                        {randomImagesSelection.map((mediaUrl, index) => {

                            const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaUrl);

                            return (
                                <div key={index} className='edit_randomImages_list_item'>

                                    {isVideo ? (
                                        <video
                                            className='edit_randomImages_list_item_img'
                                            src={mediaUrl}
                                            muted
                                            autoPlay
                                            loop
                                            playsInline
                                            preload="metadata"
                                        />
                                    ) : (
                                        <img
                                            className='edit_randomImages_list_item_img'
                                            src={mediaUrl}
                                            alt={`image random (${index})`}
                                        />
                                    )}

                                </div>
                            );
                        })}
                    </div>
                </div>
                <button className='edit_addButton edit_aboutEditButton' type="button" onClick={editInformations}>+ éditer la page À Propos</button>

                    <div className={handleDisplayInformationsForm ? 'edit_form--displayOn' : 'edit_form--displayOff'}>
                    <InformationsForm
                        informationsEdit={informationsEdit}
                        setHandleDisplayInformationsForm={setHandleDisplayInformationsForm}
                        handleDisplayInformationsForm={handleDisplayInformationsForm}
                        handleReloadInformations={loadInformations}
                    />
                </div>
            </aside>
        </main>
    )
}

export default Edit