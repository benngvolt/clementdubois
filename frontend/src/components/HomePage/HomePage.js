import './HomePage.scss'
import Loader from '../Loader/Loader'
import { ProjectsContext } from '../../utils/ProjectsContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
    
function HomePage({ setDisplayHomePage}) {

    const { loaderDisplay } = useContext(ProjectsContext);
    
    return (
        <div className='homePage'>
            <div className={loaderDisplay===true?'homePage_loader--displayOn':'homePage_loader--displayOff'}>
                <Loader/>
            </div>
            <img className='homePage_image'src='./assets/homeImage.jpg' alt="Project" />
            <Link className='homePage_button' to="/projects"><h1> Clément Dubois Scénographe </h1></Link>
         </div>
    )
}

export default HomePage