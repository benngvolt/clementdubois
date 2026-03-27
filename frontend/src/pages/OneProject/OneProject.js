// import './OneProject.scss'
// import { API_URL } from '../../utils/constants'
// import React, { useState, useEffect, useContext } from 'react'
// import { useParams } from 'react-router-dom'
// import { ProjectsContext } from '../../utils/ProjectsContext'
// import DOMPurify from 'dompurify';
// import Collapse from '../../components/Collapse/Collapse';
// import ImageFocus from '../../components/ImageFocus/ImageFocus';
 
// function OneProject() {

//     const { slug } = useParams();
//     const [project, setProject] = useState({});
//     const { setDisplayHeader, displayHeader } = useContext(ProjectsContext);
    
//     const [imageFocusUrl, setImageFocusUrl]=useState('');
//     const [displayImageFocus, setDisplayImageFocus]= useState(false);

//     const cleanedAboutShow = DOMPurify.sanitize(project.aboutShow);
//     const cleanedAboutSceno = DOMPurify.sanitize(project.aboutSceno);

//     /* -------------------------
//        MEDIA HELPERS
//     ------------------------- */

//     function getMediaType(media) {
//         const fileType = media?.fileType || '';

//         if (fileType.startsWith('video/')) return 'video';
//         if (fileType.startsWith('image/')) return 'image';
//         if (media?.imageUrl) return 'image'; // legacy images
//         return null;
//     }

//     function renderProjectMedia(media, className = '', alt = '') {

//         if (!media?.imageUrl) return null;

//         const mediaType = getMediaType(media);

//         if (mediaType === 'video') {
//             return (
//                 <video
//                     className={className}
//                     src={media.imageUrl}
//                     muted
//                     autoPlay
//                     loop
//                     playsInline
//                     preload="metadata"
//                 />
//             );
//         }

//         if (mediaType === 'image') {
//             return (
//                 <img
//                     className={className}
//                     src={media.imageUrl}
//                     alt={alt}
//                 />
//             );
//         }

//         return null;
//     }

//     /* -------------------------
//        FETCH PROJECT
//     ------------------------- */

//     useEffect(() => {
//         fetch(`${API_URL}/api/projects/${slug}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 window.scrollTo(0, 0);
//                 setProject(data);
//             })
//             .catch((error) => console.log(error.message));
//     }, [slug]);

//     const prodTypeArray = Array.from(
//         new Set(project.productionList?.map(prod => prod.prodType) || [])
//     );

//     return  (      
//         <main
//             onClick={()=>displayHeader===true && setDisplayHeader(false)}
//             className='oneProject'
//         >
            
//             {/* TITRE */}
//             <div className='oneProject_titleContainer'>
//                 <div className='oneProject_titleContainer_title'>
//                     <h4 translate="no">{project.title}</h4>
//                     <p translate="no">{project.subtitle}</p>
//                 </div>

//                 <p className='oneProject_titleContainer_projectInfos'>
//                     {project.projectInfos}
//                 </p>
//             </div>

//             {/* MEDIA 1 */}
//             {project.projectImages?.length > 0 && 
//             <div className='oneProject_firstImageContainer'>
//                 {renderProjectMedia(
//                     project.projectImages[0],
//                     '',
//                     `média 1 du projet ${project.title}`
//                 )}
//             </div>
//             }
            
//             {/* INFOS */}
//             <section className='oneProject_firstInfosBlock'>

//                 {cleanedAboutShow && cleanedAboutSceno &&
//                 <div className='oneProject_firstInfosBlock_showAndSceno'>

//                     {cleanedAboutShow && 
//                     <div className='oneProject_firstInfosBlock_showAndSceno_showBlock'>
//                         <h5>
//                             {project.projectType==='spectacle vivant'
//                                 ? 'La pièce'
//                                 : (project.projectType==='évènement'
//                                     ? "L'évènement"
//                                     : 'Le contexte')}
//                         </h5>

//                         <p dangerouslySetInnerHTML={{__html:cleanedAboutShow}}></p>
//                     </div>
//                     }

//                     {cleanedAboutSceno && 
//                     <div className='oneProject_firstInfosBlock_showAndSceno_scenoBlock'>

//                         {(project.projectType==='spectacle vivant'
//                             || project.projectType==='évènement') &&
//                             <h5>La scénographie</h5>
//                         }

//                         <p dangerouslySetInnerHTML={{__html:cleanedAboutSceno}}></p>
//                     </div>
//                     }

//                 </div>
//                 }

//                 {/* DISTRIBUTION */}
//                 <div className='oneProject_firstInfosBlock_distributionAndLinks'>

