import './HomePage.scss'
import Loader from '../Loader/Loader'
import { ProjectsContext } from '../../utils/ProjectsContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
    
function HomePage() {

    const { loaderDisplay, randomImagesSelection } = useContext(ProjectsContext);
    const randomIndex = Math.floor(Math.random() * randomImagesSelection.length)
    const homeImage = randomImagesSelection[randomIndex];
    console.log (homeImage);


    return (
        <div className='homePage'>
            <div className={loaderDisplay===true?'homePage_loader--displayOn':'homePage_loader--displayOff'}>
                <Loader/>
            </div>
            {homeImage && 
                <img className='homePage_image'src={homeImage} alt="Project" />
            }
            {!homeImage && 
                <div className='homePage_image homePage_image--blackBg'></div>
            }
            <div className='homePage_button'>
                <Link to="/projects"><h1> Clément<br/> Dubois<br/> Scénographe </h1></Link>
            </div>
         </div>
    )
}

export default HomePage