import './ImageFocus.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
function ImageFocus ({imageFocusUrl, setDisplayImageFocus, setImageFocusUrl, imagesArray}) {

    const imagesArrayLength = imagesArray.length;
    const currentIndex = imagesArray.findIndex (image => image.imageUrl === imageFocusUrl);

    //DÉFINITION IMAGE PRÉCÉDENTE
    let prevImageIndex = currentIndex === 0 ? imagesArrayLength-1 : currentIndex -1;
    const prevImage = imagesArray[prevImageIndex]
    function displayPrevImage () {
        setImageFocusUrl (prevImage.imageUrl);
    }

    //DÉFINITION IMAGE SUIVANTE
    let nextImageIndex = currentIndex === imagesArrayLength-1 ? 0 : currentIndex +1;
    const nextImage = imagesArray[nextImageIndex]
     function displayNextImage () {
        setImageFocusUrl (nextImage.imageUrl);
    }

    return (
        <div className='imageFocus'>
            {imagesArrayLength > 1 &&
            <FontAwesomeIcon icon={faChevronLeft} className='imageFocus_icon' onClick={()=>displayPrevImage()}/>
            }
            <img src={imageFocusUrl} onClick={()=>setDisplayImageFocus(false)}/>
            {imagesArrayLength > 1 &&
            <FontAwesomeIcon icon={faChevronRight} className='imageFocus_icon' onClick={()=>displayNextImage()}/>
            }
         </div>
    )
}

export default ImageFocus