//                     {project.artistsList?.length > 0 &&
//                     <div className='oneProject_firstInfosBlock_distributionAndLinks_distribution'>

//                         <h5>
//                             {project.projectType==='spectacle vivant'
//                                 ? 'Distribution'
//                                 : "L'équipe"}
//                         </h5>

//                         <ul className='oneProject_firstInfosBlock_distributionAndLinks_distribution_list'>
//                             {project.artistsList.map((artist)=>(
//                             <li key={artist._id}>
//                                 <p>
//                                     <span>{artist.artistFunction}</span>
//                                     {artist.artistName}
//                                 </p>
//                             </li>
//                             ))}
//                         </ul>

//                     </div>
//                     }

//                     {project.links?.length > 0 &&
//                     <ul className='oneProject_firstInfosBlock_distributionAndLinks_links'>

//                         {project.links.map((link) => (
//                         <li key={link._id}>
//                             <a
//                                 href={link.linkUrl}
//                                 target='_blank'
//                                 rel='noreferrer'
//                                 aria-label={`Accéder au lien ${link.linkName}`}
//                             >
//                                 {link.linkName}
//                             </a>
//                         </li>
//                         ))}

//                     </ul>
//                     }

//                 </div>

//             </section>

//             {/* MEDIA 2 à 4 */}

//             {project.projectImages?.length > 1 && 
//             <section className={`oneProject_secondImageContainer_${project.projectImages.length}`}>

//                 {project.projectImages.slice(1, 4).map((media, index) => (
//                     <React.Fragment key={media._id || media.imageUrl || index}>
//                         {renderProjectMedia(
//                             media,
//                             `oneProject_secondImageContainer_${project.projectImages.length}_img_${index}`,
//                             `média ${index + 2} du projet ${project.title}`
//                         )}
//                     </React.Fragment>
//                 ))}

//             </section>
//             }

//             {/* PRESSE */}

//             {project.press?.length > 0 && 
//             <section className='oneProject_pressBlocks'>

//                 <ul className='oneProject_pressBlocks_container'>

//                     {project.press.map((press)=>(
//                     <li key={press._id}>

//                         <h6>{press.mediaName}</h6>

//                         <p>{press.quote}</p>

//                         <a
//                             href={press.mediaLink}
//                             target='_blank'
//                             rel='noreferrer'
//                         >
//                             lien vers l'article
//                         </a>

//                     </li>
//                     ))}

//                 </ul>

//             </section>
//             }

//             {/* MEDIA 5 à 15 */}

//             {project.projectImages?.length > 4 &&
//             project.projectImages?.length <= 15 &&

//             <section className={`oneProject_thirdImageContainer oneProject_thirdImageContainer_${project.projectImages.length}`}> 

//                 {project.projectImages.slice(4, 15).map((media, index) => (

//                     <React.Fragment key={media._id || media.imageUrl || index}>

//                         {renderProjectMedia(
//                             media,
//                             `oneProject_thirdImageContainer_${project.projectImages.length}_img_${index}`,
//                             `média ${index + 5} du projet ${project.title}`
//                         )}

//                     </React.Fragment>

//                 ))}

//             </section>}

//             {/* PRODUCTION */}

//             {project.productionList?.length > 0 &&    
//             <Collapse title="Production" style='white'>

//                 <div className='oneProject_productionBlocks'>

//                     <div className='oneProject_productionBlocks_container'>

//                         {prodTypeArray.map((prodType, index) => (

//                             <div
//                                 key={prodType}
//                                 className={
//                                     index % 2 === 0
//                                     ? 'oneProject_productionBlocks_container_block oneProject_productionBlocks_container_block--leftText'
//                                     : 'oneProject_productionBlocks_container_block oneProject_productionBlocks_container_block--rightText'
//                                 }
//                             >

//                                 <h6>{prodType}</h6>

//                                 <ul>

//                                     {project.productionList
//                                     ?.filter(prodFiltered => prodFiltered.prodType === prodType)
//                                     .map((prod) => (

//                                         <li key={prod._id}>

//                                             <a href={prod.prodLink}>
//                                                 {prod.prodName}
//                                             </a>

//                                             <span>{prod.prodInfos}</span>

//                                         </li>

//                                     ))}

//                                 </ul>

//                             </div>

//                         ))}

//                     </div>

//                 </div>

//             </Collapse>
//             }

//             {/* DIFFUSION */}

//             {project.diffusionList?.length > 0 &&
//             <Collapse title="Lieux de diffusion" style='light'>

//                 <div className='oneProject_diffBlock'>

//                     <ul>

//                         {project.diffusionList.map((diff)=>(

//                             <li key={diff._id}>

