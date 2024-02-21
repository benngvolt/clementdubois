import './HomePage.scss'
import Loader from '../Loader/Loader'
import { ProjectsContext } from '../../utils/ProjectsContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../../assets/homeImage3.jpg'
    
function HomePage({ setDisplayHomePage}) {

    const { loaderDisplay } = useContext(ProjectsContext);
    
    return (
        <div className='homePage'>
            <div className={loaderDisplay===true?'homePage_loader--displayOn':'homePage_loader--displayOff'}>
                <Loader/>
            </div>
            <img className='homePage_image'src={homeImage} alt="Project" />
            <div className='homePage_button'>
                <Link to="/projects"><h1> Clément<br/> Dubois<br/> Scénographe </h1></Link>
            </div>
         </div>
    )
}

export default HomePage