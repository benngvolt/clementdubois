import './OneProject.scss'
import { API_URL } from '../../utils/constants'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectsContext } from '../../utils/ProjectsContext'
import DOMPurify from 'dompurify';
import Collapse from '../../components/Collapse/Collapse';
import ImageFocus from '../../components/ImageFocus/ImageFocus';
 
function OneProject() {

    const { id } = useParams();
    const [project, setProject] = useState([]);
    const { setDisplayHeader, displayHeader } = useContext(ProjectsContext);
    
    const [imageFocusUrl, setImageFocusUrl]=useState('');
    const [displayImageFocus, setDisplayImageFocus]= useState(false);
    const cleanedAboutShow = DOMPurify.sanitize(project.aboutShow);
    const cleanedAboutSceno = DOMPurify.sanitize(project.aboutSceno);

    useEffect(() => {
        fetch(`${API_URL}/api/projects/${id}`)
            .then((res) => res.json())
            .then((data) => {
                // setDisplayHeader(true);
                window.scrollTo(0, 0);
                setProject(data);
            })
            .catch((error) => console.log(error.message));
    }, [id]);

    const prodTypeArray = Array.from(new Set(project.productionList?.map(prod => prod.prodType) || []));

    return  (      
        <main onClick={()=>displayHeader===true && setDisplayHeader(false)} className='oneProject'>
            
            {/* TITRE/SOUS-TITRE/INFOS*/}
            <div className='oneProject_titleContainer'>
                <div className='oneProject_titleContainer_title'>
                    <h4>{project.title}</h4>
                    <p>{project.subtitle}</p>
                </div>
                <p className='oneProject_titleContainer_projectInfos'>{project.projectInfos}</p>
            </div>

            {/* IMAGE 1*/}
            {project.projectImages && project.projectImages.length > 0 && 
            <div className='oneProject_firstImageContainer'>
                <img src={project.projectImages[0].imageUrl} alt={`image 1 du projet ${project.title}`} />                
            </div>
            }
            
            {/* A PROPOS SCENO/A PROPOS PROJET/DISTRIBUTION */}
            <section className='oneProject_firstInfosBlock'>
                {cleanedAboutShow && cleanedAboutSceno &&
                <div className='oneProject_firstInfosBlock_showAndSceno'>
                    {cleanedAboutShow && 
                    <div className='oneProject_firstInfosBlock_showAndSceno_showBlock'>
                        <h5>{project.projectType==='spectacle vivant'?'La pièce':(project.projectType==='évènement'?'L\'évènement':'Le contexte')}</h5>
                        <p dangerouslySetInnerHTML={{__html:cleanedAboutShow}}></p>
                    </div>
                    }
                    {cleanedAboutSceno && 
                    <div className='oneProject_firstInfosBlock_showAndSceno_scenoBlock'>
                        {project.projectType==='spectacle vivant'|| project.projectType==='évènement' &&
                        <h5>La scénographie</h5>
                        }
                        <p dangerouslySetInnerHTML={{__html:cleanedAboutSceno}}></p>
                    </div>
                    }
                </div>
                }
                <div className='oneProject_firstInfosBlock_distributionAndLinks'>
                    {project.artistsList && project.artistsList.length > 0 &&
                    <div className='oneProject_firstInfosBlock_distributionAndLinks_distribution'>
                        <h5>{project.projectType==='spectacle vivant'?'Distribution':'L\'équipe'}</h5>
                        <ul className='oneProject_firstInfosBlock_distributionAndLinks_distribution_list'>
                            {project.artistsList.map((artist)=>(
                            <li key={artist._id} className='oneProject_firstInfosBlock_distributionAndLinks_distribution_list_item'>
                                <p><span>{artist.artistFunction}</span> {artist.artistName}</p>
                            </li>
                            ))}
                        </ul>
                    </div>
                    }
                    {project.links && project.links.length > 0 &&
                    <ul className='oneProject_firstInfosBlock_distributionAndLinks_links'>
                        {project.links.map((link) => (
                        <li key={link._id}>
                            <a href={link.linkUrl} 
                                target='_blank' 
                                rel='noreferrer'
                                aria-label={`Accéder au lien ${link.linkName}`}>
                                    {link.linkName}
                                </a>
                        </li>
                        ))
                    }
                    </ul>
                    }
                </div>
            </section>
            
            {/* IMAGES 2 à 4 */}
            {project.projectImages?.length > 1 && 
            <section className={`oneProject_secondImageContainer_${project.projectImages.length}`}>
                {project.projectImages.slice(1, 4).map((image, index) => (
                <img className={`oneProject_secondImageContainer_${project.projectImages.length}_img_${index}`} key={index} src={image.imageUrl} alt={`image ${index + 2} du projet ${project.title}`} />
                ))}
            </section>
            }
            
            {/* PRESSE */}
            {project.press && project.press.length > 0 && 
            <section className='oneProject_pressBlocks'>
                <ul className='oneProject_pressBlocks_container'>
                    {project.press.map((press)=>(
                    <li key={press._id} className='oneProject_pressBlocks_container_item'>
                        <h6>{press.mediaName}</h6>
                        <p>{press.quote}</p>
                        <a href={press.mediaLink} 
                            target='_blank' rel='noreferrer' 
                            aria-label={`Accéder à l'article de ${press.mediaName}`}>
                                lien vers l'article
                        </a>
                    </li>
                    ))}
                </ul>
            </section>
            }

            {/* IMAGES 5 à 15 */}
            {project.projectImages?.length > 4 && project.projectImages?.length <= 15 &&
            <section className={`oneProject_thirdImageContainer oneProject_thirdImageContainer_${project.projectImages.length}`}> 
                {project.projectImages.slice(4, 15).map((image, index) => (
                <img className={`oneProject_thirdImageContainer_${project.projectImages.length}_img_${index}`} key={index} src={image.imageUrl} alt={`image ${index + 5} du projet ${project.title}`}  />
                ))}
            </section>}

            {/* IMAGES MAKING OF */}
            {project.makingOfImages && project.makingOfImages.length > 0 &&
            <Collapse title="Processus" style='dark'>
                <div className="oneProject_makingOfImageContainer_imagesGrid">
                    {project.makingOfImages.map((image, index) => (
                    <img key={index} 
                        src={image.imageUrl} 
                        alt={`image ${index} du making of du projet ${project.title}`}
                        aria-label="Agrandir l'\image"
                        onClick={()=>{ 
                        setImageFocusUrl(image.imageUrl);
                        setDisplayImageFocus(true);
                    }}/>
                    ))}
                </div>
            </Collapse>
            }

            {/* PRODUCTION */}
            {project.productionList && project.productionList.length > 0 &&    
            <Collapse title="Production" style='white'>
                <div className='oneProject_productionBlocks'>
                    <div className='oneProject_productionBlocks_container'>
                        {prodTypeArray.map((prodType, index) => (
                            <div key={prodType} className={index % 2 === 0 ? 'oneProject_productionBlocks_container_block oneProject_productionBlocks_container_block--leftText' :'oneProject_productionBlocks_container_block oneProject_productionBlocks_container_block--rightText'} >
                                <h6>{prodType}</h6>
                                <ul className='oneProject_productionBlocks_container_block_list'>
                                    {project.productionList?.filter(prodFiltered => prodFiltered.prodType === prodType).map((prod) => (
                                        <li key={prod._id} className='oneProject_productionBlocks_container_block_list_item'>
                                            <a href={prod.prodLink}>{prod.prodName}</a>
                                            <span> {prod.prodInfos}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </Collapse>
            }

            {/* DIFFUSION */}
            {project.diffusionList && project.diffusionList.length > 0 &&
            <Collapse title="Lieux de diffusion" style='light'>
                <div className='oneProject_diffBlock'>
                    <ul className='oneProject_diffBlock_list'>
                        {project.diffusionList.map((diff)=>(
                            <li key={diff._id} className='oneProject_diffBlock_list_item'>
                                <a href={diff.placeLink} target='_blank' rel='noreferrer'>{diff.placeName}</a><span> {diff.city} {diff.dates}</span>
                            </li>  
                        ))}
                    </ul>
                </div>
            </Collapse>
            }
            {/* On sort la modale de focus hors d'un block pour qu'elle reste au premier plan. */}
            {project.makingOfImages &&
            <div className={displayImageFocus===true?'oneProject_makingOfImageContainer_imageFocusContainer--displayOn':'oneProject_makingOfImageContainer_imageFocusContainer--displayOff'}>
                <ImageFocus imageFocusUrl={imageFocusUrl} setImageFocusUrl={setImageFocusUrl} imagesArray={project.makingOfImages} setDisplayImageFocus={setDisplayImageFocus}/>
            </div>
            }

        </main>
    )
}

export default OneProject