//                                 <a
//                                     href={diff.placeLink}
//                                     target='_blank'
//                                     rel='noreferrer'
//                                 >
//                                     {diff.placeName}
//                                 </a>

//                                 <span>
//                                     {diff.city} {diff.dates}
//                                 </span>

//                             </li>

//                         ))}

//                     </ul>

//                 </div>

//             </Collapse>
//             }

//         </main>
//     )
// }

// export default OneProject

import './OneProject.scss'
import { API_URL } from '../../utils/constants'
import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectsContext } from '../../utils/ProjectsContext'
import DOMPurify from 'dompurify'
import Collapse from '../../components/Collapse/Collapse'
import ImageFocus from '../../components/ImageFocus/ImageFocus'

function OneProject() {
    const { slug } = useParams()
    const { setDisplayHeader, displayHeader } = useContext(ProjectsContext)

    const [project, setProject] = useState({})
    const [imageFocusUrl, setImageFocusUrl] = useState('')
    const [displayImageFocus, setDisplayImageFocus] = useState(false)

    useEffect(() => {
        let isMounted = true

        fetch(`${API_URL}/api/projects/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                if (!isMounted) return

                window.scrollTo(0, 0)
                setProject(data)
            })
            .catch((error) => console.log(error.message))

        return () => {
            isMounted = false
        }
    }, [slug])

    const cleanedAboutShow = useMemo(() => {
        return DOMPurify.sanitize(project.aboutShow || '')
    }, [project.aboutShow])

    const cleanedAboutSceno = useMemo(() => {
        return DOMPurify.sanitize(project.aboutSceno || '')
    }, [project.aboutSceno])

    const projectImages = project.projectImages || []
    const artistsList = project.artistsList || []
    const links = project.links || []
    const pressList = project.press || []
    const productionList = project.productionList || []
    const diffusionList = project.diffusionList || []

    const firstMedia = projectImages[0]
    const secondMediaGroup = projectImages.slice(1, 4)
    const thirdMediaGroup = projectImages.slice(4, 15)

    const hasShowAndSceno = Boolean(cleanedAboutShow && cleanedAboutSceno)

    const sectionTitle = useMemo(() => {
        if (project.projectType === 'spectacle vivant') return 'La pièce'
        if (project.projectType === 'évènement') return "L'évènement"
        return 'Le contexte'
    }, [project.projectType])

    const distributionTitle = useMemo(() => {
        return project.projectType === 'spectacle vivant' ? 'Distribution' : "L'équipe"
    }, [project.projectType])

    const showScenoTitle = useMemo(() => {
        return (
            project.projectType === 'spectacle vivant' ||
            project.projectType === 'évènement'
        )
    }, [project.projectType])

    const prodTypeArray = useMemo(() => {
        return Array.from(
            new Set(productionList.map((prod) => prod.prodType))
        )
    }, [productionList])

    const productionByType = useMemo(() => {
        return productionList.reduce((acc, prod) => {
            if (!acc[prod.prodType]) {
                acc[prod.prodType] = []
            }

            acc[prod.prodType].push(prod)
            return acc
        }, {})
    }, [productionList])

    const getMediaType = useCallback((media) => {
        const fileType = media?.fileType || ''

        if (fileType.startsWith('video/')) return 'video'
        if (fileType.startsWith('image/')) return 'image'
        if (media?.imageUrl) return 'image'

        return null
    }, [])

    const renderProjectMedia = useCallback((media, className = '', alt = '') => {
        if (!media?.imageUrl) return null

        const mediaType = getMediaType(media)

        if (mediaType === 'video') {
            return (
                <video
                    className={className}
                    src={media.imageUrl}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                />
            )
        }

        if (mediaType === 'image') {
            return (
                <img
                    className={className}
                    src={media.imageUrl}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                />
            )
        }

        return null
    }, [getMediaType])

    return (
        <main
            className='oneProject'
            onClick={() => displayHeader === true && setDisplayHeader(false)}
        >
            <div className='oneProject_titleContainer'>
                <div className='oneProject_titleContainer_title'>
                    <h4 translate='no'>{project.title}</h4>
                    <p translate='no'>{project.subtitle}</p>
                </div>

                <p className='oneProject_titleContainer_projectInfos'>
                    {project.projectInfos}
                </p>
            </div>

            {firstMedia && (
                <div className='oneProject_firstImageContainer'>
                    {renderProjectMedia(
                        firstMedia,
                        '',
                        `média 1 du projet ${project.title}`
                    )}
                </div>
            )}

            <section className='oneProject_firstInfosBlock'>
                {hasShowAndSceno && (
                    <div className='oneProject_firstInfosBlock_showAndSceno'>
                        {cleanedAboutShow && (
                            <div className='oneProject_firstInfosBlock_showAndSceno_showBlock'>
                                <h5>{sectionTitle}</h5>

                                <p
                                    dangerouslySetInnerHTML={{ __html: cleanedAboutShow }}
                                />
                            </div>
                        )}

                        {cleanedAboutSceno && (
                            <div className='oneProject_firstInfosBlock_showAndSceno_scenoBlock'>
                                {showScenoTitle && <h5>La scénographie</h5>}

                                <p
                                    dangerouslySetInnerHTML={{ __html: cleanedAboutSceno }}
                                />
                            </div>
                        )}
                    </div>
                )}

                <div className='oneProject_firstInfosBlock_distributionAndLinks'>
                    {artistsList.length > 0 && (
                        <div className='oneProject_firstInfosBlock_distributionAndLinks_distribution'>
                            <h5>{distributionTitle}</h5>

                            <ul className='oneProject_firstInfosBlock_distributionAndLinks_distribution_list'>
                                {artistsList.map((artist) => (
                                    <li key={artist._id}>
                                        <p>
                                            <span>{artist.artistFunction}</span>
                                            {artist.artistName}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {links.length > 0 && (
                        <ul className='oneProject_firstInfosBlock_distributionAndLinks_links'>
                            {links.map((link) => (
                                <li key={link._id}>
                                    <a
                                        href={link.linkUrl}
                                        target='_blank'
                                        rel='noreferrer'
                                        aria-label={`Accéder au lien ${link.linkName}`}
                                    >
                                        {link.linkName}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>

            {secondMediaGroup.length > 0 && (
                <section className={`oneProject_secondImageContainer_${projectImages.length}`}>
                    {secondMediaGroup.map((media, index) => (
                        <React.Fragment key={media._id || media.imageUrl || index}>
                            {renderProjectMedia(
                                media,
                                `oneProject_secondImageContainer_${projectImages.length}_img_${index}`,
                                `média ${index + 2} du projet ${project.title}`
                            )}
                        </React.Fragment>
                    ))}
                </section>
            )}

            {pressList.length > 0 && (
                <section className='oneProject_pressBlocks'>
                    <ul className='oneProject_pressBlocks_container'>
                        {pressList.map((press) => (
                            <li key={press._id}>
                                <h6>{press.mediaName}</h6>
                                <p>{press.quote}</p>
                                <a
                                    href={press.mediaLink}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    lien vers l'article
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {projectImages.length > 4 && projectImages.length <= 15 && (
                <section className={`oneProject_thirdImageContainer oneProject_thirdImageContainer_${projectImages.length}`}>
                    {thirdMediaGroup.map((media, index) => (
                        <React.Fragment key={media._id || media.imageUrl || index}>
                            {renderProjectMedia(
                                media,
                                `oneProject_thirdImageContainer_${projectImages.length}_img_${index}`,
                                `média ${index + 5} du projet ${project.title}`
                            )}
                        </React.Fragment>
                    ))}
                </section>
            )}

            {productionList.length > 0 && (
                <Collapse title='Production' style='white'>
                    <div className='oneProject_productionBlocks'>
                        <div className='oneProject_productionBlocks_container'>
                            {prodTypeArray.map((prodType, index) => (
                                <div
                                    key={prodType}
                                    className={
                                        index % 2 === 0
                                            ? 'oneProject_productionBlocks_container_block oneProject_productionBlocks_container_block--leftText'
                                            : 'oneProject_productionBlocks_container_block oneProject_productionBlocks_container_block--rightText'
                                    }
                                >
                                    <h6>{prodType}</h6>

                                    <ul>
                                        {productionByType[prodType]?.map((prod) => (
                                            <li key={prod._id}>
                                                <a href={prod.prodLink}>
                                                    {prod.prodName}
                                                </a>

                                                <span>{prod.prodInfos}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </Collapse>
            )}

            {diffusionList.length > 0 && (
                <Collapse title='Lieux de diffusion' style='light'>
                    <div className='oneProject_diffBlock'>
                        <ul>
                            {diffusionList.map((diff) => (
                                <li key={diff._id}>
                                    <a
                                        href={diff.placeLink}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        {diff.placeName}
                                    </a>

                                    <span>
                                        {diff.city} {diff.dates}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Collapse>
            )}

            {displayImageFocus && imageFocusUrl && (
                <ImageFocus
                    imageFocusUrl={imageFocusUrl}
                    setImageFocusUrl={setImageFocusUrl}
                    displayImageFocus={displayImageFocus}
                    setDisplayImageFocus={setDisplayImageFocus}
                />
            )}
        </main>
    )
}

export default OneProject