import './InformationsForm.scss'
import { useEffect, useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import { v4 as uuidv4 } from 'uuid'
import { API_URL } from '../../utils/constants'
import ConfirmBox from '../ConfirmBox/ConfirmBox'
import Loader from '../Loader/Loader'
import ErrorText from '../ErrorText/ErrorText'
import ValidBox from '../ValidBox/ValidBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import welcome02 from '../../assets/welcome02.png'

function InformationsForm({
  informationsEdit,              // l’objet actuel (chargé depuis ton API)
  setHandleDisplayInformationsForm,
  handleDisplayInformationsForm,
  handleReloadInformations,       // callback pour re-fetch après save
}) {
  const token = window.sessionStorage.getItem('1')

  // ------- refs inputs (si tu veux rester proche de ton style actuel)
  const bioRef = useRef(null)

  const firstInputRef = useRef(null)
  const secondInputRef = useRef(null)
  const thirdInputRef = useRef(null)

  // ------- state texte
  const [bioParagraph, setBioParagraph] = useState('')
  const [manifesto, setManifesto] = useState([]) // [{ _id?, sentence }]
  const [collaborations, setCollaborations] = useState([]) // [{ _id?, collabName, collabUrl, collabImgUrl, collabImageFile? }]

  // ------- state images principales (URL existante + éventuel File)
  const [firstPictureUrl, setFirstPictureUrl] = useState('')
  const [secondPictureUrl, setSecondPictureUrl] = useState('')
  const [thirdPictureUrl, setThirdPictureUrl] = useState('')

  const [firstPictureFile, setFirstPictureFile] = useState(null)
  const [secondPictureFile, setSecondPictureFile] = useState(null)
  const [thirdPictureFile, setThirdPictureFile] = useState(null)

  // previews (URL.createObjectURL)
  const [firstPreview, setFirstPreview] = useState('')
  const [secondPreview, setSecondPreview] = useState('')
  const [thirdPreview, setThirdPreview] = useState('')

  // ------- UI state
  const [loaderDisplay, setLoaderDisplay] = useState(false)
  const [displayServerError, setDisplayServerError] = useState(false)
  const [displayError, setDisplayError] = useState(false)
  const [displayValidBox, setDisplayValidBox] = useState(false)
  const [confirmBoxState, setConfirmBoxState] = useState(false)

  const openValidBox = () => {
    setDisplayValidBox(true)
    setTimeout(() => setDisplayValidBox(false), 2000)
  }

  // ------- init/reset à l’ouverture
  useEffect(() => {
    setDisplayError(false)
    setDisplayServerError(false)

    if (!informationsEdit) return

    const cleanedBio = DOMPurify.sanitize(informationsEdit.bioParagraph || '')

    setBioParagraph(cleanedBio)

    setFirstPictureUrl(informationsEdit.firstPictureUrl || '')
    setSecondPictureUrl(informationsEdit.secondPictureUrl || '')
    setThirdPictureUrl(informationsEdit.thirdPictureUrl || '')

    setFirstPictureFile(null)
    setSecondPictureFile(null)
    setThirdPictureFile(null)

    setFirstPreview('')
    setSecondPreview('')
    setThirdPreview('')

    setManifesto(Array.isArray(informationsEdit.manifesto) ? informationsEdit.manifesto : [])
    setCollaborations(Array.isArray(informationsEdit.collaborations) ? informationsEdit.collaborations : [])
  }, [informationsEdit, handleDisplayInformationsForm])

  // cleanup objectURLs
  useEffect(() => {
    return () => {
      if (firstPreview) URL.revokeObjectURL(firstPreview)
      if (secondPreview) URL.revokeObjectURL(secondPreview)
      if (thirdPreview) URL.revokeObjectURL(thirdPreview)
    }
  }, [firstPreview, secondPreview, thirdPreview])

  useEffect(() => {
    console.log('informationsEdit received by form:', informationsEdit)
  }, [informationsEdit])
  // ------- helpers manifesto
  const addManifestoSentence = () => {
    setManifesto((prev) => [...prev, { _id: uuidv4(), sentence: '' }])
  }

  const removeManifestoSentence = (index) => {
    setManifesto((prev) => prev.filter((_, i) => i !== index))
  }

  const updateManifestoSentence = (index, value) => {
    setManifesto((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], sentence: value }
      return next
    })
  }

  // ------- helpers collaborations
  const addCollaboration = () => {
    setCollaborations((prev) => [
      ...prev,
      {
        _id: uuidv4(),
        collabName: '',
        collabUrl: '',
        collabImgUrl: '',
        collabImageFile: null, // File si remplacé
        collabPreview: '',
      },
    ])
  }

  const removeCollaboration = (index) => {
    setCollaborations((prev) => {
      const item = prev[index]
      if (item?.collabPreview) URL.revokeObjectURL(item.collabPreview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const updateCollaborationField = (index, field, value) => {
    setCollaborations((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const handleCollabLogoChange = (index, file) => {
    if (!file) return
    setCollaborations((prev) => {
      const next = [...prev]
      const current = next[index]

      if (current?.collabPreview) URL.revokeObjectURL(current.collabPreview)

      next[index] = {
        ...current,
        collabImageFile: file,
        collabPreview: URL.createObjectURL(file),
      }
      return next
    })
  }

  // ------- images principales change
  const handleMainPictureChange = (which, file) => {
    if (!file) return

    if (which === 'first') {
      if (firstPreview) URL.revokeObjectURL(firstPreview)
      setFirstPictureFile(file)
      setFirstPreview(URL.createObjectURL(file))
    }
    if (which === 'second') {
      if (secondPreview) URL.revokeObjectURL(secondPreview)
      setSecondPictureFile(file)
      setSecondPreview(URL.createObjectURL(file))
    }
    if (which === 'third') {
      if (thirdPreview) URL.revokeObjectURL(thirdPreview)
      setThirdPictureFile(file)
      setThirdPreview(URL.createObjectURL(file))
    }
  }

  // ------- close form
  function closeForm() {
    setLoaderDisplay(false)
    setHandleDisplayInformationsForm(false)
    setDisplayError(false)
    setDisplayServerError(false)
    if (handleReloadInformations) handleReloadInformations()
  }

  function closeConfirmBox() {
    setConfirmBoxState(false)
  }

  // ------- submit
  async function informationsFormSubmit(e) {
    e.preventDefault()
    setLoaderDisplay(true)
    setDisplayError(false)
    setDisplayServerError(false)

    // mini validation (optionnelle)
    // ex: bio obligatoire
    if (!bioParagraph?.trim()) {
      setLoaderDisplay(false)
      setDisplayError(true)
      return
    }

    const fd = new FormData()
    fd.append('bioParagraph', bioRef.current?.value ?? bioParagraph)

    // on envoie les URLs existantes au cas où le backend veut "ne pas toucher" si pas de file
    fd.append('firstPictureUrl', firstPictureUrl || '')
    fd.append('secondPictureUrl', secondPictureUrl || '')
    fd.append('thirdPictureUrl', thirdPictureUrl || '')

    // manifesto & collaborations (sans les champs File / preview)
    const cleanManifesto = (manifesto || []).map((m) => ({
      sentence: m?.sentence ?? '',
    }))

    const cleanCollaborations = (collaborations || []).map((c) => ({
      collabName: c?.collabName ?? '',
      collabUrl: c?.collabUrl ?? '',
      collabImgUrl: c?.collabImgUrl ?? '', // si pas remplacé
    }))

    fd.append('manifesto', JSON.stringify(cleanManifesto))
    fd.append('collaborations', JSON.stringify(cleanCollaborations))

    // fichiers 3 images (si remplacées)
    if (firstPictureFile instanceof File) fd.append('firstPicture', firstPictureFile)
    if (secondPictureFile instanceof File) fd.append('secondPicture', secondPictureFile)
    if (thirdPictureFile instanceof File) fd.append('thirdPicture', thirdPictureFile)

    // fichiers collabs : on envoie les File + index
    collaborations.forEach((c, index) => {
      if (c?.collabImageFile instanceof File) {
        fd.append('collabImages', c.collabImageFile)
        fd.append('collabFileIndexes', String(index))
      }
    })

    try {
      const res = await fetch(`${API_URL}/api/informations`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      })

      if (!res.ok) {
        setDisplayServerError(true)
        setLoaderDisplay(false)
        return
      }

      setLoaderDisplay(false)
      openValidBox()
      if (handleReloadInformations) handleReloadInformations()
    } catch (err) {
      console.error(err)
      setDisplayServerError(true)
      setLoaderDisplay(false)
    }
  }

  return (
      <form onSubmit={informationsFormSubmit} className="informationsForm">
        <button 
          type="button"
          className="informationsForm_stickyCancelButton"
          onClick={() => setConfirmBoxState(true)}
          aria-label="Fermer">
          <FontAwesomeIcon icon={faXmark} className='projectForm_stickyCancelButton_icon'/>
        </button>
        {/* WELCOME */}
        <div className='informationsForm_welcomeContainer'> 
            <img className='informationsForm_welcomeContainer_imageWelcome'src={welcome02} alt='image de bienvenue'/>
            {/* <p className='projectForm_welcomeContainer_secondWelcome'> Prends-toi tranquille un café avant de te mettre au boulot...</p> */}
        </div>
        <div className="informationsForm_bioContainer">
          <div className="informationsForm_bioContainer_textField">
            <label htmlFor="bioParagraph">BIOGRAPHIE</label>
            <textarea
              id="bioParagraph"
              className="informationsForm_bioContainer_textField_textarea"
              ref={bioRef}
              value={bioParagraph?.replace(/<br>/g, "\n")}
              onChange={(e) => setBioParagraph(e.target.value)}
              rows={8}
            />
          </div>
        </div>
    
       
        <div className="informationsForm_imagesFieldsContainer">
          <div className="informationsForm_imagesFieldsContainer_projectImagesContainer">
            <p className="informationsForm_imagesFieldsContainer_projectImagesContainer_title">IMAGES</p>
    
            <div className="informationsForm_imagesFieldsContainer_projectImagesContainer_imagesGrid">
             
              <div className="informationsForm_imagesFieldsContainer_projectImagesContainer_imageCard">
                <p>IMAGE 1</p>
    
                {(firstPreview || firstPictureUrl) && (
                  <img className="informationsForm_imagesFieldsContainer_projectImagesContainer_imageCard_preview" src={firstPreview || firstPictureUrl} alt="" />
                )}
    
                <label 
                  className="informationsForm_imagesFieldsContainer_projectImagesContainer_imageCard_button"
                  htmlFor="firstPicture">
                  {firstPreview ? "CHANGER D'IMAGE" : "+ AJOUTER UNE IMAGE"}
                </label>
                <input
                  id="firstPicture"
                  ref={firstInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMainPictureChange("first", e.target.files?.[0])}
                  style={{ display: "none" }}
                />
              </div>
    
              
              <div className="informationsForm_imagesFieldsContainer_projectImagesContainer_imageCard">
                <p>IMAGE 2</p>
    
                {(secondPreview || secondPictureUrl) && (
                  <img className="informationsForm_imagesFieldsContainer_projectImagesContainer_imageCard_preview" src={secondPreview || secondPictureUrl} alt="" />
                )}
    
                <label 
                  htmlFor="secondPicture"
                  className="informationsForm_imagesFieldsContainer_projectImagesContainer_imageCard_button"  
                    >
                  {secondPreview ? "CHANGER D'IMAGE" : "+ AJOUTER UNE IMAGE"}
                </label>
                <input
                  id="secondPicture"
                  ref={secondInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMainPictureChange("second", e.target.files?.[0])}
                  style={{ display: "none" }}
                />
              </div>
    
              
              <div className="informationsForm_imagesFieldsContainer_projectImagesContainer_imageCard">
                <p>IMAGE 3</p>
    
                {(thirdPreview || thirdPictureUrl) && (
                  <img className="informationsForm_imagesFieldsContainer_projectImagesContainer_imageCard_preview" src={thirdPreview || thirdPictureUrl} alt="" />
                )}
    
                <label 
                  htmlFor="thirdPicture"
                  className="informationsForm_imagesFieldsContainer_projectImagesContainer_imageCard_button"
                  >
                  {thirdPreview ? "+ CHANGER D'IMAGE" : "+ AJOUTER UNE IMAGE"}
                </label>
                <input
                  id="thirdPicture"
                  ref={thirdInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMainPictureChange("third", e.target.files?.[0])}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
    
      
          <div className="informationsForm_manifestoContainer">
            <p className="informationsForm_manifestoContainer_title">MANIFESTE</p>
    
            {(manifesto || []).map((m, index) => (
              <div key={m._id || index} className="informationsForm_manifestoContainer_fields">
                <div className="informationsForm_manifestoContainer_fields_line">
                  {/* <label htmlFor={`manifesto-${index}`}>PHRASE</label> */}
                  <input
                   
                    id={`manifesto-${index}`}
                    type="text"
                    value={m.sentence || ""}
                    onChange={(e) => updateManifestoSentence(index, e.target.value)}
                    placeholder="Une phrase…"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => removeManifestoSentence(index)}
                  >
                  SUPPRIMER
                </button>
              </div>
            ))}
    
            <button className="informationsForm_manifestoContainer_addButton" type="button" onClick={addManifestoSentence}>
              + AJOUTER
            </button>
          </div>
    
          
          <div className="informationsForm_partnersContainer">
            <p className="informationsForm_partnersContainer_title">COLLABORATIONS</p>
            <div className="informationsForm_partnersContainer_grid">
              {(collaborations || []).map((c, index) => (
              <div key={c._id || index} className="informationsForm_partnersContainer_fields informationsForm_partnersContainer_fields--stack">
                <div>
                  <div className="informationsForm_partnersContainer_fields_line">
                    <label htmlFor={`collabName-${index}`}>NOM</label>
                    <input
                      id={`collabName-${index}`}
                      type="text"
                      value={c.collabName || ""}
                      onChange={(e) => updateCollaborationField(index, "collabName", e.target.value)}
                    />
                  </div>
      
                  <div className="informationsForm_partnersContainer_fields_line">
                    <label htmlFor={`collabUrl-${index}`}>URL</label>
                    <input
                      id={`collabUrl-${index}`}
                      type="text"
                      value={c.collabUrl || ""}
                      onChange={(e) => updateCollaborationField(index, "collabUrl", e.target.value)}
                    />
                  </div>
      
                  <div className="informationsForm_partnersContainer_fields_line">
                    <div className="informationsForm_partnersContainer_fields_line_logoLine">
                      <label htmlFor={`collabLogo-${index}`} className="informationsForm_partnersContainer_fields_line_logoLine_button">
                        {c.collabPreview ? "+ CHANGER LE LOGO" : "+ AJOUTER UN LOGO"}
                      </label>
                      {(c.collabPreview || c.collabImgUrl) && (
                        <img src={c.collabPreview || c.collabImgUrl} alt="" />
                      )}
      
                      
                      <input
                        id={`collabLogo-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleCollabLogoChange(index, e.target.files?.[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
                <button className="informationsForm_partnersContainer_fields_line_button" type="button" onClick={() => removeCollaboration(index)}>
                  SUPPRIMER COLLAB.
                </button>
              </div>
              ))}
              <div className="informationsForm_partnersContainer_fields--addCollab">
                <button  className="informationsForm_partnersContainer_fields--addCollab_button" type="button" onClick={addCollaboration}>
                  + AJOUTER UNE COLLAB
                </button>
              </div>
            </div>
          </div>
    
          
          <ErrorText errorText={"Une erreur s'est produite côté serveur"} state={displayServerError} />
          <ErrorText errorText={"Le champ BIO ne peut pas être vide"} state={displayError} />
    
          <div className="informationsForm_buttons">
            <button type="submit">ENVOYER</button>
            <button type="button" onClick={() => setConfirmBoxState(true)}>
              SORTIR
            </button>
          </div>
        
    
        
        <div className={loaderDisplay ? "informationsForm_loaderContainer--displayOn" : "informationsForm_loaderContainer--displayOff"}>
          <Loader className="loader--translucent" loaderDisplay={loaderDisplay} />
        </div>
    
 
        <ConfirmBox
          affirmativeChoice={closeForm}
          attribut={null}
          confirmBoxState={confirmBoxState}
          negativeChoice={closeConfirmBox}
        />
        <ValidBox validBoxState={displayValidBox} />
      </form>
    )
  }

export default InformationsForm