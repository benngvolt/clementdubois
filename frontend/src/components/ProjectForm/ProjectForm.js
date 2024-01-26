import './ProjectForm.scss'
import {useRef, useState, useEffect } from 'react'



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
    setDiffusionList
    }) {

    const inputProjectTitleRef = useRef(null);
    const inputProjectSubTitleRef = useRef(null);
    const inputProjectInfosRef = useRef(null);
    const inputMoreInfosRef = useRef(null);
    const inputAboutShowRef = useRef(null);
    const inputAboutScenoRef = useRef(null);
    const inputProjectTypeRef = useRef(null);

    /* ---------------------------
    ----- ARTISTS LIST -----------
    ----------------------------*/

    const handleAddArtist = () => {
        setArtistsList([...artistsList, { artistFunction: '', artistName: '' }]);
    };
    const handleSupprArtist = (index) => {
        setArtistsList (artistsList.filter((_, i) => i !== index));
    }

     /* -----------------------------
    ----- PRODUCTION LIST -----------
    -------------------------------*/

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

    /* ------------------------
    ----- PRESS LIST ----------
    -------------------------*/

    const handleAddPress = () => {
        setPressList([...pressList, { quote: '', mediaName: '', mediaLink: ''}]);
    };
    const handleSupprPress = (index) => {
        setPressList (pressList.filter((_, i) => i !== index));
    }

    /* ------------------------
    ----- LINKS LIST ----------
    -------------------------*/

    const handleAddLink = () => {
        setLinksList([...linksList, { linkName: '', linkUrl: ''}]);
    };
    const handleSupprLink = (index) => {
        setLinksList (linksList.filter((_, i) => i !== index));
    }

    /* ------------------------
    ----- LINKS LIST ----------
    -------------------------*/

    const handleAddDiff = () => {
        setDiffusionList([...diffusionList, { dates: '', city: '', placeName: '', placeLink:''}]);
    };
    const handleSupprDiff = (index) => {
        setDiffusionList (diffusionList.filter((_, i) => i !== index));
    }



    return  (      
        <form className='projectForm'>

            {/* CHAMPS TITRE */}
            <div className='projectForm_projectTitle'>
                <label htmlFor='inputProjectTitle'>TITRE*</label>
                <input type='text' id='inputProjectTitle' ref={inputProjectTitleRef} defaultValue={projectFormMode==='edit'? projectEdit.title : null}></input>
            </div>

            {/* CHAMPS SOUS-TITRE */}
            <div className='projectForm_projectSubTitle'>
                <label htmlFor='inputProjectSubTitle'>SOUS-TITRE</label>
                <input type='text' id='inputProjectSubTitle' ref={inputProjectSubTitleRef} defaultValue={projectFormMode==='edit'? projectEdit.subtitle : null}></input>
            </div>

            {/* CHAMPS INFOS COMPAGNIE*/}
            <div className='projectForm_projectInfos'>
                <label htmlFor='inputProjectInfos'>INFORMATIONS COMPAGNIE</label>
                <input type='text' id='inputProjectInfos' ref={inputProjectInfosRef} defaultValue={projectFormMode==='edit'? projectEdit.projectInfos : null}></input>
            </div>

            {/* CHAMPS PLUS D'INFOS*/}
            <div className='projectForm_moreInfos'>
                <label htmlFor='inputMoreInfos'>PLUS D'INFOS</label>
                <input type='text' id='inputMoreInfos' ref={inputMoreInfosRef} defaultValue={projectFormMode==='edit'? projectEdit.moreInfos : null}></input>
            </div>

            {/* CHAMPS A PROPOS DU SPECTACLE*/}
            <div className='projectForm_aboutShow'>
                <label htmlFor='inputAboutShow'>À PROPOS DU SPECTACLE</label>
                <input type='textarea' id='inputAboutShow' ref={inputAboutShowRef} defaultValue={projectFormMode==='edit'? projectEdit.aboutShow : null}></input>
            </div>

            {/* CHAMPS A PROPOS DE LA SCENO*/}
            <div className='projectForm_aboutSceno'>
                <label htmlFor='inputAboutSceno'>À PROPOS DE LA SCÉNOGRAPHIE</label>
                <input type='textarea' id='inputAboutSceno' ref={inputAboutScenoRef} defaultValue={projectFormMode==='edit'? projectEdit.aboutSceno : null}></input>
            </div>

            {/* CHAMPS TYPE DE PROJET*/}
            <div className='projectForm_projectType'>
                <label htmlFor='inputProjectType'>TYPE DE PROJET*</label>
                <select id='inputProjectType' 
                        ref={inputProjectTypeRef} 
                        name="projectType"
                        defaultValue={projectFormMode==='edit'? projectEdit.projectType : ""}>
                    <option value=""></option>
                    <option value="spectacle vivant">Spectacle vivant</option>
                    <option value="évènement">Évènement</option>
                    <option value="médiation">Médiation</option>
                </select>
            </div>

            {/* CHAMPS DISTRIBUTION*/}
            <div className='projectForm_projectArtistsList'>
                <p> DISTRIBUTION </p>
                {artistsList.map((artist, index) => (
                    <div key={index}>
                        <div>
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
                        <div>
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
            <div className='projectForm_projectProductionList'>
                <p> PRODUCTION </p>
                {productionList.map((production, index) => (
                    <div key={index}>
                        <div>
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
                        <div>
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
                        <div>
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
                        <div>
                            <label htmlFor={`inputProjectProductionType${index}`}>TYPE</label>
                            <select id={`inputProjectProductionType${index}`} 
                                    defaultValue={projectFormMode==='edit'? production.prodType : ""}
                                    onChange={(e) => handleProdTypeSelectChange(index, e.target.value)}>
                                <option value=""></option>
                                <option value="Co-production">Co-production</option>
                                <option value="Accueils en résidence de création">Accueils en résidence de création</option>
                                <option value="Aide à la création">Aide à la création</option>
                            </select>
                        </div>
                        <button type='button' onClick={() => handleSupprProduction(index)}>SUPPRIMER</button>
                    </div>              
                ))}
                <button type='button' onClick={() =>handleAddProduction()} >+ AJOUTER UN MEMBRE DE L'EQUIPE DE PROD</button>
            </div>
            
            {/* CHAMPS PRESSE*/}
            <div className='projectForm_projectPressList'>
                <p> PRESSE </p>
                {pressList.map((press, index) => (
                    <div key={index}>
                        <div>
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
                        <div>
                            <label htmlFor={`inputProjectPressMediaName${index}`}>NOM DU MEDIA</label>
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
                        <div>
                            <label htmlFor={`inputProjectPressMediaLink${index}`}>LIEN VERS L'ARTICLE</label>
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
            <div className='projectForm_projectLinks'>
                <p> LIENS VIDÉOS/COMPAGNIE/ETC. </p>
                {linksList.map((link, index) => (
                    <div key={index}>
                        <div>
                            <label htmlFor={`inputProjectLinkName${index}`}>NOM DU LIEN</label>
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
                        <div>
                            <label htmlFor={`inputProjectLinkUrl${index}`}>URL DU LIEN</label>
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
            <div className='projectForm_projectDiffusion'>
                <p> DIFFUSION </p>
                {diffusionList.map((diff, index) => (
                    <div key={index}>
                        <div>
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
                        <div>
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
                        <div>
                            <label htmlFor={`inputProjectPlaceName${index}`}>NOM DU LIEU</label>
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
                        <div>
                            <label htmlFor={`inputProjectPlaceLink${index}`}>LIEN DU LIEU</label>
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

        </form>
    )
}

export default ProjectForm