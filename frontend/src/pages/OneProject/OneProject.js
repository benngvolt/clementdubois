import './OneProject.scss'
import { API_URL } from '../../utils/constants'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify';
import Collapse from '../../components/Collapse/Collapse';
import ImageFocus from '../../components/ImageFocus/ImageFocus';
 
function OneProject() {

    const { id } = useParams();
    const [project, setProject] = useState([]);
    
    const [imageFocusUrl, setImageFocusUrl]=useState('');
    const [displayImageFocus, setDisplayImageFocus]= useState(false);
    const cleanedAboutShow = DOMPurify.sanitize(project.aboutShow);
    const cleanedAboutSceno = DOMPurify.sanitize(project.aboutSceno);



    useEffect(() => {
        fetch(`${API_URL}/api/projects/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProject(data);
            })
            .catch((error) => console.log(error.message));
    }, [id]);

    const prodTypeArray = Array.from(new Set(project.productionList?.map(prod => prod.prodType) || []));

    return  (      
        <section className='oneProject'>
            
            {/* TITRE/SOUS-TITRE/INFOS*/}
            <div className='oneProject_titleContainer'>
                <div className='oneProject_titleContainer_title'>
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                </div>
                <p className='oneProject_titleContainer_projectInfos'>{project.projectInfos}</p>
            </div>

            {/* IMAGE 1*/}
            {project.projectImages && project.projectImages.length > 0 && 
            <div className='oneProject_firstImageContainer'>
                <img src={project.projectImages[0].imageUrl} alt="Project" />                
            </div>
            }
            
            {/* A PROPOS SCENO/A PROPOS PROJET/DISTRIBUTION */}
            <div className='oneProject_firstInfosBlock'>
                {cleanedAboutShow && cleanedAboutSceno &&
                <div className='oneProject_firstInfosBlock_showAndSceno'>
                    {cleanedAboutShow && 
                    <div className='oneProject_firstInfosBlock_showAndSceno_showBlock'>
                        <h4>La pièce</h4>
                        <p dangerouslySetInnerHTML={{__html:cleanedAboutShow}}></p>
                    </div>
                    }
                    {cleanedAboutSceno && 
                    <div className='oneProject_firstInfosBlock_showAndSceno_scenoBlock'>
                        <h4>La scénographie</h4>
                        <p dangerouslySetInnerHTML={{__html:cleanedAboutSceno}}></p>
                    </div>
                    }
                </div>
                }
                <div className='oneProject_firstInfosBlock_distributionAndLinks'>
                    {project.artistsList && project.artistsList.length > 0 &&
                    <div className='oneProject_firstInfosBlock_distributionAndLinks_distribution'>
                        <h4>Distribution</h4>
                        <ul className='oneProject_firstInfosBlock_distributionAndLinks_distribution_list'>
                            {project.artistsList.map((artist)=>(
                                <li className='oneProject_firstInfosBlock_distributionAndLinks_distribution_list_item'>
                                    <p><span>{artist.artistFunction}</span> {artist.artistName}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    }
                    {project.links && project.links.length > 0 &&
                    <div className='oneProject_firstInfosBlock_distributionAndLinks_links'>
                        {project.links.map((link) => (
                            <a href={link.linkUrl} target='_blank' rel='noreferrer'>{link.linkName}</a>
                        ))
                    }
                    </div>
                    }
                </div>
            </div>
            
            {/* IMAGES 2 à 4 */}
            {project.projectImages?.length > 1 && 
                <div className={`oneProject_secondImageContainer_${project.projectImages.length}`}>
                    {project.projectImages.slice(1, 4).map((image, index) => (
                        <img className={`oneProject_secondImageContainer_${project.projectImages.length}_img_${index}`} key={index} src={image.imageUrl} alt="Project" />
                ))}
                </div>
            }
            
            {/* PRESSE */}
            {project.press && project.press.length > 0 && 
            <div className='oneProject_pressBlocks'>
                <ul className='oneProject_pressBlocks_container'>
                {project.press.map((press)=>(
                    <li className='oneProject_pressBlocks_container_item'>
                        <h5>{press.mediaName}</h5>
                        <p>{press.quote}</p>
                        <a href={press.mediaLink} target='_blank' rel='noreferrer'>lien vers l'article</a>
                    </li>
                ))}
                </ul>
            </div>
            }

            {/* IMAGES 5 à 15 */}
            {project.projectImages?.length > 4 && project.projectImages?.length <= 15 &&
            <div className={`oneProject_thirdImageContainer oneProject_thirdImageContainer_${project.projectImages.length}`}> 
                {project.projectImages.slice(4, 15).map((image, index) => (
                    <img className={`oneProject_thirdImageContainer_${project.projectImages.length}_img_${index}`} key={index} src={image.imageUrl} alt="Project" />
                ))}
            </div>}

            {/* IMAGES MAKING OF */}
            {project.makingOfImages && project.makingOfImages.length > 0 &&
            <Collapse title="Making Of" style='dark'>
                <div className="oneProject_makingOfImageContainer_imagesGrid">
                {project.makingOfImages.map((image, index) => (
                    <img key={index} src={image.imageUrl} alt="Project" onClick={()=>{ 
                        setImageFocusUrl(image.imageUrl);
                        setDisplayImageFocus(true);
                    }}/>
                ))}
                </div>
            </Collapse>
            }

            {/* PRODUCTION */}
            {project.productionList && project.productionList.length > 0 &&    
            <Collapse title="Production" style='color'>
                <div className='oneProject_productionBlocks'>
                    <div className='oneProject_productionBlocks_container'>
                        {prodTypeArray.map((prodType, index) => (
                            <div key={prodType} className={index % 2 === 0 ? 'oneProject_productionBlocks_container_block oneProject_productionBlocks_container_block--leftText' :'oneProject_productionBlocks_container_block oneProject_productionBlocks_container_block--rightText'} >
                                <h5>{prodType}</h5>
                                <ul className='oneProject_productionBlocks_container_block_list'>
                                    {project.productionList?.filter(prodFiltered => prodFiltered.prodType === prodType).map((prod) => (
                                        <li key={prod.prodName} className='oneProject_productionBlocks_container_block_list_item'>
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
                            <li className='oneProject_diffBlock_list_item'>
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

        </section>
    )
}

export default OneProject