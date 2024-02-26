import './ProjectForm.scss'
import {useRef, useState, useEffect, useContext } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import { API_URL } from '../../utils/constants'
import { v4 as uuidv4 } from 'uuid'
import DNDGallery from '../../components/DNDGallery/DNDGallery'
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/Loader'



function ProjectForm({
    projectEdit,
    projectFormMode,
    artistsList,
    setArtistsList,
    productionList,
    setProductionList,
    pressList,
    setPressList,
    linksList,
    setLinksList,
    diffusionList,
    setDiffusionList,
    imageFiles, 
    setImageFiles,
    moImageFiles, 
    setMoImageFiles, 
    mainImageIndex,
    mainMoImageIndex, 
    setMainImageIndex,
    setMainMoImageIndex,
    setHandleDisplayProjectForm,
    handleDisplayProjectForm,
    handleLoadProjects
    }) {

    const inputProjectTitleRef = useRef(null);
    const inputProjectSubtitleRef = useRef(null);
    const inputCreationDateRef = useRef(null);
    const inputProjectInfosRef = useRef(null);
    const inputMoreInfosRef = useRef(null);
    const inputAboutShowRef = useRef(null);
    const inputAboutScenoRef = useRef(null);
    const inputSummaryRef = useRef(null);
    const inputProjectTypeRef = useRef(null);
    const inputProjectImageFileRef = useRef(null);
    const inputProjectMoImageFileRef = useRef(null);
    const projectMainImageSampleRef = useRef(null);
    const projectMainMoImageSampleRef = useRef(null);

    const cleanedAboutSceno = DOMPurify.sanitize(projectEdit.aboutSceno);
    const cleanedAboutShow = DOMPurify.sanitize(projectEdit.aboutShow);
    const cleanedSummary = DOMPurify.sanitize(projectEdit.summary);
    
    const [projectTitle, setProjectTitle] = useState(projectFormMode === 'edit' ? projectEdit.title : '');
    const [projectSubtitle, setProjectSubtitle] = useState(projectFormMode === 'edit' ? projectEdit.subtitle : '');
    const [creationDate, setCreationDate] = useState(projectFormMode === 'edit' ? projectEdit.creationDate : '');
    const [projectInfos, setProjectInfos] = useState(projectFormMode === 'edit' ? projectEdit.projectInfos : '');
    const [moreInfos, setMoreInfos] = useState(projectFormMode === 'edit' ? projectEdit.moreInfos : '');
    const [aboutShow, setAboutShow] = useState(projectFormMode === 'edit' ? cleanedAboutShow : '');
    const [aboutSceno, setAboutSceno] = useState(projectFormMode === 'edit' ? cleanedAboutSceno : '');
    const [summary, setSummary] = useState(projectFormMode === 'edit' ? cleanedSummary : '');
    const [projectType, setProjectType] = useState(projectFormMode === 'edit' ? projectEdit.projectType : '');

    const { loaderDisplay, setLoaderDisplay } = useContext(ProjectsContext);

    // Réinitialisation des valuers input lorsque le formulaire s'ouvre / se ferme.
    useEffect(() => {
      if (projectFormMode === 'edit') {
        setProjectTitle(projectEdit.title);
        setProjectSubtitle(projectEdit.subtitle);
        setCreationDate(projectEdit.creationDate);
        setProjectInfos(projectEdit.projectInfos);
        setMoreInfos(projectEdit.projectInfos);
        setAboutShow(projectEdit.aboutShow);
        setAboutSceno(projectEdit.aboutSceno);
        setSummary(projectEdit.summary);
        setProjectType(projectEdit.projectType);
      } else {
        setProjectTitle('');
        setProjectSubtitle('');
        setCreationDate('');
        setProjectInfos('');
        setMoreInfos('');
        setAboutShow('');
        setAboutSceno('');
        setSummary('');
        setProjectType('');
      }
    }, [projectFormMode, handleDisplayProjectForm]);
  
    /* ---------------------------
    ----- FORM FUNCTIONS -----------
    ----------------------------*/

    function closeForm() {
        setLoaderDisplay(false);
        setHandleDisplayProjectForm(false);
        handleLoadProjects();
    }

    /* -------------------------------
    ----- AJOUTS DE CHAMPS -----------
    --------------------------------*/

    const handleAddArtist = () => {
        setArtistsList([...artistsList, { artistFunction: '', artistName: '' }]);
    };
    const handleSupprArtist = (index) => {
        setArtistsList (artistsList.filter((_, i) => i !== index));
    }
    const handleAddProduction = () => {
        setProductionList([...productionList, { prodType: '', prodName: '', prodInfos: '', prodLink: '' }]);
    };
    const handleSupprProduction = (index) => {
        setProductionList (productionList.filter((_, i) => i !== index));
    }
    const handleProdTypeSelectChange = (index, value) => {
        const updatedProductionList = [...productionList];
        updatedProductionList[index].prodType = value;
        setProductionList(updatedProductionList);
    };
    const handleAddPress = () => {
        setPressList([...pressList, { quote: '', mediaName: '', mediaLink: ''}]);
    };
    const handleSupprPress = (index) => {
        setPressList (pressList.filter((_, i) => i !== index));
    }
    const handleAddLink = () => {
        setLinksList([...linksList, { linkName: '', linkUrl: ''}]);
    };
    const handleSupprLink = (index) => {
        setLinksList (linksList.filter((_, i) => i !== index));
    }
    const handleAddDiff = () => {
        setDiffusionList([...diffusionList, { dates: '', city: '', placeName: '', placeLink:''}]);
    };
    const handleSupprDiff = (index) => {
        setDiffusionList (diffusionList.filter((_, i) => i !== index));
    }

    /* --------------------
    ----- IMAGES ----------
    ---------------------*/
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isMoImageLoaded, setIsMoImageLoaded] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [newMoImage, setNewMoImage] = useState(null);

    function displaySample() {
        const image = inputProjectImageFileRef.current.files[0];
        if (image) {
            if (!image.inRandomSelection) {
                image.inRandomSelection = false
            }
            setNewImage (image);
            const id = uuidv4(); // Générez un identifiant unique
            image._id = id;
            image.sampleImageUrl= URL.createObjectURL(image);
            projectMainImageSampleRef.current.setAttribute("src", image.sampleImageUrl);
            projectMainImageSampleRef.current.setAttribute("alt", "");
            setIsImageLoaded(true);
        } else {
            setIsImageLoaded(false);
        }    
    }

    function displayMoSample() {
        const image = inputProjectMoImageFileRef.current.files[0];

        if (image) {
            setNewMoImage (image);
            const id = uuidv4(); // Générez un identifiant unique
            image._id = id;
            image.sampleImageUrl= URL.createObjectURL(image);
            projectMainMoImageSampleRef.current.setAttribute("src", image.sampleImageUrl);
            projectMainMoImageSampleRef.current.setAttribute("alt", "");
            setIsMoImageLoaded(true);
        } else {
            setIsMoImageLoaded(false);
        }    
    }

    function cancelAddImageFile() {
        setNewImage (null);
        setIsImageLoaded(false);
        projectMainImageSampleRef.current.setAttribute("src", "");
        projectMainImageSampleRef.current.setAttribute("alt", "");
    }
    function cancelAddMoImageFile() {
        setNewMoImage (null);
        setIsMoImageLoaded(false);
        projectMainMoImageSampleRef.current.setAttribute("src", "");
        projectMainMoImageSampleRef.current.setAttribute("alt", "");
    }

    function handleAddImageFile() {
        
        if (newImage) {
            const updatedImageFiles = [...imageFiles, newImage];
            setImageFiles(updatedImageFiles);
        }
        setIsImageLoaded(false);
        cancelAddImageFile();
        console.log(imageFiles);
    }

    function handleAddMoImageFile() {
        if (newMoImage) {
            console.log(newMoImage);
            const updatedMoImageFiles = [...moImageFiles, newMoImage];
            setMoImageFiles(updatedMoImageFiles);
        }
        setIsMoImageLoaded(false);
        cancelAddMoImageFile();
        
    }

    /* --------------------------------------
    ----- SOUMISSION DU FORMULAIRE ----------
    ---------------------------------------*/

    function projectFormSubmit(event) {

        event.preventDefault();
        setLoaderDisplay(true);
        // const token = window.sessionStorage.getItem('1');
        const projectFormData = new FormData();
        projectFormData.append('title', inputProjectTitleRef.current.value);
        projectFormData.append('subtitle', inputProjectSubtitleRef.current.value);
        projectFormData.append('creationDate', inputCreationDateRef.current.value);
        projectFormData.append('projectInfos', inputProjectInfosRef.current.value);
        projectFormData.append('moreInfos', inputMoreInfosRef.current.value);
        projectFormData.append('aboutShow', inputAboutShowRef.current.value);
        projectFormData.append('aboutSceno', inputAboutScenoRef.current.value);
        projectFormData.append('summary', inputSummaryRef.current.value);
        projectFormData.append('projectType', inputProjectTypeRef.current.value);
        projectFormData.append('mainImageIndex', mainImageIndex);
        projectFormData.append('mainMoImageIndex', mainMoImageIndex);
        projectFormData.append('artistsList', JSON.stringify(artistsList));
        projectFormData.append('productionList', JSON.stringify(productionList));
        projectFormData.append('press', JSON.stringify(pressList));
        projectFormData.append('links', JSON.stringify(linksList));
        projectFormData.append('diffusionList', JSON.stringify(diffusionList));

        const newImageFiles = Array.from(imageFiles);
        const newMoImageFiles = Array.from(moImageFiles);
       
        const imagesWithIndex = newImageFiles.map((image, index) => ({
            index,
            image
        }));

        const moImagesWithIndex = newMoImageFiles.map((image, index) => ({
            index,
            image
        }));

        imagesWithIndex.forEach(({ index, image }) => {
            if (image instanceof File) {
                projectFormData.append('images', image);
                projectFormData.append('fileIndexes', index)
            } else {
                projectFormData.append(`existingImages[${index}]`, JSON.stringify(image));
            }
        });

        moImagesWithIndex.forEach(({ index, image }) => {
            if (image instanceof File) {
                projectFormData.append('moImages', image);
                projectFormData.append('moFileIndexes', index)
            } else {
                projectFormData.append(`existingMoImages[${index}]`, JSON.stringify(image));
            }
        });

        if (projectFormMode==='add') {
            
            fetch(`${API_URL}/api/projects`, {
                method: "POST",
                headers: {
                    // 'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + token,
                },
                body: projectFormData,
                })
                .then((response) => {
                    if (response.ok) {
                        
                        return response;
                    } else {
                        
                        throw new Error('La requête a échoué');
                    }
                })
                .then(()=> {
                    
                    closeForm();
                })
                .catch((error) => console.error(error));
        } else if (projectFormMode==='edit') {
            fetch(`${API_URL}/api/projects/${projectEdit._id}`, {
                method: "PUT",
                headers: {
                    // 'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + token,
                },
                body: projectFormData,
                })
                .then((response) => {
                    if (response.ok) {
                        
                        return response;
                    } else {
                        
                        throw new Error('La requête a échoué');
                    }
                })
                .then(()=> {
                    
                    closeForm();
                })
                .catch((error) => console.error(error));
        }
    }



    return  (      
        
        <form onSubmit={(event) => projectFormSubmit(event)} method="post" className='projectForm'>

            <button type='button' className='projectForm_stickyCancelButton' onClick={() => closeForm()}>
                <FontAwesomeIcon icon={faXmark} className='projectForm_stickyCancelButton_icon'/>
            </button>

            {/* WELCOME */}
            <div className='projectForm_welcomeContainer'>
                <p className='projectForm_welcomeContainer_mainWelcome'>Bienvenu chez toi.</p>
                <img className='projectForm_welcomeContainer_imageWelcome'src='./assets/welcome01.png' alt='image de bienvenue'/>
                <p className='projectForm_welcomeContainer_secondWelcome'> Prends-toi tranquille un café avant de te mettre au boulot...</p>
            </div>

            {/* INFOS PRINCIPALES */}
            <div className='projectForm_mainInfosContainer'>
                {/* CHAMPS TITRE */}
                <div className='projectForm_mainInfosContainer_textField'>
                    <label htmlFor='inputProjectTitle'>TITRE*</label>
                    <input type='text' id='inputProjectTitle' ref={inputProjectTitleRef} value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}></input>
                </div>

                {/* CHAMPS SOUS-TITRE */}
                <div className='projectForm_mainInfosContainer_textField'>
                    <label htmlFor='inputProjectSubtitle'>SOUS-TITRE</label>
                    <input type='text' id='inputProjectSubtitle' ref={inputProjectSubtitleRef} value={projectSubtitle} onChange={(e) => setProjectSubtitle(e.target.value)}></input>
                </div>

                {/* CHAMPS DATE DE CRÉATION */}
                <div className='projectForm_mainInfosContainer_textField'>
                    <label htmlFor='inputCreationDate'>DATE DE CRÉATION*</label>
                    <input type='month' id='inputCreationDate' ref={inputCreationDateRef} value={creationDate} onChange={(e) => setCreationDate(e.target.value)}></input>
                </div>

                {/* CHAMPS INFOS COMPAGNIE*/}
                <div className='projectForm_mainInfosContainer_textField'>
                    <label htmlFor='inputProjectInfos'>INFORMATIONS COMPAGNIE</label>
                    <input type='text' id='inputProjectInfos' ref={inputProjectInfosRef} value={projectInfos} onChange={(e) => setProjectInfos(e.target.value)}></input>
                </div>

                {/* CHAMPS PLUS D'INFOS*/}
                <div className='projectForm_mainInfosContainer_textField'>
                    <label htmlFor='inputMoreInfos'>PLUS D'INFOS</label>
                    <input type='text' id='inputMoreInfos' ref={inputMoreInfosRef} value={moreInfos} onChange={(e) => setMoreInfos(e.target.value)}></input>
                </div>
                {/* CHAMPS TYPE DE PROJET*/}
                <div className='projectForm_mainInfosContainer_arrayField'>
                    <label htmlFor='inputProjectType'>TYPE DE PROJET*</label>
                    <select id='inputProjectType' 
                            ref={inputProjectTypeRef} 
                            name="projectType"
                            value={projectType} 
                            onChange={(e) => setProjectType(e.target.value)}>
                        <option value=""></option>
                        <option value="spectacle vivant">Spectacle vivant</option>
                        <option value="évènement">Évènement</option>
                        <option value="médiation">Médiation</option>
                    </select>
                </div>
            </div>

            {/* IMAGES */}
            <div className='projectForm_imagesFieldsContainer'>
                <div className='projectForm_imagesFieldsContainer_projectImagesContainer'>
                    <p>IMAGES DU PROJET</p>
                    <DNDGallery imageFiles={imageFiles} setImageFiles={setImageFiles} mainImageIndex={mainImageIndex} setMainImageIndex={setMainImageIndex} displayClass={'grid'} />
                    {imageFiles.length < 15 &&
                        <div className='projectForm_imagesFieldsContainer_projectImagesContainer_imageField'>
                            <label htmlFor='inputProjectImageFile'>{isImageLoaded ? 'CHANGER D\'IMAGE' : '+ AJOUTER UNE IMAGE'}</label>
                            <input type='file' id='inputProjectImageFile' name="images" ref={inputProjectImageFileRef} onChange={displaySample} style={{ display: 'none' }}></input>
                            <div  className="projectForm_imagesFieldsContainer_projectImagesContainer_imageField_sampleContainer">
                                <img id='imageSample' ref={projectMainImageSampleRef} src='' alt=''/>
                                <div className={isImageLoaded ? "projectForm_imagesFieldsContainer_projectImagesContainer_imageField_sampleContainer_buttonsSystem--displayOn" :  "projectForm_imagesFieldsContainer_projectImagesContainer_imageField_sampleContainer_buttonsSystem--displayOff"}>
                                    <button aria-label="Ajouter l'image" onClick={handleAddImageFile} type="button">AJOUTER</button>
                                    <button aria-label="Annuler" onClick={cancelAddImageFile} type="button">ANNULER</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className='projectForm_imagesFieldsContainer_makingOfImagesContainer'>
                    <p>IMAGES DU WORK-IN-PROCESS</p>
                    <DNDGallery imageFiles={moImageFiles} setImageFiles={setMoImageFiles} mainImageIndex={mainMoImageIndex} setMainImageIndex={setMainMoImageIndex} displayClass={'row'} /> 
                    {moImageFiles.length < 10 &&
                        <div className='projectForm_imagesFieldsContainer_makingOfImagesContainer_imageField'>
                            <label htmlFor='inputProjectMoImageFile'>{isMoImageLoaded ? 'CHANGER D\'IMAGE' : '+ AJOUTER UNE IMAGE'}</label>
                            <input type='file' id='inputProjectMoImageFile' name="moImages" ref={inputProjectMoImageFileRef} onChange={displayMoSample} style={{ display: 'none' }}></input>
                            <div  className="projectForm_imagesFieldsContainer_makingOfImagesContainer_imageField_sampleContainer">
                                <img id='moImageSample' ref={projectMainMoImageSampleRef} src='' alt=''/>
                                <div className={isMoImageLoaded ? "projectForm_imagesFieldsContainer_makingOfImagesContainer_imageField_sampleContainer_buttonsSystem--displayOn" :  "projectForm_imagesFieldsContainer_makingOfImagesContainer_imageField_sampleContainer_buttonsSystem--displayOff"}>
                                    <button aria-label="Ajouter l'image" onClick={handleAddMoImageFile} type="button">AJOUTER</button>
                                    <button aria-label="Annuler" onClick={cancelAddMoImageFile} type="button">ANNULER</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* DESCRIPTIFS */}
            <div className='projectForm_descriptionsContainer'>
                {/* CHAMPS A PROPOS DU SPECTACLE*/}
                <div className='projectForm_descriptionsContainer_textField'>
                    <label htmlFor='inputAboutShow'>À PROPOS DU SPECTACLE</label>
                    <textarea className='projectForm_descriptionsContainer_textField_textarea' type='textarea' id='inputAboutShow' ref={inputAboutShowRef} value={aboutShow?.replace(/<br>/g, "\n")} onChange={(e) => setAboutShow(e.target.value)}></textarea>
                </div>

                {/* CHAMPS A PROPOS DE LA SCENO*/}
                <div className='projectForm_descriptionsContainer_textField'>
                    <label htmlFor='inputAboutSceno'>À PROPOS DE LA SCÉNOGRAPHIE</label>
                    <textarea className='projectForm_descriptionsContainer_textField_textarea' type='textarea' id='inputAboutSceno' ref={inputAboutScenoRef} value={aboutSceno?.replace(/<br>/g, "\n")} onChange={(e) => setAboutSceno(e.target.value)}></textarea>
                </div>

                {/* CHAMPS RESUME*/}
                <div className='projectForm_descriptionsContainer_textField'>
                    <label htmlFor='inputSummary'>RÉSUMÉ</label>
                    <textarea className='projectForm_descriptionsContainer_textField_textarea' type='textarea' id='inputSummary' ref={inputSummaryRef} value={summary?.replace(/<br>/g, "\n")} onChange={(e) => setSummary(e.target.value)}></textarea>
                </div>
            </div>

            {/* TABLEAUX */}
            <div className='projectForm_arraysContainer'>
                {/* CHAMPS DISTRIBUTION*/}
                <div className='projectForm_arraysContainer_arrayField'>
                    <p> DISTRIBUTION </p>
                    {artistsList.map((artist, index) => (
                        <div key={index} className='projectForm_arraysContainer_arrayField_fields'>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectArtistFunction${index}`}>FONCTION</label>
                                <input
                                    type='text'
                                    id={`inputProjectArtistFunction${index}`}
                                    value={artist.artistFunction}
                                    onChange={(e) => {
                                        const updatedArtistsList = [...artistsList];
                                        updatedArtistsList[index].artistFunction = e.target.value;
                                        setArtistsList(updatedArtistsList);
                                    }}
                                ></input>
                            </div>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectArtistName${index}`}>NOMS</label>
                                <input
                                    type='text'
                                    id={`inputProjectArtistName${index}`}
                                    value={artist.artistName}
                                    onChange={(e) => {
                                        const updatedArtistsList = [...artistsList];
                                        updatedArtistsList[index].artistName = e.target.value;
                                        setArtistsList(updatedArtistsList);
                                    }}
                                ></input>
                            </div>
                            <button type='button' onClick={() => handleSupprArtist(index)}>SUPPRIMER</button>
                        </div>              
                    ))}
                    <button type='button' onClick={() =>handleAddArtist()} >+ AJOUTER UN ARTISTE</button>
                </div>
                {/* CHAMPS PRODUCTION*/}
                <div className='projectForm_arraysContainer_arrayField'>
                    <p> PRODUCTION </p>
                    {productionList.map((production, index) => (
                        <div key={index} className='projectForm_arraysContainer_arrayField_fields'>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectProductionName${index}`}>NOM</label>
                                <input
                                    type='text'
                                    id={`inputProjectProductionName${index}`}
                                    value={production.prodName}
                                    onChange={(e) => {
                                        const updatedProductionList = [...productionList];
                                        updatedProductionList[index].prodName = e.target.value;
                                        setProductionList(updatedProductionList);
                                    }}
                                ></input>
                            </div>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectProductionLink${index}`}>LIEN</label>
                                <input
                                    type='text'
                                    id={`inputProjectProductionLink${index}`}
                                    value={production.prodLink}
                                    onChange={(e) => {
                                        const updatedProductionList = [...productionList];
                                        updatedProductionList[index].prodLink = e.target.value;
                                        setProductionList(updatedProductionList);
                                    }}
                                ></input>
                            </div>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectProductionLink${index}`}>INFOS</label>
                                <input
                                    type='text'
                                    id={`inputProjectProductionInfos${index}`}
                                    value={production.prodInfos}
                                    onChange={(e) => {
                                        const updatedProductionList = [...productionList];
                                        updatedProductionList[index].prodInfos = e.target.value;
                                        setProductionList(updatedProductionList);
                                    }}
                                ></input>
                            </div>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectProductionType${index}`}>TYPE</label>
                                <select id={`inputProjectProductionType${index}`} 
                                        defaultValue={projectFormMode==='edit'? production.prodType : ""}
                                        onChange={(e) => handleProdTypeSelectChange(index, e.target.value)}>
                                    <option value=""></option>
                                    <option value="Production">Production</option>
                                    <option value="Co-production">Co-production</option>
                                    <option value="Accueils en résidence de création">Accueils en résidence de création</option>
                                    <option value="Aide à la création">Aide à la création</option>
                                    <option value="Aide à la résidence d'écriture">Aide à la résidence d'écriture</option>
                                    <option value="Soutien">Soutien</option>
                                    <option value="Remerciements">Remerciements</option>
                                </select>
                            </div>
                            <button type='button' onClick={() => handleSupprProduction(index)}>SUPPRIMER</button>
                        </div>              
                    ))}
                    <button type='button' onClick={() =>handleAddProduction()} >+ AJOUTER UN MEMBRE DE L'EQUIPE DE PROD</button>
                </div>
                
                {/* CHAMPS PRESSE*/}
                <div className='projectForm_arraysContainer_arrayField'>
                    <p> PRESSE </p>
                    {pressList.map((press, index) => (
                        <div key={index} className='projectForm_arraysContainer_arrayField_fields'>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectPressQuote${index}`}>EXTRAIT</label>
                                <input
                                    type='textarea'
                                    id={`inputProjectPressQuote${index}`}
                                    value={press.quote}
                                    onChange={(e) => {
                                        const updatedPressList = [...pressList];
                                        updatedPressList[index].quote = e.target.value;
                                        setPressList(updatedPressList);
                                    }}
                                ></input>
                            </div>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectPressMediaName${index}`}>MEDIA</label>
                                <input
                                    type='text'
                                    id={`inputProjectPressMediaName${index}`}
                                    value={press.mediaName}
                                    onChange={(e) => {
                                        const updatedPressList = [...pressList];
                                        updatedPressList[index].mediaName = e.target.value;
                                        setPressList(updatedPressList);
                                    }}
                                ></input>
                            </div>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectPressMediaLink${index}`}>LIEN</label>
                                <input
                                    type='text'
                                    id={`inputProjectPressMediaLink${index}`}
                                    value={press.mediaLink}
                                    onChange={(e) => {
                                        const updatedPressList = [...pressList];
                                        updatedPressList[index].mediaLink = e.target.value;
                                        setPressList(updatedPressList);
                                    }}
                                ></input>
                            </div>
                            <button type='button' onClick={() => handleSupprPress(index)}>SUPPRIMER</button>
                        </div>              
                    ))}
                    <button type='button' onClick={() =>handleAddPress()} >+ AJOUTER UN ARTICLE DE PRESSE</button>
                </div>

                {/* CHAMPS LIENS*/}
                <div className='projectForm_arraysContainer_arrayField'>
                    <p> LIENS VIDÉOS/COMPAGNIE/ETC. </p>
                    {linksList.map((link, index) => (
                        <div key={index} className='projectForm_arraysContainer_arrayField_fields'>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectLinkName${index}`}>LABEL</label>
                                <input
                                    type='text'
                                    id={`inputProjectLinkName${index}`}
                                    value={link.linkName}
                                    onChange={(e) => {
                                        const updatedLinksList = [...linksList];
                                        updatedLinksList[index].linkName = e.target.value;
                                        setLinksList(updatedLinksList);
                                    }}
                                ></input>
                            </div>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectLinkUrl${index}`}>URL</label>
                                <input
                                    type='text'
                                    id={`inputProjectLinkUrl${index}`}
                                    value={link.linkUrl}
                                    onChange={(e) => {
                                        const updatedLinksList = [...linksList];
                                        updatedLinksList[index].linkUrl = e.target.value;
                                        setLinksList(updatedLinksList);
                                    }}
                                ></input>
                            </div>
                            <button type='button' onClick={() => handleSupprLink(index)}>SUPPRIMER</button>
                        </div>              
                    ))}
                    <button type='button' onClick={() =>handleAddLink()} >+ AJOUTER UN LIEN</button>
                </div>

                {/* CHAMPS DIFFUSION*/}
                <div className='projectForm_arraysContainer_arrayField'>
                    <p> DIFFUSION </p>
                    {diffusionList.map((diff, index) => (
                        <div key={index} className='projectForm_arraysContainer_arrayField_fields'>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectDiffDates${index}`}>DATES</label>
                                <input
                                    type='text'
                                    id={`inputProjectDiffDates${index}`}
                                    value={diff.dates}
                                    onChange={(e) => {
                                        const updatedDiffusionList = [...diffusionList];
                                        updatedDiffusionList[index].dates = e.target.value;
                                        setDiffusionList(updatedDiffusionList);
                                    }}
                                ></input>
                            </div>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectDiffCity${index}`}>VILLE</label>
                                <input
                                    type='text'
                                    id={`inputProjectDiffCity${index}`}
                                    value={diff.city}
                                    onChange={(e) => {
                                        const updatedDiffusionList = [...diffusionList];
                                        updatedDiffusionList[index].city = e.target.value;
                                        setDiffusionList(updatedDiffusionList);
                                    }}
                                ></input>
                            </div>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectPlaceName${index}`}>LIEU</label>
                                <input
                                    type='text'
                                    id={`inputProjectPlaceName${index}`}
                                    value={diff.placeName}
                                    onChange={(e) => {
                                        const updatedDiffusionList = [...diffusionList];
                                        updatedDiffusionList[index].placeName = e.target.value;
                                        setDiffusionList(updatedDiffusionList);
                                    }}
                                ></input>
                            </div>
                            <div className='projectForm_arraysContainer_arrayField_fields_line'>
                                <label htmlFor={`inputProjectPlaceLink${index}`}>URL</label>
                                <input
                                    type='text'
                                    id={`inputProjectPlaceLink${index}`}
                                    value={diff.placeLink}
                                    onChange={(e) => {
                                        const updatedDiffusionList = [...diffusionList];
                                        updatedDiffusionList[index].placeLink = e.target.value;
                                        setDiffusionList(updatedDiffusionList);
                                    }}
                                ></input>
                            </div>
                            <button type='button' onClick={() => handleSupprDiff(index)}>SUPPRIMER</button>
                        </div>              
                    ))}
                    <button type='button' onClick={() =>handleAddDiff()} >+ AJOUTER UN LIEU</button>
                </div>
                <div className='projectForm_buttons'>
                    <button type='submit'>VALIDER</button>
                    <button type='button' onClick={() => closeForm()}>ANNULER</button>
                </div>
            </div>
            <div className={loaderDisplay===true?'projectForm_loaderContainer--displayOn':'projectForm_loaderContainer--displayOff'} >
                <Loader/>
            </div>
        </form>
    )
}

export default ProjectForm