import './HomePage.scss'
import Loader from '../Loader/Loader'
import { ProjectsContext } from '../../utils/ProjectsContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
    
function HomePage() {

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
        <div className='homePage'>
            <div className={loaderDisplay===true?'homePage_loader--displayOn':'homePage_loader--displayOff'}>
                <Loader className='loader--opaque' loaderDisplay={loaderDisplay}/>
            </div>
            {homeImage &&
                <img className='homePage_image'src={homeImage} alt="image d'accueil" />
            }
            {!homeImage &&
                <div className='homePage_image homePage_image--blackBg'></div>
            }
            <div className='homePage_button'>
                <Link to="/projets" aria-label="Accéder à la page Projets"><h1> Clément Dubois<br/>Scénographe </h1></Link>
            </div>
        </div>
    )
}

export default HomePage