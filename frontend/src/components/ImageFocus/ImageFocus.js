import './ImageFocus.scss'
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

function ImageFocus ({imageFocusUrl, setDisplayImageFocus, setImageFocusUrl, imagesArray}) {
    const modalRef = useRef(null);
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setDisplayImageFocus(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setDisplayImageFocus]);

    return (
        <div className='imageFocus' ref={modalRef}>
            <div className='imageFocus_container'>
                {imagesArrayLength > 1 &&
                <FontAwesomeIcon 
                    icon={faChevronLeft} 
                    className='imageFocus_icon'
                    aria-label="Afficher l\'image précédente"
                    onClick={()=>displayPrevImage()}/>
                }
                <img src={imageFocusUrl} alt={`image ${imagesArray[currentIndex]}`}/>
                {imagesArrayLength > 1 &&
                <FontAwesomeIcon 
                    icon={faChevronRight} 
                    className='imageFocus_icon'
                    aria-label="Afficher l\'image suivante" 
                    onClick={()=>displayNextImage()}/>
                }
            </div>
        </div>
    )
}

export default ImageFocus