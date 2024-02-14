import './HomePage.scss'
import Loader from '../Loader/Loader'
    
function HomePage({displayHomePage, loaderDisplay, setDisplayHomePage}) {

    return (
        <div className={displayHomePage===true?'homePage--displayOn':'homePage--displayOff'}>
            <div className={loaderDisplay===true?'homePage_loader--displayOn':'homePage_loader--displayOff'}>
                <Loader/>
            </div>
            <img className='homePage_image'src='./assets/homeImage2.jpg' alt="Project" />
            <button className='homePage_button' type='button' onClick={()=>setDisplayHomePage(false)}><h1> Clément Dubois Scénographe </h1> </button>
         </div>
    )
}

export default HomePage