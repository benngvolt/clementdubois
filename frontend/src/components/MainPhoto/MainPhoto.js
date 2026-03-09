import './MainPhoto.scss'
import Loader from '../Loader/Loader'
import { ProjectsContext } from '../../utils/ProjectsContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
    
function MainPhoto() {

    const { loaderDisplay, projects} = useContext(ProjectsContext);
    const [randomImagesSelection, setRandomImageSelection] = useState ([]);
    const [homeImage, setHomeImage] = useState ('');
    /*----------------------------------------------------------------------
    ----- Création d'un tableau d'images random pour la landing page ------
    ----------------------------------------------------------------------*/
    const randomImagesUrlArray = projects
            .map(item => 
                item.projectImages
            .filter(image => image.inRandomSelection === true)
            .map(image => image.imageUrl)
            )
            .flat();
    
    useEffect(() => {
        setRandomImageSelection(randomImagesUrlArray);
    }, [projects]);
    
    useEffect(() => {
        if (randomImagesSelection.length > 0) {
            const randomIndex = Math.floor(Math.random() * randomImagesSelection.length);
            setHomeImage(randomImagesSelection[randomIndex]);
        }
    }, [randomImagesSelection]);

    return (
        <div className='mainPhoto'>
            <div className={loaderDisplay===true?'mainPhoto_loader--displayOn':'mainPhoto_loader--displayOff'}>
                <Loader className='loader--opaque' loaderDisplay={loaderDisplay}/>
            </div>
            {homeImage &&
                <img className='mainPhoto_image'src={homeImage} alt="image d'accueil" />
            }
            {!homeImage &&
                <div className='mainPhoto_image mainPhoto_image--blackBg'></div>
            }
            {/* <div className='mainPhoto_button'>
                <Link to="/projets" aria-label="Accéder à la page Projets"><h1> Clément Dubois<br/>Scénographe </h1></Link>
            </div> */}
        </div>
    )
}

export default MainPhoto